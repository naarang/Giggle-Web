import { EmployerPostItemType } from '@/types/post/employerPostItem';
import { PostSummaryItemType } from '@/types/post/postSummaryItem';

// 더미데이터
export const EMPLOYER_POST_LIST: EmployerPostItemType[] = [
  {
    id: 1,
    icon_img_url: 'https://example.com/image1.png',
    title: 'Barista',
    address_name: '123 Main St, City',
    hourly_rate: 15,
    duration_of_days: 30,
  },
  {
    id: 2,
    icon_img_url: 'https://example.com/image2.png',
    title: 'Delivery Driver',
    address_name: '456 Side St, City',
    hourly_rate: 18,
    duration_of_days: 15,
  },
  {
    id: 3,
    icon_img_url: 'https://example.com/image3.png',
    title: 'Tutor',
    address_name: '789 Park Ave, City',
    hourly_rate: 25,
    duration_of_days: 45,
  },
];

// 4.7 더미데이터
export const POST_SUMMARY_ITEM: PostSummaryItemType = {
  icon_img_url: 'https://example.com/icon.png',
  company_name: 'Global Translations Ltd.',
  title: 'General Interpretation & Translation',
  tags: {
    is_recruiting: true,
    visa: 'D_2_1',
    job_category: 'GENERAL_INTERPRETATION_TRANSLATION',
  },
  summaries: {
    address: '123 Translation Ave, Seoul',
    houlry_rate: 15000,
    work_period: 'ONE_MONTH_TO_THREE_MONTHS',
    work_days_per_week: 5,
  },
};
