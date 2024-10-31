import { LanguagesSummariesResponse } from '@/types/api/resumes';
import { JobPostingItemType } from '@/types/common/jobPostingItem';

export const enum ManageResumeType {
  VISA = 'VISA',
  PERSONALINFORMATION = 'Personal Information',
  INTRODUCTION = 'Introduction',
  WORKEXPERIENCE = 'Work Experience',
  EDUCATION = 'Education',
  LANGUAGE = 'Language',
}

export const EducationLevels = ['BACHELOR', 'ASSOCIATE', 'HIGHSCHOOL'];

// 언어 더미데이터
export const LanguageData: LanguagesSummariesResponse = {
  topik_level: 3,
  social_integration_level: 2,
  sejong_institute: 3,
  additional_language: [
    {
      id: 1,
      language_name: 'English',
      level: 5,
    },
    {
      id: 2,
      language_name: 'Japanese',
      level: 5,
    },
  ],
};

// 북마크 공고 더미데이터
export const ScrappedJobPostsData: JobPostingItemType[] = [
  {
    id: 1,
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 3, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-12', // 마감일자
    created_at: '2024-10-28T00:40:00', // 등록일자
  },
  {
    id: 2,
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'lala shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 4, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-30', // 마감일자
    created_at: '2024-10-28T00:10:00', // 등록일자
  },
  {
    id: 3,
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 1, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 12000, // 시급
    recruitment_dead_line: '2024-11-30', // 마감일자
    created_at: '2024-10-28T00:38:00', // 등록일자
  },
  {
    id: 4,
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 5, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-12', // 마감일자
    created_at: '2024-10-28T00:30:00', // 등록일자
  },
  {
    id: 5,
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 3, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-12', // 마감일자
    created_at: '2024-10-28T00:03:00', // 등록일자
  },
];
