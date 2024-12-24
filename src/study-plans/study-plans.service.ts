import { Injectable } from '@nestjs/common';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from './dto/update-study-plan.dto';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService

@Injectable()
export class StudyPlansService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание нового учебного плана
  async create(createStudyPlanDto: CreateStudyPlanDto) {
    const { speciality_id, year, description } = createStudyPlanDto;
    const query =
      'INSERT INTO study-plans (speciality_id, year, description) VALUES ($1, $2, $3) RETURNING *';
    const result = await this.databaseService.query(query, [
      speciality_id,
      year,
      description,
    ]);
    return result[0]; // Возвращаем созданный учебный план
  }

  // Получение всех учебных планов
  async findAll() {
    const query = 'SELECT * FROM study-plans';
    const result = await this.databaseService.query(query);
    return result; // Возвращаем все учебные планы
  }

  // Получение учебного плана по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM study-plans WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем учебный план по ID
  }

  // Обновление учебного плана
  async update(id: number, updateStudyPlanDto: UpdateStudyPlanDto) {
    const { speciality_id, year, description } = updateStudyPlanDto;
    const query =
      'UPDATE study-plans SET speciality_id = $1, year = $2, description = $3 WHERE id = $4 RETURNING *';
    const result = await this.databaseService.query(query, [
      speciality_id,
      year,
      description,
      id,
    ]);
    return result[0]; // Возвращаем обновленный учебный план
  }

  // Удаление учебного плана
  async remove(id: number) {
    const query = 'DELETE FROM study-plans WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленный учебный план
  }
}