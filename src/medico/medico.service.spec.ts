import { Test, TestingModule } from '@nestjs/testing';
import { MedicoService } from './medico.service';
import { Medico } from '../entities/medico.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MedicoService', () => {
  let service: MedicoService;
  let repository: Repository<Medico>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoService,
        {
          provide: getRepositoryToken(Medico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MedicoService>(MedicoService);
    repository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a medico successfully', async () => {
      const medicoData: Medico = { id: '1', nombre: 'Dr. Juan', especialidad: 'Cardiología', pacientes: [] };
      jest.spyOn(repository, 'save').mockResolvedValue(medicoData);

      const result = await service.create(medicoData);

      expect(result).toEqual(medicoData);
      expect(repository.save).toHaveBeenCalledWith(medicoData);
    });

    it('should throw BadRequestException if nombre or especialidad is missing', async () => {
      const medicoData: Partial<Medico> = { id: '2' };

      await expect(service.create(medicoData)).rejects.toThrowError(
        new BadRequestException('El nombre y la especialidad son obligatorios.')
      );
    });
  });

  describe('delete', () => {
    it('should throw BadRequestException if medico has pacientes', async () => {
      const medicoData: Medico = { id: '1', nombre: 'Dr. Juan', especialidad: 'Cardiología', pacientes: [{}] };
      jest.spyOn(service, 'findOne').mockResolvedValue(medicoData);

      await expect(service.delete('1')).rejects.toThrowError(
        new BadRequestException('No se puede eliminar un médico con pacientes asociados.')
      );
    });
  });
});
