export class CreateReservationDto {
  terrainId: string;
  terrainNom: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  nomClient?: string;
  emailClient?: string;
  telephone?: string;
}

export class UpdateReservationDto {
  statut?: 'confirmée' | 'annulée';
}