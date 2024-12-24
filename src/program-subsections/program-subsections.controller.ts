import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramSubsectionsService } from './program-subsections.service';
import { CreateProgramSubsectionDto } from './dto/create-program-subsection.dto';
import { UpdateProgramSubsectionDto } from './dto/update-program-subsection.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('program-subsections')
export class ProgramSubsectionsController {
  constructor(private readonly programSubsectionsService: ProgramSubsectionsService) {}

  @Roles('Admin', 'Teacher')
  @Post()
  create(@Body() createProgramSubsectionDto: CreateProgramSubsectionDto) {
    return this.programSubsectionsService.create(createProgramSubsectionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.programSubsectionsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programSubsectionsService.findOne(+id);
  }

  @Roles('Admin', 'Teacher')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramSubsectionDto: UpdateProgramSubsectionDto) {
    return this.programSubsectionsService.update(+id, updateProgramSubsectionDto);
  }

  @Roles('Admin', 'Teacher')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programSubsectionsService.remove(+id);
  }
}