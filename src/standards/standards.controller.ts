import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StandardsService } from './standards.service';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('standards')
export class StandardsController {
  constructor(private readonly standardsService: StandardsService) {}

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Post()
  create(@Body() createStandardDto: CreateStandardDto) {
    return this.standardsService.create(createStandardDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.standardsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standardsService.findOne(+id);
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStandardDto: UpdateStandardDto) {
    return this.standardsService.update(+id, updateStandardDto);
  }

  @Roles('Admin', 'EducationDepartmentEmployee')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standardsService.remove(+id);
  }
}