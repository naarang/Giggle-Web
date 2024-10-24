import { Address } from '@/types/api/users';

//현재 문서의 작성 상태
export type DocumentStatus =
  | 'TEMPORARY_SAVE'
  | 'SUBMITTED'
  | 'BEFORE_CONFIRMATION'
  | 'REQUEST'
  | 'CONFIRMATION';

// 통합 신청서 외 문서 타입
export type DocumentInfo = {
  id: number;
  pdf_url?: string;
  hwp_url?: string;
  word_url?: string;
  status?: DocumentStatus;
};

// 통합 신청서 타입
export type IntegratedApplicationInfo = {
  id: number;
  pdf_url?: string;
  hwp_url?: string;
  word_url?: string;
};

// 문서 상태 조회 응답 양식
export type DocumentsSummaryResponse = {
  part_time_employment_permits?: DocumentInfo;
  standard_labor_contract?: DocumentInfo;
  integrated_application?: DocumentInfo;
};

// 문서 종류 property와 이름 mapping
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

// 고용주 정보 property와 이름 mapping
export enum EmployerInfoProperty {
  COMPANY_NAME = 'company_name',
  COMPANY_REGISTRATION_NUMBER = 'company_registration_number',
  JOB_TYPE = 'job_type',
  ADDRESS = 'address'
}

// 고용주 정보 타입
export type EmployerInformation = {
  company_name?: string;
  company_registration_number?: string;
  job_type?: string;
  address?: Address;
}

// 시간제 근무 허가서 조회 응답 양식
export type PartTimePermitData = {
  employee_information: EmployeeInformation;
  employer_information?: EmployerInformation;
}

// 시간제 근무 허가서 작성 양식
export type PartTimePermitFormRequest = {
  first_name: string;
  last_name: string;
  major: string;
  term_of_completion: number;
  phone_number: string;
  email: string;
}