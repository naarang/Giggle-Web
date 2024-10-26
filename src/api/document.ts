import {
  IntegratedApplicationData,
  LaborContractEmployeeInfo,
  PartTimePermitFormRequest,
  SearchSchoolResponse,
} from '@/types/api/document';
import { api } from '.';
import { PartTimePermitFormRequest } from '../types/api/document';

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
}): Promise<{ success: boolean }> => {
  const response = await api.put(
    `/users/documents/${id}/part-time-employment-permits`,
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
