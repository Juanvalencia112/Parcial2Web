import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoService } from './medico.service';
import { Medico } from '../entities/medico.entity';
import { Paciente } from '../entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medico, Paciente])],
  providers: [MedicoService],
  exports: [MedicoService],
})
export class MedicoModule {}
