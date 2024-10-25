import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';

export const findCurrentStep = (step: ApplicationStepType) => {
  switch (step) {
    case APPLICATION_STEP.RESUME_UNDER_REVIEW:
      return 1;
    case APPLICATION_STEP.WAITING_FOR_INTERVIEW:
      return 2;
    case APPLICATION_STEP.FILLING_OUT_DOCUMENTS:
      return 3;
    case APPLICATION_STEP.DOCUMENT_UNDER_REVIEW:
      return 4;
    case APPLICATION_STEP.APPLICATION_IN_PROGRESS:
      return 5;
    case APPLICATION_STEP.APPLICATION_SUCCESS:
      return 7;
    case APPLICATION_STEP.APPLICATION_REJECTED:
      return 7;
    default:
      return 6;
  }
};
