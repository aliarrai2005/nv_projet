import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { StadesModule } from './stades/stades.module';
import { FootballPitchModule } from './football-pitch/football-pitch.module';
import { OverpassModule } from './overpass/overpass.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 6, // 6 heures
      max: 100,
    }),
    StadesModule,
    FootballPitchModule,
    OverpassModule,
  ],
})
export class AppModule {}
