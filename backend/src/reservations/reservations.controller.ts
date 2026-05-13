import { Controller,Delete, Get, Post, Patch, Body, Query, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, UpdateReservationDto } from './dto/reservation.dto';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Get('occupies')
    getOccupies(@Query('terrainId') terrainId: string, @Query('date') date: string) {
        return this.reservationsService.getCreneauxOccupes(terrainId, date);
    }

    @Post()
    create(@Body() body: CreateReservationDto) {
        return this.reservationsService.create(body);
    }

    @Patch(':id/cancel')
    cancel(@Param('id') id: string) {
        return this.reservationsService.cancel(id);
    }

    @Get()
    async findAll() {
        return this.reservationsService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.reservationsService.delete(id);
    }
}