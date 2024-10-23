import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostDetailApplyButton from '@/components/PostDetail/PostDetailApplyButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import PostDetailTitle from '@/components/PostDetail/PostDetailTitle';
import { PostDetailItemType } from '@/types/postDetail/postDetailItem';
import { useNavigate } from 'react-router-dom';

// 더미데이터
const POST_DETAIL_DATA: PostDetailItemType = {
  id: 1,
  is_my_post: true,
  is_book_marked: false,
  company_name: 'Tech Solutions Inc.',
  title: 'Part-time English Tutor',
  icon_img_url: 'https://example.com/icon.png',
  company_img_url_list: [
    {
      id: 1,
      img_url: 'https://example.com/company1.png',
    },
    {
      id: 2,
      img_url: 'https://example.com/company2.png',
    },
    {
      id: 3,
      img_url: 'https://example.com/company3.png',
    },
  ],
  tags: {
    is_recruiting: true,
    visa: 'D_2_7',
    job_category: 'ENGLISH_KIDS_CAFE',
  },
  summaries: {
    address: '123 Main St, Seoul',
    houlry_rate: 15000,
    work_period: 'ONE_MONTH_TO_THREE_MONTHS',
    work_days_per_week: 5,
  },
  recruitment_conditions: {
    recruitment_dead_line: '2024-12-31',
    education: 'BACHELOR',
    number_of_recruits: 3,
    visa: 'D_2_7',
    gender: 'NONE',
    preferred_conditions: 'Previous tutoring experience preferred',
  },
  detailed_overview:
    'We are looking for a part-time English tutor for a kids cafe. The role requires providing fun and interactive English lessons for young children. We are looking for a part-time English tutor for a kids cafe. The role requires providing fun and interactive English lessons for young children. We are looking for a part-time English tutor for a kids cafe. The role requires providing fun and interactive English lessons for young children.',
  workplace_information: {
    main_address: '123 Main St, Seoul',
    detailed_address: '5th Floor, Room 501',
    school_name: 'Seoul National University',
    distance: 1.5,
    latitude: 37.5665,
    longitude: 126.978,
  },
  working_conditions: {
    houlry_rate: 15000,
    work_period: 'ONE_MONTH_TO_THREE_MONTHS',
    work_day_times: [
      {
        day_of_week: 'WEEKDAYS',
        work_start_time: '14:00',
        work_end_time: '18:00',
      },
      {
        day_of_week: 'SATURDAY',
        work_start_time: '10:00',
        work_end_time: '14:00',
      },
    ],
    job_category: 'ENGLISH_KIDS_CAFE',
    employment_type: 'PARTTIME',
  },
  company_information: {
    company_address: '123 Main St, Seoul',
    representative_name: 'John Doe',
    recruiter: 'Jane Smith',
    contact: '+82 10-1234-5678',
    email: 'recruiter@example.com',
  },
  created_at: '2024-10-22T12:00:00',
};

const PostDetailPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/search')}
        hasMenuButton={false}
        title="Detail"
      />
      <PostDetailCompanyImageList
        companyImageData={POST_DETAIL_DATA.company_img_url_list}
      />
      <PostDetailTitle postDetailData={POST_DETAIL_DATA} />
      <PostDetailContent postDetailData={POST_DETAIL_DATA} />
      <PostDetailApplyButton />
    </>
  );
};

export default PostDetailPage;
