import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StadesController } from './stades.controller';
import { StadesService } from './stades.service';
import { OverpassService } from '../overpass/overpass.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Accept': '*/*',           // ← écraser le default axios
        'Accept-Encoding': 'gzip', // ← retirer br/compress
      },
    }),
  ],
  controllers: [StadesController],
  providers: [StadesService, OverpassService],
})
export class StadesModule {}