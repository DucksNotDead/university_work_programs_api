import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService
import { CreateDisciplineInStudyPlanDto } from './dto/create-discipline-in-study-plan.dto';
import { UpdateDisciplineInStudyPlanDto } from './dto/update-discipline-in-study-plan.dto';

@Injectable()
export class DisciplineInStudyPlansService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Создание записи дисциплины в учебном плане
  async create(createDisciplineInStudyPlanDto: CreateDisciplineInStudyPlanDto) {
    const { study_plan_id, discipline_id, semester, type, hours } =
      createDisciplineInStudyPlanDto;
    const query =
      'INSERT INTO disciplines_in_study_plans (study_plan_id, discipline_id, semester, type, hours) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await this.databaseService.query(query, [
      study_plan_id,
      discipline_id,
      semester,
      type,
      hours,
    ]);
    return result[0]; // Возвращаем созданную запись
  }

  // Получение всех дисциплин в учебных планах
  async findAll() {
    const query = 'SELECT * FROM disciplines_in_study_plans';
    const result = await this.databaseService.query(query);
    return result; // Возвращаем все записи
  }

  // Получение дисциплины в учебном плане по ID
  async findOne(id: number) {
    const query = 'SELECT * FROM disciplines_in_study_plans WHERE id = $1';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем запись по ID
  }

  // Обновление дисциплины в учебном плане
  async update(
    id: number,
    updateDisciplineInStudyPlanDto: UpdateDisciplineInStudyPlanDto,
  ) {
    const { study_plan_id, discipline_id, semester, type, hours } =
      updateDisciplineInStudyPlanDto;
    const query =
      'UPDATE disciplines_in_study_plans SET study_plan_id = $1, discipline_id = $2, semester = $3, type = $4, hours = $5 WHERE id = $6 RETURNING *';
    const result = await this.databaseService.query(query, [
      study_plan_id,
      discipline_id,
      semester,
      type,
      hours,
      id,
    ]);
    return result[0]; // Возвращаем обновленную запись
  }

  // Удаление записи дисциплины в учебном плане
  async remove(id: number) {
    const query =
      'DELETE FROM disciplines_in_study_plans WHERE id = $1 RETURNING *';
    const result = await this.databaseService.query(query, [id]);
    return result[0]; // Возвращаем удаленную запись
  }
}
