import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { StadesModule } from './stades/stades.module';
import { TerrainsModule } from './terrains/terrains.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 6,
      max: 100,
    }),
    StadesModule,
    TerrainsModule,
    ReservationsModule,
    AdminModule,
  ],
})
export class AppModule {}