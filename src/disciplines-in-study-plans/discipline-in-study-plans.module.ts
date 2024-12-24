import { Module } from '@nestjs/common';
import { DisciplineInStudyPlansService } from './discipline-in-study-plans.service';
import { DisciplineInStudyPlansController } from './discipline-in-study-plans.controller';

@Module({
  controllers: [DisciplineInStudyPlansController],
  providers: [DisciplineInStudyPlansService],
})
export class DisciplineInStudyPlansModule {}
