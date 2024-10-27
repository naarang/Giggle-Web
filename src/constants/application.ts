import { ApplicantItemType } from '@/types/application/applicationItem';

export const enum APPLICATION_STEP {
  RESUME_UNDER_REVIEW = 'RESUME_UNDER_REVIEW',
  WAITING_FOR_INTERVIEW = 'WAITING_FOR_INTERVIEW',
  FILLING_OUT_DOCUMENTS = 'FILLING_OUT_DOCUMENTS',
  DOCUMENT_UNDER_REVIEW = 'DOCUMENT_UNDER_REVIEW',
  APPLICATION_IN_PROGRESS = 'APPLICATION_IN_PROGRESS',
  APPLICATION_SUCCESS = 'APPLICATION_SUCCESS',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  RESUME_REJECTED = 'RESUME_REJECTED',
  PENDING = 'PENDING',
  REGISTRATION_RESULTS = 'REGISTRATION_RESULTS',
}

export const APPLICATION_STATUS_TYPE = {
  INPROGRESS: 'Inprogress',
  APPLICATION_SUCCESSFUL: 'Applicatioin successful',
  APPLICATION_REJECTED: 'Applicatioin rejected',
  RESUME_REJECTED: 'resume rejected',
  PENDING: 'pending',
} as const;

export const KO_APPLICATION_STATUS_TYPE = {
  INPROGRESS: '진행중',
  APPLICATION_SUCCESSFUL: '계약 성공',
  APPLICATION_REJECTED: '시간제취업허가 실패',
  RESUME_REJECTED: '이력서 거절',
  PENDING: '대기',
} as const;

// 지원자 리스트 더미데이터
export const APPLICANT_LIST_DATA: ApplicantItemType[] = [
  {
    id: 1001,
    profile_img_url: 'https://example.com/images/applicant1.jpg',
    name: 'John Doe',
    nationality: 'USA',
    gender: 'Male',
    visa: 'D_2_1',
    school_name: 'Seoul National University',
    duration_of_days: 30,
    step: 'RESUME_UNDER_REVIEW',
  },
  {
    id: 1002,
    profile_img_url: 'https://example.com/images/applicant2.jpg',
    name: 'Jane Smith',
    nationality: 'Canada',
    gender: 'Female',
    visa: 'D_2_3',
    school_name: 'Korea University',
    duration_of_days: 60,
    step: 'WAITING_FOR_INTERVIEW',
  },
  {
    id: 1003,
    profile_img_url: 'https://example.com/images/applicant3.jpg',
    name: 'Samuel Green',
    nationality: 'UK',
    gender: 'Male',
    visa: 'F_2',
    school_name: 'Yonsei University',
    duration_of_days: 90,
    step: 'APPLICATION_SUCCESS',
  },
  {
    id: 1004,
    profile_img_url: 'https://example.com/images/applicant4.jpg',
    name: 'Emily White',
    nationality: 'Australia',
    gender: 'Female',
    visa: 'D_4_1',
    school_name: 'Sogang University',
    duration_of_days: 120,
    step: 'APPLICATION_IN_PROGRESS',
  },
  {
    id: 1005,
    profile_img_url: 'https://example.com/images/applicant5.jpg',
    name: 'Michael Brown',
    nationality: 'Germany',
    gender: 'Male',
    visa: 'D_2_2',
    school_name: 'Hanyang University',
    duration_of_days: 45,
    step: 'PENDING',
  },
];
