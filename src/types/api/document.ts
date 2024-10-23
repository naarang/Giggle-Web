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
