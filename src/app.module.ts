import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../shared/guards/roles.guard';
import { AcademicLoadsModule } from './academic-loads/academic-loads.module';
import { FacultiesModule } from './faculties/faculties.module';
import { DepartmentsModule } from './departments/departments.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { StudyPlansModule } from './study-plans/study-plans.module';
import { StandardsModule } from './standards/standards.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { DisciplineInStudyPlansModule } from './disciplines-in-study-plans/discipline-in-study-plans.module';
import { ProgramsModule } from './programs/programs.module';
import { ProgramSectionsModule } from './program-sections/program-sections.module';
import { ProgramSubsectionsModule } from './program-subsections/program-subsections.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    AcademicLoadsModule,
    FacultiesModule,
    DepartmentsModule,
    SpecialtiesModule,
    StudyPlansModule,
    StandardsModule,
    DisciplinesModule,
    DisciplineInStudyPlansModule,
    ProgramsModule,
    ProgramSectionsModule,
    ProgramSubsectionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Устанавливаем JwtAuthGuard глобально
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Глобальный Roles Guard
    },
  ],
})
export class AppModule {}
