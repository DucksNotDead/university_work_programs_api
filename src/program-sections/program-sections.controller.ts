import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgramSectionsService } from './program-sections.service';
import { CreateProgramSectionDto } from './dto/create-program-section.dto';
import { UpdateProgramSectionDto } from './dto/update-program-section.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('program-sections')
export class ProgramSectionsController {
  constructor(private readonly programSectionsService: ProgramSectionsService) {}

  @Roles('Admin', 'Teacher')
  @Post()
  create(@Body() createProgramSectionDto: CreateProgramSectionDto) {
    return this.programSectionsService.create(createProgramSectionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.programSectionsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programSectionsService.findOne(+id);
  }

  @Roles('Admin', 'Teacher')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgramSectionDto: UpdateProgramSectionDto,
  ) {
    return this.programSectionsService.update(+id, updateProgramSectionDto);
  }

  @Roles('Admin', 'Teacher')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programSectionsService.remove(+id);
  }
}