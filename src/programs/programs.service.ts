import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание программы
  async create(createProgramDto: CreateProgramDto) {
    const { standard_id, questions, skills, literature } = createProgramDto;
    const query =
      'INSERT INTO programs (standard_id, questions, skills, literature) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await this.databaseService.query(query, [
      standard_id,
      questions,
      skills,
      literature,
    ]);
    return result[0]; // Возвращаем созданную программу
  }

  // Получение всех программ
  async findAll() {
    const query = 'SELECT * FROM programs';
    const result = await this.databaseService.query(query);
    return result; // Возвращаем все программы
  }

  // Получение программы по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM programs WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем программу по ID
  }

  // Обновление программы
  async update(id: number, updateProgramDto: UpdateProgramDto) {
    const { standard_id, questions, skills, literature } = updateProgramDto;
    const query =
      'UPDATE programs SET standard_id = $1, questions = $2, skills = $3, literature = $4 WHERE id = $5 RETURNING *';
    const result = await this.databaseService.query(query, [
      standard_id,
      questions,
      skills,
      literature,
      id,
    ]);
    return result[0]; // Возвращаем обновленную программу
  }

  // Удаление программы
  async remove(id: number) {
    const query = 'DELETE FROM programs WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленную программу
  }
}