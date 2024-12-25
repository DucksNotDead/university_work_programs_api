import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import * as ExcelJS from 'exceljs';
import Workbook from 'exceljs/index';
import { EStudyType } from '../../shared/enums';

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

  //Получение данных для отчёта
  private async getReport(id: number) {
    const query = `WITH subsection_data AS (
    SELECT
        psu.section_id,
        json_agg(
            json_build_object(
                'subsection_id', psu.id,
                'subsection_type', psu.type,
                'subsection_volume', psu.volume
            )
        ) AS subsections,
        SUM(psu.volume) AS total_subsection_volume
    FROM
        program_subsections psu
    GROUP BY
        psu.section_id
)
SELECT
    p.id AS program_id,
    p.questions,
    p.skills,
    p.literature,
    d.name AS discipline_name,  -- Название дисциплины
    json_agg(
        json_build_object(
            'section_id', ps.id,
            'section_title', ps.title,
            'subsections', sd.subsections,
            'total_subsection_volume', sd.total_subsection_volume
        )
    ) AS sections,
    SUM(sd.total_subsection_volume) AS total_program_volume
FROM
    programs p
JOIN
    program_sections ps ON p.id = ps.standard_id
JOIN standards st ON st.id = p.standard_id
JOIN
    disciplines d ON st.discipline_id = d.id  -- Добавляем соединение с дисциплинами
LEFT JOIN
    subsection_data sd ON ps.id = sd.section_id
WHERE
    p.id = $1
GROUP BY
    p.id, d.name; `;

    const result = await this.databaseService.query(query, [id]);

    return result[0];
  }

  // Экспорт отчёта
  async createReportFile(id: number): Workbook {
    const ruStudyTypes: Record<EStudyType, string> = {
      [EStudyType.Lecture]: 'Лекции',
      [EStudyType.Lab]: 'Лабараторные',
      [EStudyType.Practice]: 'Практика',
    };

    const report = await this.getReport(id);

    // Создание Workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Рабочая программа');

    // Заголовки для программы
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 15 },
      { header: 'Название дисциплины', key: 'name', width: 20 },
      { header: 'Полный объём', key: 'volume', width: 10 },
    ];
    worksheet.addRow([
      report.program_id,
      report.discipline_name,
      report.total_program_volume,
    ]);

    // Пробел между секциями
    worksheet.addRow([]);

    // Заголовки секций
    worksheet.addRow(['Раздел', 'Подраздел', 'Объём']);

    // Данные секций и подразделов
    for (const section of report.sections) {
      const sectionRow = worksheet.addRow([
        section.section_title,
        '',
        section.total_subsection_volume,
      ]);
      // Сделаем жирным текст для секций
      sectionRow.font = { bold: true };

      for (const subsection of section.subsections) {
        worksheet.addRow([
          '',
          ruStudyTypes[subsection.subsection_type],
          subsection.subsection_volume,
        ]);
      }
    }

    return workbook;
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
