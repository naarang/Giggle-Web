import {
  DocumentType,
  EmployerInfoProperty,
  EmployerInformation,
  LaborContractEmployeeInfo,
  PartTimePermitFormRequest,
} from '@/types/api/document';

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
  phone_number: '000-0000-0000',
  email: '',
};

export const PartTimeEmployPermitEmployerInfo = {
  [EmployerInfoProperty.COMPANY_NAME]: {
    name: 'Company name',
    key: 'company_name',
  },
  [EmployerInfoProperty.COMPANY_REGISTRATION_NUMBER]: {
    name: 'Business registration number',
    key: 'company_registration_number',
  },
  [EmployerInfoProperty.JOB_TYPE]: {
    name: 'Industry',
    key: 'job_type',
  },
  [EmployerInfoProperty.ADDRESS]: {
    name: 'Address in Korea',
    key: 'address',
  },
} as const;

export const mockEmployerInformation: EmployerInformation = {
  company_name: '테크스타트 주식회사',
  company_registration_number: '123-45-67890',
  job_type: '정보통신업',
  address: {
    address_name: '서울 강남구 테헤란로 401 팁스타운',
    region_1depth_name: '서울',
    region_2depth_name: '강남구',
    region_3depth_name: '삼성동',
    region_4depth_name: '테헤란로 401',
    address_detail: '팁스타운 6층',
    longitude: 127.0507355,
    latitude: 37.5051374,
  },
};

// 표준계약서 초기 state
export const initialLaborContractEmployeeInfo: LaborContractEmployeeInfo = {
  first_name: '',
  last_name: '',
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    detail_address: '',
  },
  phone_number: '',
  signature_base64: '',
};
