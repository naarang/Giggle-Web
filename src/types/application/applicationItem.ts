export type ApplicationStepType =
  | 'RESUME_UNDER_REVIEW'
  | 'WAITING_FOR_INTERVIEW'
  | 'FILLING_OUT_DOCUMENTS'
  | 'DOCUMENT_UNDER_REVIEW'
  | 'APPLICATION_IN_PROGRESS'
  | 'APPLICATION_SUCCESS'
  | 'APPLICATION_REJECTED'
  | 'RESUME_REJECTED'
  | 'PENDING'
  | 'REGISTRATION_RESULTS';

export type AppicationItemType = {
  job_posting_id: number;
  user_owner_job_posting_id: number;
  icon_img_url: string;
  title: string;
  address_name: string;
  step: ApplicationStepType;
  hourly_rate: number;
  duration_of_days: number;
};
