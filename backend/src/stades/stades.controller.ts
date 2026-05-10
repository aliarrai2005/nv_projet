import { Controller, Get, Param } from '@nestjs/common';
import { StadesService } from './stades.service';

@Controller('stades')
export class StadesController {
  constructor(private readonly stadesService: StadesService) {}

  @Get()
  getAllVilles() {
    return this.stadesService.getToutesLesVilles();
  }

  @Get(':ville')
  getVille(@Param('ville') ville: string) {
    return this.stadesService.getStadesParVille(ville);
  }
}