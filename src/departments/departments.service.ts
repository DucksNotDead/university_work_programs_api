import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService

@Injectable()
export class DepartmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание нового департамента
  async create(createDepartmentDto: CreateDepartmentDto) {
    const { name, faculty_id, head_id } = createDepartmentDto;
    const query =
      'INSERT INTO departments (name, faculty_id, head_id) VALUES ($1, $2, $3) RETURNING *';
    const result = await this.databaseService.query(query, [
      name,
      faculty_id,
      head_id,
    ]);
    return result[0]; // Возвращаем созданный департамент
  }

  // Получение всех департаментов
  async findAll() {
    const query = 'SELECT * FROM departments';
    return await this.databaseService.query(query); // Возвращаем все департаменты
  }

  // Получение департамента по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM departments WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем департамент по ID
  }

  // Обновление департамента
  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const { name, faculty_id, head_id } = updateDepartmentDto;
    const query =
      'UPDATE departments SET name = $1, faculty_id = $2, head_id = $3 WHERE id = $4 RETURNING *';
    const result = await this.databaseService.query(query, [
      name,
      faculty_id,
      head_id,
      id,
    ]);
    return result[0]; // Возвращаем обновленный департамент
  }

  // Удаление департамента
  async remove(id: number) {
    const query = 'DELETE FROM departments WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленный департамент
  }
}