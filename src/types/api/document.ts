import { Address } from '@/types/api/users';

export type DocumentStatus =
  | 'TEMPORARY_SAVE'
  | 'SUBMITTED'
  | 'BEFORE_CONFIRMATION'
  | 'REQUEST'
  | 'CONFIRMATION';

export type DocumentInfo = {
  id: number;
  pdf_url?: string;
  hwp_url?: string;
  word_url?: string;
  status?: DocumentStatus;
};

export type IntegratedApplicationInfo = {
  id: number;
  pdf_url?: string;
  hwp_url?: string;
  word_url?: string;
};

export type DocumentsSummaryResponse = {
  part_time_employment_permits?: DocumentInfo;
  standard_labor_contract?: DocumentInfo;
  integrated_application?: DocumentInfo;
};

export enum DocumentType {
  PART_TIME_PERMIT = 'part_time_employment_permits',
  LABOR_CONTRACT = 'standard_labor_contract',
  INTEGRATED_APPLICATION = 'integrated_application',
}

// 시간제취업 허가서

export type EmployeeInformation = {
  first_name: string;
  last_name: string;
  major: string;
  term_of_completion: number;
  phone_number: string;
  email: string;
}

export type EmployerInformation = {
  company_name?: string;
  company_registration_number?: string;
  job_type?: string;
  address?: Address;
}

export type PartTimePermitData = {
  employee_information: EmployeeInformation;
  employer_information?: EmployerInformation;
}

export type PartTimePermitFormRequest = {
  first_name: string;
  last_name: string;
  major: string;
  term_of_completion: number;
  phone_number: string;
  email: string;
}