import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoService } from './diagnostico.service';
import { Diagnostico } from '../entities/diagnostico.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;
  let repository: Repository<Diagnostico>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosticoService,
        {
          provide: getRepositoryToken(Diagnostico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DiagnosticoService>(DiagnosticoService);
    repository = module.get<Repository<Diagnostico>>(getRepositoryToken(Diagnostico));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a diagnostico successfully', async () => {
      const diagnosticoData: Diagnostico = { id: '1', descripcion: 'Diagnóstico válido' };
      jest.spyOn(repository, 'save').mockResolvedValue(diagnosticoData);

      const result = await service.create(diagnosticoData);

      expect(result).toEqual(diagnosticoData);
      expect(repository.save).toHaveBeenCalledWith(diagnosticoData);
    });

    it('should throw BadRequestException if descripcion exceeds 200 characters', async () => {
      const diagnosticoData: Diagnostico = { id: '2', descripcion: 'a'.repeat(201) };

      await expect(service.create(diagnosticoData)).rejects.toThrowError(
        new BadRequestException('La descripción no puede superar los 200 caracteres.')
      );
    });
  });

  describe('findOne', () => {
    it('should find a diagnostico by id', async () => {
      const diagnostico: Diagnostico = { id: '1', descripcion: 'Diagnóstico válido' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(diagnostico);

      const result = await service.findOne('1');

      expect(result).toEqual(diagnostico);
    });

    it('should throw NotFoundException if diagnostico is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrowError(new NotFoundException('Diagnóstico no encontrado.'));
    });
  });

  describe('findAll', () => {
    it('should return all diagnosticos', async () => {
      const diagnosticos: Diagnostico[] = [{ id: '1', descripcion: 'Diagnóstico 1' }];
      jest.spyOn(repository, 'find').mockResolvedValue(diagnosticos);

      const result = await service.findAll();

      expect(result).toEqual(diagnosticos);
    });
  });

  describe('delete', () => {
    it('should delete a diagnostico successfully', async () => {
      const diagnostico: Diagnostico = { id: '1', descripcion: 'Diagnóstico válido' };
      jest.spyOn(service, 'findOne').mockResolvedValue(diagnostico);
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.delete('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
