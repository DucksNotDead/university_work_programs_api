import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { DatabaseService } from 'src/database/database.service'; // Импортируем вашу базу данных

@Injectable()
export class FacultiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createFacultyDto: CreateFacultyDto) {
    const { name } = createFacultyDto;

    const query = 'INSERT INTO faculties (name) VALUES ($1) RETURNING *';
    const result = await this.databaseService.query(query, [name]);
    return result[0]; // Возвращаем созданный факультет
  }

  async findAll() {
    const query = 'SELECT * FROM faculties';
    return await this.databaseService.query(query); // Возвращаем все факультеты
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM faculties WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем факультет по ID
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    const { name } = updateFacultyDto;
    const query = 'UPDATE faculties SET name = $1 WHERE id = $2 RETURNING *';
    const result = await this.databaseService.query(query, [name, id]);
    return result[0]; // Возвращаем обновленный факультет
  }

  async remove(id: number) {
    const query = 'DELETE FROM faculties WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленный факультет
  }
}
