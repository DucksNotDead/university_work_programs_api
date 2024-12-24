import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DisciplineInStudyPlansService } from './discipline-in-study-plans.service';
import { CreateDisciplineInStudyPlanDto } from './dto/create-discipline-in-study-plan.dto';
import { UpdateDisciplineInStudyPlanDto } from './dto/update-discipline-in-study-plan.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('disciplines-in-study-plans')
export class DisciplineInStudyPlansController {
  constructor(
    private readonly disciplinesInStudyPlansService: DisciplineInStudyPlansService,
  ) {}

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Post()
  create(
    @Body() createDisciplineInStudyPlanDto: CreateDisciplineInStudyPlanDto,
  ) {
    return this.disciplinesInStudyPlansService.create(createDisciplineInStudyPlanDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.disciplinesInStudyPlansService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinesInStudyPlansService.findOne(+id);
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDisciplineInStudyPlanDto: UpdateDisciplineInStudyPlanDto,
  ) {
    return this.disciplinesInStudyPlansService.update(
      +id,
      updateDisciplineInStudyPlanDto,
    );
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinesInStudyPlansService.remove(+id);
  }
}