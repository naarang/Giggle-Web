import {
  DocumentsSummaryResponse,
  EmployDocumentsSummaryResponse,
  EmployerInformation,
  IntegratedApplicationData,
  LaborContractDataResponse,
  LaborContractEmployeeInfo,
  LaborContractEmployerInfo,
  PartTimePermitData,
  PartTimePermitFormRequest,
  SearchSchoolResponse,
} from '@/types/api/document';
import { api } from '.';
import { RESTYPE } from '@/types/api/common';

//시간제 취업허가서 작성 api 통신 함수
export const postPartTimeEmployPermit = async ({
  id,
  document,
}: {
  id: number;
  document: PartTimePermitFormRequest;
}): Promise<{ id: number }> => {
  const response = await api.post(
    `/users/user-owner-job-postings/${id}/documents/part-time-employment-permits`,
    document,
  );
  return response.data;
};

// 8.10 (유학생) 시간제 취업허가서 수정하기
export const putPartTimeEmployPermit = async ({
  id,
  document,
}: {
  id: number;
  document: PartTimePermitFormRequest;
}): Promise<RESTYPE<null>> => {
  const response = await api.put(
    `/users/documents/${id}/part-time-employment-permits`,
    document,
  );
  return response.data;
};

// 8.11 (고용주) 시간제 취업허가서 수정하기
export const putPartTimeEmployPermitEmployer = async ({
  id,
  document,
}: {
  id: number;
  document: EmployerInformation;
}): Promise<RESTYPE<null>> => {
  const response = await api.put(
    `/owners/documents/${id}/part-time-employment-permits`,
    document,
  );
  return response.data;
};

// 8.6 표준 근로계약서 작성 api 통신 함수
export const postStandardLaborContracts = async ({
  id,
  document,
}: {
  id: number;
  document: LaborContractEmployeeInfo;
}): Promise<{ id: number }> => {
  const response = await api.post(
    `/users/user-owner-job-postings/${id}/documents/standard-labor-contracts`,
    document,
  );
  return response.data;
};

// 8.12 (유학생) 근로계약서 수정하기
export const putStandardLaborContracts = async ({
  id,
  document,
}: {
  id: number;
  document: LaborContractEmployeeInfo;
}): Promise<{ success: boolean }> => {
  const response = await api.put(
    `/users/documents/${id}/standard-labor-contracts`,
    document,
  );
  return response.data;
};

// 8.13 (고용주) 시간제 취업허가서 수정하기
export const putLaborContractEmployer = async ({
  id,
  document,
}: {
  id: number;
  document: LaborContractEmployerInfo;
}): Promise<RESTYPE<null>> => {
  const response = await api.put(
    `/owners/documents/${id}/standard-labor-contracts`,
    document,
  );
  return response.data;
};

// 8.8 통합신청서 작성 api 통신 함수
export const postIntegratedApplications = async ({
  id,
  document,
}: {
  id: number;
  document: IntegratedApplicationData;
}): Promise<{ id: number }> => {
  const response = await api.post(
    `/users/user-owner-job-postings/${id}/documents/integrated_applications`,
    document,
  );
  return response.data;
};

// 8.14 통합신청서 수정 api 통신 함수
export const putIntegratedApplications = async ({
  id,
  document,
}: {
  id: number;
  document: IntegratedApplicationData;
}): Promise<{ success: boolean }> => {
  const response = await api.post(
    `/users/documents/${id}/integrated-applications`,
    document,
  );
  return response.data;
};

// 9.1 (유학생)학교명 검색 api 통신 함수
export const searchSchool = async (
  name: string,
): Promise<SearchSchoolResponse> => {
  const response = await api.post(
    `/users/schools/brief?search=${name}&page=1&size=7`,
  );
  return response.data;
};

// 8.9 (유학생) 서류 (근로계약서, 시간제 취업허가서) 재검토 요청하기
export const postRequest = async ({
  id,
  reason,
}: {
  id: number;
  reason: string;
}): Promise<{ id: number }> => {
  const response = await api.post(`/users/documents/${id}/status/requestion`, {
    reason: reason,
  });
  return response.data;
};

// 8.1 (유학생) 서류 조회하기
export const getDocumentsEmployee = async (
  id: number,
): Promise<RESTYPE<DocumentsSummaryResponse>> => {
  const response = await api.get(
    `users/user-owner-job-postings/${id}/documents/summaries`,
  );
  return response.data;
};

// 8.2 (고용주) 서류 조회하기
export const getDocumentsEmployer = async (
  id: number,
): Promise<RESTYPE<EmployDocumentsSummaryResponse>> => {
  const response = await api.get(
    `owners/user-owner-job-postings/${id}/documents/summaries`,
  );
  return response.data;
};

// 8.3 (유학생/고용주) 시간제 취업 허가서 조회하기
export const getPartTimeEmployPermit = async (
  id: number,
): Promise<RESTYPE<PartTimePermitData>> => {
  const response = await api.get(
    `documents/${id}/part-time-employment-permit/details`,
  );
  return response.data;
};

// 8.4 (유학생/고용주) 근로계약서 조회하기
export const getStandardLaborContract = async (
  id: number,
): Promise<RESTYPE<LaborContractDataResponse>> => {
  const response = await api.get(
    `documents/${id}/standard-labor-contract/details`,
  );
  return response.data;
};

// 8.5 (유학생/고용주) 통합신청서 조회하기
export const getIntegratedApplication = async (
  id: number,
): Promise<RESTYPE<IntegratedApplicationData>> => {
  const response = await api.get(
    `documents/${id}/integrated-application/details`,
  );
  return response.data;
};
