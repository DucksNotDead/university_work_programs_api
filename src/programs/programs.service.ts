import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service'; // Импортируем DatabaseService
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import * as ExcelJS from 'exceljs';
import Workbook from 'exceljs/index';
import { EStudyType, ruStudyTypes } from '../../shared/enums';
import { ProgramReport } from './entities/program.entity';

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
    const query = `WITH
    subsection_data AS (
        SELECT
            psu.section_id,
            json_agg(
                json_build_object(
                    'id', psu.id,
                    'label', psu.label,
                    'type', psu.type,
                    'volume', psu.volume
                )
            ) AS items,
            SUM(psu.volume) AS total
        FROM
            program_subsections psu
        GROUP BY
            psu.section_id
    ),
    section_data AS (
        SELECT
            ps.standard_id,
            json_agg(
                json_build_object(
                    'id', ps.id,
                    'title', ps.title,
                    'subsections', ssd.items
                )
            ) as items,
            SUM(ssd.total) as total
        FROM
            program_sections ps
        LEFT JOIN
            subsection_data ssd ON ps.id = ssd.section_id
        GROUP BY ps.standard_id
    )
SELECT
    program.*,
    discipline.name AS discipline_name,
    section.items as sections,
    section.total
FROM
    programs program
JOIN
    standards standard ON standard.id = program.standard_id
JOIN
    disciplines discipline ON standard.discipline_id = discipline.id
LEFT JOIN
    section_data section ON section.standard_id = program.standard_id
WHERE
    program.id = $1`;

    const result = await this.databaseService.query(query, [id]);

    return result[0];
  }

  // Экспорт отчёта
  async createReportFile(id: number): Workbook {
    const report: ProgramReport = await this.getReport(id);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Рабочая программа');

    worksheet.addRow([
      'ID',
      'Название дисциплины',
      'Полный объём',
      '',
      'Контрольные вопросы',
      'Умения, навыки',
      'Список литературы',
    ]);
    const mainRow = worksheet.addRow([
      `${report.id}`,
      report.discipline_name,
      Number(report.total ?? 0),
      '',
      report.questions,
      report.skills,
      report.literature,
    ]);

    worksheet.getCell('C2').font = { bold: true, color: { theme: 4 } };

    worksheet.addRow([]);

    if (report.sections?.length) {
      worksheet.addRow([
        'Раздел/Подраздел',
        'Вид занятий',
        'Длительность изложения',
      ]);
    }

    report.sections?.forEach((section) => {
      const sectionRow = worksheet.addRow([section.title, '', section.total]);
      sectionRow.font = { bold: true };
      section.subsections?.forEach((subsection) => {
        worksheet.addRow([
          `— ${subsection.label}`,
          ruStudyTypes[subsection.type],
          subsection.volume,
        ]);
      });
    });

    //auto-fit
    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column['eachCell']({ includeEmpty: true }, function (cell) {
        const columnLength = cell.value ? cell.value.toString().length + 2 : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

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
