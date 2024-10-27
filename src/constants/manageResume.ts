import { LanguagesSummariesResponse } from '@/types/api/resumes';
import { ResumeDetailItemType } from '@/types/postApply/resumeDetailItem';
import { School } from '@/types/api/document';
import { GetEducationType } from '@/types/postResume/postEducation';
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

// 더미데이터 - TODO : 연결 후 삭제
export const ResumeData: ResumeDetailItemType = {
  profile_img_url:
    'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
  name: 'John Doe',
  visa: {
    visa: 'D_2_2',
    description: 'Student visa for academic studies',
  },
  personal_information: {
    main_address: '123 Main Street, Seoul',
    detailed_address: 'Apt 45B, Gangnam-gu',
    phone_number: '010-1234-5678',
    email: 'john.doe@example.com',
  },
  introduction:
    'A passionate software developer with experience in full-stack development.',
  work_experience: [
    {
      id: 1,
      title: 'Restaurant Work',
      description: 'Worked on developing and maintaining a web application.',
      start_date: '2021-03-01',
      end_date: '2023-05-15',
      duration: 805,
      work_place: 'Some Restaurant',
    },
    {
      id: 2,
      title: 'Restaurant Work2',
      description: 'Worked on developing and maintaining a web application.',
      start_date: '2021-03-01',
      end_date: '2023-05-15',
      duration: 805,
      work_place: 'Some Restaurant',
    },
  ],
  education: [
    {
      id: 1,
      education_level: 'ASSOCIATE',
      school_name: 'Dongguk University',
      major: 'Department of Computer Engineering',
      start_date: '2017-03-01',
      end_date: '2021-02-28',
      grade: 3,
    },
    {
      id: 2,
      education_level: 'ASSOCIATE',
      school_name: 'Seoul National University',
      major: 'Department of Computer Engineering',
      start_date: '2017-03-01',
      end_date: '2021-02-28',
      grade: 3,
    },
  ],
  languages: {
    topik: 5,
    social_integration: 80,
    sejong_institute: 85,
    etc: [
      {
        id: 1,
        laguage_name: 'English',
        level: 4,
      },
      {
        id: 2,
        laguage_name: 'Japanese',
        level: 3,
      },
    ],
  },
};

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

// 학교 더미데이터
export const SearchSchollsList: School[] = [
  { id: 1, name: 'University of Oxford', phone_number: '000-0000' },
  {
    id: 2,
    name: 'National University of Lesotho International School',
    phone_number: '000-0000',
  },
  { id: 3, name: 'University of Chester CE Academy', phone_number: '000-0000' },
  {
    id: 4,
    name: 'University of Chester Academy Northwich',
    phone_number: '000-0000',
  },
  { id: 5, name: 'University of Birmingham School', phone_number: '000-0000' },
  { id: 6, name: 'University of Oxford', phone_number: '000-0000' },
  {
    id: 7,
    name: 'National University of Lesotho International School',
    phone_number: '000-0000',
  },
  { id: 8, name: 'University of Chester CE Academy', phone_number: '000-0000' },
  {
    id: 9,
    name: 'University of Chester Academy Northwich',
    phone_number: '000-0000',
  },
  { id: 10, name: 'University of Birmingham School', phone_number: '000-0000' },
];

// 학력 더미데이터
export const GetEducationData: GetEducationType = {
  education_level: 'BACHELOR', // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school: {
    id: 1,
    name: 'University of Chester Academy Northwich',
    phone_number: '000-0000',
  },
  major: 'Department of Computer Engineering',
  gpa: 3.5,
  start_date: '2021-03-01', // yyyy-MM-dd
  end_date: '2026-03-01', // yyyy-MM-dd
  grade: 4,
};

// 북마크 공고 더미데이터
export const ScrappedJobPostsData: JobPostingItemType[] = [
  {
    id: 1,
    is_book_marked: true, // 북마크 여부
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 1009, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-12', // 마감일자
    created_at: '2024-10-28', // 등록일자
  },
  {
    id: 2,
    is_book_marked: true, // 북마크 여부
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'lala shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 1009, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-30', // 마감일자
    created_at: '2024-10-28', // 등록일자
  },
  {
    id: 3,
    is_book_marked: true, // 북마크 여부
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 109, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 12000, // 시급
    recruitment_dead_line: '2024-11-30', // 마감일자
    created_at: '2024-10-28', // 등록일자
  },
  {
    id: 4,
    is_book_marked: true, // 북마크 여부
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 1009, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-12', // 마감일자
    created_at: '2024-10-28', // 등록일자
  },
  {
    id: 5,
    is_book_marked: true, // 북마크 여부
    icon_img_url:
      'https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg', // 회사 로고
    title: 'Coffee shop', // 공고 제목
    summaries: {
      address: 'Yeoksam-dong, Seoul', // 위치 정보
      work_period: '3 months', // 근무 기간
      work_days_per_week: 1009, // // 근무 일자
    },
    tags: {
      is_recruiting: true, // “모집중/마감"
      visa: 'D_1_1', // “비자종류"
      job_category: 'Industry', // “업직종종류",
    },
    hourly_rate: 10000, // 시급
    recruitment_dead_line: '2024-11-12', // 마감일자
    created_at: '2024-10-28', // 등록일자
  },
];
