import {
  ApplicantDetailItemType,
  ApplicantItemType,
  ApplicationStepExplainType,
} from '@/types/application/applicationItem';

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

// 지원 상태 상세 조회 더미데이터
export const APPLICANT_DETAIL_DATA: ApplicantDetailItemType = {
  profile_img_url: 'https://example.com/images/applicant1.jpg',
  name: 'John Doe',
  nationality: 'USA',
  gender: 'Male',
  visa: 'D_2_1',
  school_name: 'Seoul National University',
  duration_of_days: 30,
  step: 'RESUME_UNDER_REVIEW',
};

// 지원 상태 단계별 문구
export const APPLICATION_STEP_EXPLAIN_DATA: ApplicationStepExplainType[] = [
  {
    step: 1,
    title: 'Resume Verification',
    explain: 'The employer is currently reviewing your resume.',
  },
  {
    step: 2,
    title: 'Interview Preparation',
    explain: 'Please check the employment contract and work conditions.',
  },
  {
    step: 3,
    title: 'Document Preparation',
    explain:
      'Please prepare the documents required for a part-time work permit.',
  },
  {
    step: 4,
    title: 'Document Review by the International Student Coordinator',
    explain:
      'Get the documents reviewed by the international student coordinator at your school.',
  },
  {
    step: 5,
    title: 'HiKorea e-Government Applica',
    explain: 'Apply for a part-time work permit through HiKorea.',
  },
  {
    step: 6,
    title: 'Result Registration',
    explain: 'Please register the results.',
  },
];

export const KO_APPLICATION_STEP_EXPLAIN_DATA: ApplicationStepExplainType[] = [
  {
    step: 1,
    title: '이력서 확인',
    explain: '이력서를 확인하고 승인해주세요.',
  },
  {
    step: 2,
    title: '면접 진행',
    explain: '면접을 동해 지원자를 확인하고 근무 조건에 대해 이야기하세요.',
  },
  {
    step: 3,
    title: '서류 작성',
    explain: '유학생의 시간제 취업허가를 위해 필요한 서류를 준비해주세요.',
  },
  {
    step: 4,
    title: '유학생의 서류 검토',
    explain: '유학생이 서류를 검토받고 있어요.',
  },
  {
    step: 5,
    title: '유학생의 하이코리아 전자민원 신청',
    explain: '유학생이 하이코리아에 시간제 취업허가를 신청했어요.',
  },
  {
    step: 6,
    title: '결과 확인',
    explain: '결과를 확인하세요.',
  },
];
