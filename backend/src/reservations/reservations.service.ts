import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface Reservation {
    id: string;
    terrainId: string;
    terrainNom: string;
    date: string;
    heureDebut: string;
    heureFin: string;
    nomClient?: string;
    emailClient?: string;
    telephone?: string;
    statut: 'confirmée' | 'annulée';
    createdAt: string;
}

@Injectable()
export class ReservationsService {
    private readonly filePath = path.join(process.cwd(), 'src/data/reservations.json');

    private async readReservations(): Promise<Reservation[]> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    private async writeReservations(reservations: Reservation[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(reservations, null, 2));
    }

    async getCreneauxOccupes(terrainId: string, date: string): Promise<string[]> {
        const reservations = await this.readReservations();
        return reservations
            .filter(r => r.terrainId === terrainId && r.date === date && r.statut === 'confirmée')
            .map(r => r.heureDebut);
    }

    async create(data: Omit<Reservation, 'id' | 'statut' | 'createdAt'>): Promise<Reservation> {
        const reservations = await this.readReservations();
        const newReservation: Reservation = {
            ...data,
            id: Date.now().toString(),
            statut: 'confirmée',
            createdAt: new Date().toISOString(),
        };
        reservations.push(newReservation);
        await this.writeReservations(reservations);
        return newReservation;
    }

    async cancel(id: string): Promise<Reservation> {
        const reservations = await this.readReservations();
        const index = reservations.findIndex(r => r.id === id);
        if (index === -1) throw new NotFoundException(`Réservation ${id} non trouvée`);
        reservations[index].statut = 'annulée';
        await this.writeReservations(reservations);
        return reservations[index];
    }

    async findAll(): Promise<Reservation[]> {
        return this.readReservations();
    }

    async delete(id: string): Promise<void> {
        const reservations = await this.readReservations();
        const filtered = reservations.filter(r => r.id !== id);
        if (filtered.length === reservations.length) {
            throw new NotFoundException(`Réservation ${id} non trouvée`);
        }
        await this.writeReservations(filtered);
    }
}