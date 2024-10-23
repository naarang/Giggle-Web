import { DocumentType, PartTimePermitFormRequest } from '@/types/api/document';

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

export const DocumentSubTitleContent = {
  [DocumentType.PART_TIME_PERMIT]: {
    name: 'Part-Time Employment Permit',
    key: 'part_time_employment_permits',
    content:
      "International students must have the applicable permit to work part-time or part-time. If you don't get permission, you can become an illegal resident.",
  },
  [DocumentType.LABOR_CONTRACT]: {
    name: 'Standard labor contract for short-time workers',
    key: 'standard_labor_contract',
    content:
      'Regardless of the type of employment, all workers are required to write an employment contract, which allows them to maintain a legal and transparent employment relationship.',
  },
  [DocumentType.INTEGRATED_APPLICATION]: {
    name: 'Application Form',
    key: 'integrated_application',
    content:
      'The Application Form is a required document that international students must submit to legally work part-time in Korea. This form reports the workplace and working conditions, allowing the student to obtain employment approval.',
  },
} as const;

// 시간제근무 허가 신청서 초기 state
export const initialPartTimePermitForm: PartTimePermitFormRequest = {
  first_name: '',
  last_name: '',
  major: '',
  term_of_completion: 0,
  phone_number: '',
  email: '',
};
