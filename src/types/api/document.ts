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

// 문서 타입별 정보를 담은 객체
export const DocumentTypeInfo = {
  [DocumentType.PART_TIME_PERMIT]: {
    name: 'Part-Time Work Permit Form',
    key: 'part_time_employment_permits',
  },
  [DocumentType.LABOR_CONTRACT]: {
    name: 'Employment Contract',
    key: 'standard_labor_contract',
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    name: 'Integrated Application Form',
    key: 'integrated_application',
  },
} as const;
