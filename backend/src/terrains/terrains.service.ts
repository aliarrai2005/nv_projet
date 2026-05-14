import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface Terrain {
  id: number;
  nom: string;
  type: string;
  ville: string;
  prix: string;
  capacity: string;
  surface?: string;
  image?: string;
  lat?: number;
  lng?: number;
}

@Injectable()
export class TerrainsService {
  private readonly filePath = path.join(process.cwd(), 'src/data/terrains.json');

  private async readTerrains(): Promise<Terrain[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      // Si fichier inexistant, retourner un tableau vide
      return [];
    }
  }

  private async writeTerrains(terrains: Terrain[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(terrains, null, 2));
  }

  async findAll(): Promise<Terrain[]> {
    return this.readTerrains();
  }

  async findOne(id: number): Promise<Terrain> {
    const terrains = await this.readTerrains();
    const terrain = terrains.find(t => t.id === id);
    if (!terrain) throw new NotFoundException(`Terrain ${id} non trouvé`);
    return terrain;
  }

  async create(data: Omit<Terrain, 'id'>): Promise<Terrain> {
    const terrains = await this.readTerrains();
    const newId = terrains.length ? Math.max(...terrains.map(t => t.id)) + 1 : 1;
    const newTerrain = { id: newId, ...data };
    console.log('Creating terrain:', newTerrain);
    terrains.push(newTerrain);
    await this.writeTerrains(terrains);
    return newTerrain;
  }

  async update(id: number, updates: Partial<Terrain>): Promise<Terrain> {
    const terrains = await this.readTerrains();
    const index = terrains.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException(`Terrain ${id} non trouvé`);
    terrains[index] = { ...terrains[index], ...updates };
    await this.writeTerrains(terrains);
    return terrains[index];
  }

  async delete(id: number): Promise<void> {
    const terrains = await this.readTerrains();
    const filtered = terrains.filter(t => t.id !== id);
    if (filtered.length === terrains.length) throw new NotFoundException(`Terrain ${id} non trouvé`);
    await this.writeTerrains(filtered);
  }
}