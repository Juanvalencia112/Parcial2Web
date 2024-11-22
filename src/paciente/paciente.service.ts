import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from '../entities/paciente.entity';
import { Diagnostico } from '../entities/diagnostico.entity';
import { Medico } from '../entities/medico.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Diagnostico)
    private readonly diagnosticoRepository: Repository<Diagnostico>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(paciente: Partial<Paciente>): Promise<Paciente> {
    if (!paciente.nombre || paciente.nombre.length < 3) {
      throw new BadRequestException('El nombre del paciente debe tener al menos 3 caracteres.');
    }
    return await this.pacienteRepository.save(paciente);
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({ where: { id }, relations: ['diagnosticos'] });
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado.');
    }
    return paciente;
  }

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.find({ relations: ['diagnosticos'] });
  }

  async delete(id: string): Promise<void> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id },
      relations: ['diagnosticos'], // Asegúrate de cargar las relaciones
    });
  
    if (!paciente) {
      throw new Error('El paciente no existe');
    }
  
    if (paciente.diagnosticos && paciente.diagnosticos.length > 0) {
      throw new Error('No se puede eliminar un paciente con diagnósticos asociados');
    }
  
    await this.pacienteRepository.delete(id);
  }  

  async addMedicoToPaciente(pacienteId: string, medicoId: string): Promise<Paciente> {
    const paciente = await this.findOne(pacienteId);
    const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });
  
    if (!paciente) {
      throw new Error('El paciente no existe');
    }
    if (!medico) {
      throw new Error('El médico no existe');
    }
  

    if (paciente.medico && paciente.medico.length >= 5) {
      throw new Error('Un paciente no puede tener más de 5 médicos asignados');
    }
  
 
    paciente.medico = [...(paciente.medico || []), medico];
    return this.pacienteRepository.save(paciente);
  }
  
}
