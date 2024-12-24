import { Module } from '@nestjs/common';
import { ProgramSectionsService } from './program-sections.service';
import { ProgramSectionsController } from './program-sections.controller';

@Module({
  controllers: [ProgramSectionsController],
  providers: [ProgramSectionsService],
})
export class ProgramSectionsModule {}
