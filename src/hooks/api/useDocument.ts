import { postPartTimeEmployPermit } from '@/api/document';
import { DocumentType } from '@/types/api/document';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

//시간제취업허가서 작성 api 통신 커스텀 훅
export const usePostPartTimeEmployPermit = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postPartTimeEmployPermit,
    onSuccess: () => {
      navigate('/');
    },
    onError: () =>
      navigate('/write-documents', {
        state: {
          type: DocumentType.PART_TIME_PERMIT,
        },
      }),
  });
};
