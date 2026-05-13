export class CreateTerrainDto {
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



export class UpdateTerrainDto {
  nom?: string;
  type?: string;
  ville?: string;
  prix?: string;
  capacity?: string;
  surface?: string;
  image?: string;
  lat?: number;
  lng?: number;
}