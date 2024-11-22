import { Diagnostico } from 'src/entities/diagnostico.entity';
import { Medico } from 'src/entities/medico.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  genero: string;

  @ManyToMany(() => Medico, (medico) => medico.pacientes)
  @JoinTable()
  medico: Medico[];

  @OneToMany(() => Diagnostico, (diagnostico) => diagnostico.paciente)
  diagnosticos: Diagnostico[];
}
