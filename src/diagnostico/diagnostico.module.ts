import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoService } from './diagnostico.service';
import { Diagnostico } from '../entities/diagnostico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostico])],
  providers: [DiagnosticoService],
  exports: [DiagnosticoService],
})
export class DiagnosticoModule {}
