import HomeIcon from '@/assets/icons/HomeIcon.svg?react';
import SearchIcon from '@/assets/icons/NavSearchIcon.svg?react';
import DocumentsIcon from '@/assets/icons/DocumentsIcon.svg?react';
import ProfileIcon from '@/assets/icons/ProfileIcon.svg?react';

export const userRoutes = [
  {
    path: '/',
    svg: HomeIcon,
  },
  {
    path: '/search',
    svg: SearchIcon,
  },
  {
    path: '/application',
    svg: DocumentsIcon,
  },
  {
    path: '/profile',
    svg: ProfileIcon,
  },
];

export const employerRoutes = [
  {
    path: '/',
    svg: HomeIcon,
  },
  {
    path: '/search',
    svg: SearchIcon,
  },
  {
    path: '/employer/post',
    svg: DocumentsIcon,
  },
  {
    path: '/employer/profile',
    svg: ProfileIcon,
  },
];

export const guestRoutes = [
  {
    path: '/',
    svg: HomeIcon,
  },
  {
    path: '/search',
    svg: SearchIcon,
  },
  {
    path: '/signin',
    svg: DocumentsIcon,
  },
  {
    path: '/signin',
    svg: ProfileIcon,
  },
];
