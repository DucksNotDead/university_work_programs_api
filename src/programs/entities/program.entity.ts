import { EStudyType } from '../../../shared/enums';

interface ISubsection {
  id: number;
  label: string;
  type: EStudyType;
  volume: number;
}

interface IReportSection {
  id: number;
  title: string;
  subsections: ISubsection[] | null;
  total: number;
}

export class Program {
  id: number;
  standard_id: number;
  questions: string;
  skills: string;
  literature: string;
}

export class ProgramReport extends Program {
  discipline_name: string;
  sections: IReportSection[] | null;
  total: number;
}
