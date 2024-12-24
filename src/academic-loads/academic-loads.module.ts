import { Module } from '@nestjs/common';
import { AcademicLoadsService } from './academic-loads.service';
import { AcademicLoadsController } from './academic-loads.controller';

@Module({
  controllers: [AcademicLoadsController],
  providers: [AcademicLoadsService],
})
export class AcademicLoadsModule {}
