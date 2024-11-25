import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from '../entities/paciente.entity';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  async create(@Body() paciente: Partial<Paciente>): Promise<Paciente> {
    return this.pacienteService.create(paciente);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Paciente> {
    return this.pacienteService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Paciente[]> {
    return this.pacienteService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.pacienteService.delete(id);
  }

  @Patch(':pacienteId/medico/:medicoId')
  async addMedicoToPaciente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
  ): Promise<Paciente> {
    return this.pacienteService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
