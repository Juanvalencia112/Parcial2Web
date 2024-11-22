import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteService } from './paciente.service';
import { Paciente } from '../entities/paciente.entity';
import { Diagnostico } from '../entities/diagnostico.entity';
import { Medico } from '../entities/medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, Diagnostico, Medico])],
  providers: [PacienteService],
  exports: [PacienteService],
})
export class PacienteModule {}
