import { Module } from '@nestjs/common';
import { ProgramSubsectionsService } from './program-subsections.service';
import { ProgramSubsectionsController } from './program-subsections.controller';

@Module({
  controllers: [ProgramSubsectionsController],
  providers: [ProgramSubsectionsService],
})
export class ProgramSubsectionsModule {}
