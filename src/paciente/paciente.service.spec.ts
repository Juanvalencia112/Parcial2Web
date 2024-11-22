import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { Paciente } from '../entities/paciente.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Diagnostico } from '../entities/diagnostico.entity'; 
import { Medico } from '../entities/medico.entity';  

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<Paciente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Diagnostico),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Medico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a paciente successfully', async () => {
      const pacienteData: Paciente = {
        id: '1',
        nombre: 'Juan',
        genero: 'M',
        medico: [], 
        diagnosticos: [], 
      };

      jest.spyOn(repository, 'save').mockResolvedValue(pacienteData); 

      const result = await service.create(pacienteData);

      expect(result).toEqual(pacienteData);
      expect(repository.save).toHaveBeenCalledWith(pacienteData);
    });

    it('should throw a BadRequestException if the paciente name is too short', async () => {
      const pacienteData: Paciente = {
        id: '2',
        nombre: 'Jo',
        genero: 'M',
        medico: [], 
        diagnosticos: [], 
      };

      await expect(service.create(pacienteData)).rejects.toThrowError(
        new BadRequestException('El nombre del paciente debe tener al menos 3 caracteres.')
      );
    });
  });
});
