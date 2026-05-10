import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { OverpassService, TerrainDto } from '../overpass/overpass.service';

const CACHE_TTL = 60 * 60 * 6; // 6 heures (données OSM peu volatiles)

@Injectable()
export class StadesService {
  constructor(
    private readonly overpassService: OverpassService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getStadesParVille(ville: string): Promise<TerrainDto[]> {
    const cacheKey = `stades:${ville.toLowerCase()}`;

    // Vérifier le cache d'abord
    const cached = await this.cacheManager.get<TerrainDto[]>(cacheKey);
    if (cached) return cached;

    // Sinon appel Overpass
    const stades = await this.overpassService.fetchStades(ville);
    await this.cacheManager.set(cacheKey, stades, CACHE_TTL);
    return stades;
  }

  async getToutesLesVilles(): Promise<Record<string, TerrainDto[]>> {
    const cacheKey = 'stades:all';
    const cached = await this.cacheManager.get<Record<string, TerrainDto[]>>(cacheKey);
    if (cached) return cached;

    const data = await this.overpassService.fetchToutesLesVilles();
    await this.cacheManager.set(cacheKey, data, CACHE_TTL);
    return data;
  }
}