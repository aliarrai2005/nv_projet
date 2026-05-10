import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FootballPitchService {
    private readonly overpassUrl =
        'https://overpass-api.de/api/interpreter';

    async getFootballPitches() {
        const query = `
  [out:json][timeout:60];
// Définition des cinq villes
(
  {{geocodeArea:Casablanca}}->.casa;
  {{geocodeArea:Rabat}}->.raba;
  {{geocodeArea:Marrakech}}->.marr;
  {{geocodeArea:Fès}}->.fes;
  {{geocodeArea:Tanger}}->.tang;
);
// Union des zones
(
  nwr["leisure"="pitch"]["sport"~"soccer|football"](area.casa);
  nwr["leisure"="pitch"]["sport"~"soccer|football"](area.raba);
  nwr["leisure"="pitch"]["sport"~"soccer|football"](area.marr);
  nwr["leisure"="pitch"]["sport"~"soccer|football"](area.fes);
  nwr["leisure"="pitch"]["sport"~"soccer|football"](area.tang);
);
// Affichage des résultats
out body;
>;
out skel qt;
    `;
        try {
            const response = await axios.post(
                this.overpassUrl,
                `data=${encodeURIComponent(query)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    timeout: 30000,
                },
            );

            return response.data;
        } catch (error: any) {
            console.log(error.response?.data);
        }
    }
}