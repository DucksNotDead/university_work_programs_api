import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService

@Injectable()
export class SpecialtiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание новой специальности
  async create(createSpecialtyDto: CreateSpecialtyDto) {
    const { name, direction, faculty_id } = createSpecialtyDto;
    const query =
      'INSERT INTO specialties (name, direction, faculty_id) VALUES ($1, $2, $3) RETURNING *';
    const result = await this.databaseService.query(query, [
      name,
      direction,
      faculty_id,
    ]);
    return result[0]; // Возвращаем созданную специальность
  }

  // Получение всех специальностей
  async findAll() {
    const query = 'SELECT * FROM specialties';
    return await this.databaseService.query(query); // Возвращаем все специальности
  }

  // Получение специальности по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM specialties WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем специальность по ID
  }

  // Обновление специальности
  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    const { name, direction, faculty_id } = updateSpecialtyDto;
    const query =
      'UPDATE specialties SET name = $1, direction = $2, faculty_id = $3 WHERE id = $4 RETURNING *';
    const result = await this.databaseService.query(query, [
      name,
      direction,
      faculty_id,
      id,
    ]);
    return result[0]; // Возвращаем обновленную специальность
  }

  // Удаление специальности
  async remove(id: number) {
    const query = 'DELETE FROM specialties WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленную специальность
  }
}