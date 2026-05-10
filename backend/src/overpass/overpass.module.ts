import { Module } from '@nestjs/common';
import { OverpassController } from './overpass.controller';
import { OverpassService } from './overpass.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [OverpassController],
  providers: [OverpassService]
})
export class OverpassModule {}
