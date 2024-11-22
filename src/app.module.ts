import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres1234',
      database: 'parcial2_web',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    MedicoModule,
    PacienteModule,
    DiagnosticoModule,
  ],
})
export class AppModule {}
