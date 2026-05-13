export class CreateTerrainDto {
  nom: string;
  type: string;
  ville: string;
  prix: string;
  capacity: string;
  surface?: string;
  image?: string;
}

export class UpdateTerrainDto {
  nom?: string;
  type?: string;
  ville?: string;
  prix?: string;
  capacity?: string;
  surface?: string;
  image?: string;
}