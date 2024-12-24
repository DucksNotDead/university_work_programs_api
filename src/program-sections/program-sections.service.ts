import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService
import { CreateProgramSectionDto } from './dto/create-program-section.dto';
import { UpdateProgramSectionDto } from './dto/update-program-section.dto';

@Injectable()
export class ProgramSectionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание раздела программы
  async create(createProgramSectionDto: CreateProgramSectionDto) {
    const { standard_id, title } = createProgramSectionDto;
    const query =
      'INSERT INTO program_sections (standard_id, title) VALUES ($1, $2) RETURNING *';
    const result = await this.databaseService.query(query, [
      standard_id,
      title,
    ]);
    return result[0]; // Возвращаем созданный раздел программы
  }

  // Получение всех разделов программ
  async findAll() {
    const query = 'SELECT * FROM program_sections';
    const result = await this.databaseService.query(query);
    return result; // Возвращаем все разделы программ
  }

  // Получение раздела программы по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM program_sections WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем раздел программы по ID
  }

  // Обновление раздела программы
  async update(id: number, updateProgramSectionDto: UpdateProgramSectionDto) {
    const { standard_id, title } = updateProgramSectionDto;
    const query =
      'UPDATE program_sections SET standard_id = $1, title = $2 WHERE id = $3 RETURNING *';
    const result = await this.databaseService.query(query, [
      standard_id,
      title,
      id,
    ]);
    return result[0]; // Возвращаем обновленный раздел программы
  }

  // Удаление раздела программы
  async remove(id: number) {
    const query = 'DELETE FROM program_sections WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленный раздел программы
  }
}