import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from '../entities/medico.entity';
import { Paciente } from '../entities/paciente.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async create(medico: Partial<Medico>): Promise<Medico> {
    if (!medico.nombre || !medico.especialidad) {
      throw new BadRequestException('El nombre y la especialidad son obligatorios.');
    }
    return await this.medicoRepository.save(medico);
  }

  async findOne(id: string): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({ where: { id }, relations: ['pacientes'] });
    if (!medico) {
      throw new NotFoundException('Médico no encontrado.');
    }
    return medico;
  }

  async findAll(): Promise<Medico[]> {
    return await this.medicoRepository.find({ relations: ['pacientes'] });
  }

  async delete(id: string): Promise<void> {
    const medico = await this.findOne(id);
    if (medico.pacientes && medico.pacientes.length > 0) {
      throw new BadRequestException('No se puede eliminar un médico con pacientes asociados.');
    }
    await this.medicoRepository.delete(id);
  }
}
