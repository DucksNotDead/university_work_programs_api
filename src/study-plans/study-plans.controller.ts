import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudyPlansService } from './study-plans.service';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from './dto/update-study-plan.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('study-plans')
export class StudyPlansController {
  constructor(private readonly studyPlansService: StudyPlansService) {}

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Post()
  create(@Body() createStudyPlanDto: CreateStudyPlanDto) {
    return this.studyPlansService.create(createStudyPlanDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.studyPlansService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyPlansService.findOne(+id);
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudyPlanDto: UpdateStudyPlanDto,
  ) {
    return this.studyPlansService.update(+id, updateStudyPlanDto);
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyPlansService.remove(+id);
  }
}
