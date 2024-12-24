import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AcademicLoadsService } from './academic-loads.service';
import { CreateAcademicLoadDto } from './dto/create-academic-load.dto';
import { UpdateAcademicLoadDto } from './dto/update-academic-load.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('academic-loads')
export class AcademicLoadsController {
  constructor(private readonly academicLoadsService: AcademicLoadsService) {}

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Post()
  create(@Body() createAcademicLoadDto: CreateAcademicLoadDto) {
    return this.academicLoadsService.create(createAcademicLoadDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.academicLoadsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicLoadsService.findOne(+id);
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcademicLoadDto: UpdateAcademicLoadDto,
  ) {
    return this.academicLoadsService.update(+id, updateAcademicLoadDto);
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicLoadsService.remove(+id);
  }
}
