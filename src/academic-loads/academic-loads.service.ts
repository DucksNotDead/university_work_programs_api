import { Injectable } from '@nestjs/common';
import { CreateAcademicLoadDto } from './dto/create-academic-load.dto';
import { UpdateAcademicLoadDto } from './dto/update-academic-load.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AcademicLoadsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAcademicLoadDto: CreateAcademicLoadDto) {
    const { speciality_id, discipline_id, volume } = createAcademicLoadDto;
    const result = await this.databaseService.query(
      'INSERT INTO academic_loads (speciality_id, discipline_id, volume) VALUES ($1, $2, $3) RETURNING *',
      [speciality_id, discipline_id, volume],
    );
    return result[0];
  }

  async findAll() {
    return this.databaseService.query('SELECT * FROM academic_loads');
  }

  async findOne(id: number) {
    const result = await this.databaseService.query(
      'SELECT * FROM academic_loads WHERE id = $1',
      [id],
    );
    return result[0];
  }

  async update(id: number, updateAcademicLoadDto: UpdateAcademicLoadDto) {
    const { speciality_id, discipline_id, volume } = updateAcademicLoadDto;
    const result = await this.databaseService.query(
      'UPDATE academic_loads SET speciality_id = $1, discipline_id = $2, volume = $3 WHERE id = $4 RETURNING *',
      [speciality_id, discipline_id, volume, id],
    );
    return result[0];
  }

  async remove(id: number) {
    const result = await this.databaseService.query(
      'DELETE FROM academic_loads WHERE id = $1 RETURNING *',
      [id],
    );
    return result[0];
  }
}
