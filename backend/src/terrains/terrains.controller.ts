import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TerrainsService, Terrain } from './terrains.service';
import { CreateTerrainDto, UpdateTerrainDto } from './dto/terrain.dto';

@Controller('terrains')
export class TerrainsController {
  constructor(private readonly terrainsService: TerrainsService) {}

  @Get()
  findAll(): Promise<Terrain[]> {
    return this.terrainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Terrain> {
    return this.terrainsService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateTerrainDto): Promise<Terrain> {
    return this.terrainsService.create(body as Terrain);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updates: UpdateTerrainDto): Promise<Terrain> {
    return this.terrainsService.update(Number(id), updates);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.terrainsService.delete(Number(id));
  }
}