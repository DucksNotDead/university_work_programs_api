import { Injectable } from '@nestjs/common';
import { CreateProgramSubsectionDto } from './dto/create-program-subsection.dto';
import { UpdateProgramSubsectionDto } from './dto/update-program-subsection.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProgramSubsectionsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createProgramSubsectionDto: CreateProgramSubsectionDto) {
    const { section_id, type, volume, label } = createProgramSubsectionDto;
    const result = await this.dbService.query(
      'INSERT INTO program_subsections (section_id, type, volume, label) VALUES ($1, $2, $3, $4) RETURNING *',
      [section_id, type, volume, label],
    );
    return result[0];
  }

  async findAll() {
    const result = await this.dbService.query(
      'SELECT * FROM program_subsections',
    );
    return result;
  }

  async findOne(id: number) {
    const result = await this.dbService.query(
      'SELECT * FROM program_subsections WHERE id = $1',
      [id],
    );
    return result[0];
  }

  async update(
    id: number,
    updateProgramSubsectionDto: UpdateProgramSubsectionDto,
  ) {
    const { section_id, type, volume, label } = updateProgramSubsectionDto;
    const result = await this.dbService.query(
      'UPDATE program_subsections SET section_id = COALESCE($1, section_id), type = COALESCE($2, type), volume = COALESCE($3, volume), label = COALESCE($4, label) WHERE id = $5 RETURNING *',
      [section_id, type, volume,label, id],
    );
    return result[0];
  }

  async remove(id: number) {
    const result = await this.dbService.query(
      'DELETE FROM program_subsections WHERE id = $1 RETURNING *',
      [id],
    );
    return result[0];
  }
}
