import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Roles('Admin', 'Teacher')
  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.programsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(+id);
  }

  @Public()
  @Get('reports/:id')
  async exportReport(@Param('id') id: string, @Res() res) {
    const file = await this.programsService.createReportFile(Number(id));

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Program_Data.xlsx"',
    );

    await file.xlsx.write(res);
    res.end();
  }

  @Roles('Admin', 'Teacher')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.update(+id, updateProgramDto);
  }

  @Roles('Admin', 'Teacher')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programsService.remove(+id);
  }
}
