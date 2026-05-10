import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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
export class OverpassService {
    constructor(private readonly httpService: HttpService) { }
    private readonly logger = new Logger(OverpassService.name);
    private readonly baseUrl = 'https://overpass-api.de/api/interpreter';

    private readonly villesConfig: Record<string, { name: string; bbox: string }> = {
        casablanca: { name: 'Casablanca', bbox: '33.4,-7.8,33.7,-7.4' },
        rabat: { name: 'Rabat', bbox: '33.9,-6.9,34.1,-6.7' },
        fes: { name: 'Fès', bbox: '33.9,-5.1,34.1,-4.9' },
        marrakesh: { name: 'Marrakesh', bbox: '31.5,-8.1,31.7,-7.9' },
        tanger: { name: 'Tanger', bbox: '35.6,-5.9,35.8,-5.7' },
    };

    buildQuery(bbox: string): string {
        const [s, w, n, e] = bbox.split(',');
        // "out center" donne le centroïde de chaque way → plus besoin des nodes de contour
        return `[out:json][timeout:30];(way["leisure"="pitch"]["sport"~"soccer|football"](${s},${w},${n},${e}););out tags center;`;
    }
    // Dans le service, transformer avant de retourner
    private mapToDto(el: any, ville: string): TerrainDto {
        return {
            id: el.id,
            nom: el.tags?.name ?? el.tags?.['name:fr'] ?? null,
            lat: el.center?.lat ?? el.lat,
            lon: el.center?.lon ?? el.lon,
            surface: el.tags?.surface ?? null,
            acces: el.tags?.access ?? null,
            ville,
        };
    }

    async doRequest(query: string): Promise<any> {
        const body = new URLSearchParams();
        body.set('data', query);

        const instance = this.httpService.axiosRef;

        // Nettoyer tous les headers par défaut
        delete instance.defaults.headers.common['Accept'];
        delete instance.defaults.headers.common['Accept-Encoding'];

        const response = await instance.post(this.baseUrl, body.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
                'User-Agent': 'curl/7.55.1',
                'Accept-Encoding': '',   // ← forcer à vide pour écraser le défaut Node.js
            },
            timeout: 35000,
            decompress: false,
            transformResponse: [(data: any) => data],
            responseType: 'text' as const,
            validateStatus: () => true,
        });

        this.logger.log(`Status: ${response.status}`);
        return response;
    }

    async fetchStades(ville: string): Promise<TerrainDto[]> {
        const key = ville.toLowerCase();
        const config = this.villesConfig[key];
        if (!config) throw new Error(`Ville "${ville}" non supportée`);

        const query = this.buildQuery(config.bbox);
        const response = await this.doRequest(query);

        // ← Arrêter ici si pas 200, ne pas tenter JSON.parse
        if (response.status !== 200) {
            this.logger.error(`[${config.name}] HTTP ${response.status} - ${response.data?.substring(0, 100)}`);
            return [];
        }

        const data = typeof response.data === 'string'
            ? JSON.parse(response.data)
            : response.data;

        return (data?.elements ?? [])
            .filter((el: any) => el.tags)
            .map((el: any) => this.mapToDto(el, ville));
    }

    async fetchToutesLesVilles(): Promise<Record<string, TerrainDto[]>> {
        const results: Record<string, TerrainDto[]> = {};
        for (const ville of Object.keys(this.villesConfig)) {
            results[ville] = await this.fetchStades(ville);
            await new Promise((r) => setTimeout(r, 1500));
        }
        return results;
    }
}