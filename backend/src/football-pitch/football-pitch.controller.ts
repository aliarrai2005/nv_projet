import { Controller, Get } from '@nestjs/common';
import { FootballPitchService } from './football-pitch.service';

@Controller('football-pitches')
export class FootballPitchController {
  constructor(private readonly footballPitchService: FootballPitchService) {}

  @Get()
  async getPitches() {
    return this.footballPitchService.getFootballPitches();
  }
}