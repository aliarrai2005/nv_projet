import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface TerrainDto {
  id: number;
  nom: string | null;
  lat: number;
  lon: number;
  surface: string | null;
  acces: string | null;
  ville: string;
}

@Injectable()
export class OverpassService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(OverpassService.name);

  // Plusieurs instances de repli — si la première est throttlée, on tente la suivante
  private readonly endpoints = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  ];

  private readonly inFlight = new Map<string, Promise<TerrainDto[]>>();

  private readonly villesConfig: Record<string, { name: string; bbox: string }> = {
    casablanca: { name: 'Casablanca', bbox: '33.4,-7.8,33.7,-7.4' },
    rabat:      { name: 'Rabat',      bbox: '33.9,-6.9,34.1,-6.7' },
    fes:        { name: 'Fès',        bbox: '33.9,-5.1,34.1,-4.9' },
    marrakesh:  { name: 'Marrakesh',  bbox: '31.5,-8.1,31.7,-7.9' },
    tanger:     { name: 'Tanger',     bbox: '35.6,-5.9,35.8,-5.7' },
  };

  onModuleInit() {
    // Ne toucher QUE ce qui est nécessaire — pas de suppression globale
    this.httpService.axiosRef.defaults.timeout = 35000;
    this.logger.log('OverpassService initialisé');
  }

  // ─── Query ───────────────────────────────────────────────────────────────

  buildQuery(bbox: string): string {
    const [s, w, n, e] = bbox.split(',');
    return `[out:json][timeout:30];(way["leisure"="pitch"]["sport"~"soccer|football"](${s},${w},${n},${e}););out tags center;`;
  }

  // ─── HTTP avec fallback sur plusieurs endpoints ───────────────────────────

  async doRequest(query: string): Promise<any> {
    let lastError: any;

    for (const endpoint of this.endpoints) {
      try {
        const params = new URLSearchParams({ data: query });

        const response = await this.httpService.axiosRef.post(
          endpoint,
          params.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (compatible; TerrainBot/1.0)',
            },
            timeout: 35000,
            // Laisser Axios gérer la décompression normalement
          },
        );

        this.logger.log(`[${endpoint}] Status: ${response.status}`);

        if (response.status === 200) return response;

        this.logger.warn(`[${endpoint}] HTTP ${response.status}, essai suivant...`);
      } catch (err) {
        this.logger.warn(`[${endpoint}] Erreur réseau: ${err.message}`);
        lastError = err;
      }
    }

    throw lastError ?? new Error('Tous les endpoints Overpass ont échoué');
  }

  // ─── Mapping ─────────────────────────────────────────────────────────────

  private buildFallbackName(tags: Record<string, string>, ville: string): string {
    const sport = tags.sport?.split(';')[0] ?? 'football';
    const surface = tags.surface;
    const quartier = tags['addr:suburb'] ?? tags['addr:neighbourhood'] ?? null;

    const sportLabel =
      sport === 'soccer' || sport === 'football'
        ? 'Football'
        : sport.charAt(0).toUpperCase() + sport.slice(1);

    if (quartier) return `Terrain de ${sportLabel} - ${quartier}`;

    const surfaceLabel: Record<string, string> = {
      grass:           'gazon naturel',
      artificial_turf: 'gazon synthétique',
      sand:            'sable',
      concrete:        'béton',
      asphalt:         'asphalte',
      clay:            'terre battue',
    };

    if (surface) return `Terrain de ${sportLabel} (${surfaceLabel[surface] ?? surface})`;

    return `Terrain de ${sportLabel} - ${ville}`;
  }

  private mapToDto(el: any, ville: string): TerrainDto {
    const tags = el.tags ?? {};
    const nom =
      tags.name ??
      tags['name:fr'] ??
      tags['name:ar'] ??
      this.buildFallbackName(tags, ville);

    return {
      id:      el.id,
      nom,
      lat:     el.center?.lat ?? el.lat,
      lon:     el.center?.lon ?? el.lon,
      surface: tags.surface ?? null,
      acces:   tags.access  ?? null,
      ville,
    };
  }

  // ─── Fetch ───────────────────────────────────────────────────────────────

  async fetchStades(ville: string): Promise<TerrainDto[]> {
    const key = ville.toLowerCase();
    const config = this.villesConfig[key];
    if (!config) throw new Error(`Ville "${ville}" non supportée`);

    if (this.inFlight.has(key)) {
      this.logger.log(`[${config.name}] Appel en cours, attente du résultat...`);
      return this.inFlight.get(key)!;
    }

    const promise = this._doFetch(config, ville).finally(() => {
      this.inFlight.delete(key);
    });

    this.inFlight.set(key, promise);
    return promise;
  }

  private async _doFetch(
    config: { name: string; bbox: string },
    ville: string,
  ): Promise<TerrainDto[]> {
    const query = this.buildQuery(config.bbox);

    try {
      const response = await this.doRequest(query);
      const data = response.data;

      const terrains = (data?.elements ?? [])
        .filter((el: any) => el.tags)
        .map((el: any) => this.mapToDto(el, ville));

      this.logger.log(`[${config.name}] ${terrains.length} terrains trouvés`);
      return terrains;
    } catch (err) {
      this.logger.error(`[${config.name}] Échec total: ${err.message}`);
      return [];
    }
  }

  async fetchStadesWithRetry(ville: string, maxRetries = 3): Promise<TerrainDto[]> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await this.fetchStades(ville);
      if (result.length > 0 || attempt === maxRetries) return result;

      const delay = attempt * 5000;
      this.logger.warn(`[${ville}] Tentative ${attempt} vide, retry dans ${delay / 1000}s...`);
      await new Promise((r) => setTimeout(r, delay));
    }
    return [];
  }

  async fetchToutesLesVilles(): Promise<Record<string, TerrainDto[]>> {
    const results: Record<string, TerrainDto[]> = {};

    for (const ville of Object.keys(this.villesConfig)) {
      results[ville] = await this.fetchStadesWithRetry(ville);
      await new Promise((r) => setTimeout(r, 2000)); // délai anti-rate-limit
    }

    return results;
  }
}