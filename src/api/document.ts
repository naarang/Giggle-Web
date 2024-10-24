import { PartTimePermitFormRequest } from '@/types/api/document';
import { api } from '.';

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
