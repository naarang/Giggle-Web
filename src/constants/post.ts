import { EmployerPostItemType } from '@/types/post/employerPostItem';

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
