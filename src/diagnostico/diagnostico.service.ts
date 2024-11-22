import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnostico } from '../entities/diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticoRepository: Repository<Diagnostico>,
  ) {}

  async create(diagnostico: Partial<Diagnostico>): Promise<Diagnostico> {
    if (diagnostico.descripcion && diagnostico.descripcion.length > 200) {
      throw new BadRequestException('La descripción no puede superar los 200 caracteres.');
    }
    return await this.diagnosticoRepository.save(diagnostico);
  }

  async findOne(id: string): Promise<Diagnostico> {
    const diagnostico = await this.diagnosticoRepository.findOne({ where: { id } });
    if (!diagnostico) {
      throw new NotFoundException('Diagnóstico no encontrado.');
    }
    return diagnostico;
  }

  async findAll(): Promise<Diagnostico[]> {
    return await this.diagnosticoRepository.find();
  }

  async delete(id: string): Promise<void> {
    const diagnostico = await this.findOne(id);
    await this.diagnosticoRepository.delete(diagnostico.id);
  }
}
