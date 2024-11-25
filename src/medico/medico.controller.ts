import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from '../entities/medico.entity';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  async create(@Body() medico: Partial<Medico>): Promise<Medico> {
    return this.medicoService.create(medico);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Medico> {
    return this.medicoService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Medico[]> {
    return this.medicoService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.medicoService.delete(id);
  }
}
