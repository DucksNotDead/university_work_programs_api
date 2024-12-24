import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';

@Injectable()
export class StandardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание нового стандарта
  async create(createStandardDto: CreateStandardDto) {
    const { discipline_id } = createStandardDto;
    const query =
      'INSERT INTO standards (discipline_id) VALUES ($1) RETURNING *';
    const result = await this.databaseService.query(query, [discipline_id]);
    return result[0]; // Возвращаем созданный стандарт
  }

  // Получение всех стандартов
  async findAll() {
    const query = 'SELECT * FROM standards';
    return await this.databaseService.query(query); // Возвращаем все стандарты
  }

  // Получение стандарта по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM standards WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем стандарт по ID
  }

  // Обновление стандарта
  async update(id: number, updateStandardDto: UpdateStandardDto) {
    const { discipline_id } = updateStandardDto;
    const query =
      'UPDATE standards SET discipline_id = $1 WHERE id = $2 RETURNING *';
    const result = await this.databaseService.query(query, [discipline_id, id]);
    return result[0]; // Возвращаем обновленный стандарт
  }

  // Удаление стандарта
  async remove(id: number) {
    const query = 'DELETE FROM standards WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленный стандарт
  }
}
