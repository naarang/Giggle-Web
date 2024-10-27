import {
  deleteEducation,
  deleteEtcLanguageLevel,
  deleteIntroduction,
  deleteWorkExperience,
  getEducation,
  getLanguagesSummaries,
  getResume,
  getWorkExperience,
  patchIntroduction,
  patchLanguagesLevel,
  patchWorkExperience,
  postEducation,
  postEtcLanguageLevel,
  postWorkExperience,
} from '@/api/resumes';
import { LanguagesLevelType } from '@/types/api/resumes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Profil page

// 7.1 (유학생/고용주) 이력서 조회하기
export const useGetResume = () => {
  return useQuery({
    queryKey: ['resume'],
    queryFn: getResume,
  });
};

// 7.15 (유학생) 자기소개 삭제하기
export const useDeleteIntroduction = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteIntroduction,
    onSuccess: () => {
      navigate('/profile/manage-resume');
    },
    onError: (error) => {
      console.error('자기소개 삭제 실패', error);
    },
  });
};

// 7.16 (유학생) 경력 삭제하기
export const useDeleteWorkExperience = () => {
  return useMutation({
    mutationFn: deleteWorkExperience,
    onSuccess: () => {
      console.log('경력 삭제 성공');
    },
    onError: (error) => {
      console.error('경력 삭제 실패', error);
    },
  });
};

// 7.17 (유학생) 학력 삭제하기
export const useDeleteEducation = () => {
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      console.log('학력 삭제 성공');
    },
    onError: (error) => {
      console.error('학력 삭제 실패', error);
    },
  });
};

// Profile - 수정 페이지

// 7.8 (유학생) 자기소개 수정하기
export const usePatchIntroduction = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchIntroduction,
    onSuccess: () => {
      navigate('/profile/manage-resume');
    },
    onError: (error) => {
      console.error('자기소개 작성 실패', error);
    },
  });
};

// 7.5 경력 생성하기
export const usePostWorkExperience = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postWorkExperience,
    onSuccess: () => {
      navigate('/profile/manage-resume');
    },
    onError: (error) => {
      console.error('경력 작성 실패', error);
    },
  });
};

// 7.2 경력 상세 조회하기
export const useGetWorkExperience = (id: number) => {
  return useQuery({
    queryKey: ['workExperience', id],
    queryFn: () => getWorkExperience(id),
  });
};

// 7.9 (유학생) 경력 수정하기
export const usePatchWorkExperience = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchWorkExperience,
    onSuccess: () => {
      navigate('/profile/manage-resume');
    },
    onError: (error) => {
      console.error('경력 수정 실패', error);
    },
  });
};

// 7.6 학력 생성하기
export const usePostEducation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postEducation,
    onSuccess: () => {
      navigate('/profile/manage-resume');
    },
    onError: (error) => {
      console.error('학력 작성 실패', error);
    },
  });
};

// 7.3 학력 상세 조회하기
export const useGetEducation = (id: number) => {
  return useQuery({
    queryKey: ['education', id],
    queryFn: () => getEducation(id),
  });
};

// 7.10 (유학생) 학력 수정하기
export const usePatchEducation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchWorkExperience,
    onSuccess: () => {
      navigate('/profile/manage-resume');
    },
    onError: (error) => {
      console.error('학력 수정 실패', error);
    },
  });
};

// 7.4 언어 요약 조회하기
export const useGetLanguagesSummaries = () => {
  return useQuery({
    queryKey: ['languagesSummaries'],
    queryFn: getLanguagesSummaries,
  });
};

export const usePatchLanguagesLevel = ({
  type,
  level,
}: {
  type: LanguagesLevelType;
  level: number;
}) => {
  return useMutation({
    mutationFn: () => patchLanguagesLevel({ type, level }),
    onError: (error) => {
      console.error('언어 레벨 수정 실패', error);
    },
  });
};

// 7.7 언어 - ETC 생성하기
export const usePostEtcLanguageLevel = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postEtcLanguageLevel,
    onSuccess: () => {
      navigate('/resume/language');
    },
    onError: (error) => {
      console.error('ETC 작성 실패', error);
    },
  });
};

// 7.18 (유학생) 언어 - ETC 삭제하기
export const useDeleteEtcLanguageLevel = () => {
  return useMutation({
    mutationFn: deleteEtcLanguageLevel,
    onSuccess: () => {
      console.log('ETC 삭제 성공');
    },
    onError: (error) => {
      console.error('ETC 삭제 실패', error);
    },
  });
};

// TODO: ETC 수정하기 추가
