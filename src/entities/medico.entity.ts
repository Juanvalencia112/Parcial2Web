import { Paciente } from 'src/entities/paciente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column()
  telefono: string;

  @ManyToMany(() => Paciente, (paciente) => paciente.medico)
  pacientes: Paciente[];
}
