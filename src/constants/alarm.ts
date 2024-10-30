import { AlarmItemType } from '@/types/api/alarm';

// 더미데이터
export const ALARM_LIST_DATA: AlarmItemType[] = [
  {
    id: 1,
    title: 'Welcome to the platform!',
    description: "Thank you for joining. We're glad to have you on board!",
    is_read: false,
    created_at: '2024.10.29',
  },
  {
    id: 2,
    title: 'System Maintenance',
    description:
      'Scheduled maintenance will occur on 2024.11.05 from 2:00 AM to 4:00 AM.',
    is_read: false,
    created_at: '2024.10.20',
  },
  {
    id: 3,
    title: 'New Features Released',
    description: 'Check out the latest features in your profile settings.',
    is_read: true,
    created_at: '2024.10.27',
  },
];
