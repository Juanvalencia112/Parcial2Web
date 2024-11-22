import { Paciente } from 'src/entities/paciente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Diagnostico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ length: 200 })
  descripcion: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.diagnosticos)
  paciente: Paciente;
}
