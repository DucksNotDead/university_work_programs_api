import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Injectable()
export class DisciplinesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание новой дисциплины
  async create(createDisciplineDto: CreateDisciplineDto) {
    const { name, department_id } = createDisciplineDto;
    const query =
      'INSERT INTO disciplines (name, department_id) VALUES ($1, $2) RETURNING *';
    const result = await this.databaseService.query(query, [
      name,
      department_id,
    ]);
    return result[0]; // Возвращаем созданную дисциплину
  }

  // Получение всех дисциплин
  async findAll() {
    const query = 'SELECT * FROM disciplines';
    const result = await this.databaseService.query(query);
    return result; // Возвращаем все дисциплины
  }

  // Получение дисциплины по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM disciplines WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем дисциплину по ID
  }

  // Обновление дисциплины
  async update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    const { name, department_id } = updateDisciplineDto;
    const query =
      'UPDATE disciplines SET name = $1, department_id = $2 WHERE id = $3 RETURNING *';
    const result = await this.databaseService.query(query, [
      name,
      department_id,
      id,
    ]);
    return result[0]; // Возвращаем обновленную дисциплину
  }

  // Удаление дисциплины
  async remove(id: number) {
    const query = 'DELETE FROM disciplines WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленную дисциплину
  }
}