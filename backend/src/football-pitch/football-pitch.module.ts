import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FootballPitchController } from './football-pitch.controller';
import { FootballPitchService } from './football-pitch.service';

@Module({
  imports: [HttpModule],
  controllers: [FootballPitchController],
  providers: [FootballPitchService]
})
export class FootballPitchModule {}
