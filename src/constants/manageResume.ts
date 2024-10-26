import { School } from "@/types/api/document";
import { ResumeDetailItemType } from "@/types/postApply/resumeDetailItem";

export const enum ManageResumeType {
  VISA = 'VISA',
  PERSONALINFORMATION = 'Personal Information',
  INTRODUCTION = 'Introduction',
  WORKEXPERIENCE = 'Work Experience',
  EDUCATION = 'Education',
  LANGUAGE = 'Language',
}

export const EducationLevels = ['BACHELOR','ASSOCIATE', 'HIGHSCHOOL'];

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