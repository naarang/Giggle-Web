import ApplicationCardList from '@/components/Application/ApplicationCardList';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { APPLICATION_STATUS_TYPE } from '@/constants/application';
import { ASCENDING_SORT_TYPE } from '@/constants/sort';
import { AppicationItemType } from '@/types/application/applicationItem';
import { AscendingSortType } from '@/types/common/sort';
import { useState } from 'react';

type StatusType =
  (typeof APPLICATION_STATUS_TYPE)[keyof typeof APPLICATION_STATUS_TYPE];

// 더미데이터
const APPLICATION_LIST_DATA: AppicationItemType[] = [
  {
    job_posting_id: 1,
    user_owner_job_posting_id: 1,
    icon_img_url: 'https://example.com/icon1.png',
    title: 'Frontend Developer',
    address_name: '123 Tech Avenue, Seoul',
    step: 'RESUME_UNDER_REVIEW',
    hourly_rate: 25,
    duration_of_days: 90,
  },
  {
    job_posting_id: 2,
    user_owner_job_posting_id: 2,
    icon_img_url: 'https://example.com/icon2.png',
    title: 'Backend Developer',
    address_name: '456 Code Street, Busan',
    step: 'PENDING',
    hourly_rate: 30,
    duration_of_days: 120,
  },
  {
    job_posting_id: 3,
    user_owner_job_posting_id: 3,
    icon_img_url: 'https://example.com/icon3.png',
    title: 'Full Stack Developer',
    address_name: '789 Web Road, Incheon',
    step: 'APPLICATION_REJECTED',
    hourly_rate: 28,
    duration_of_days: 60,
  },
  {
    job_posting_id: 4,
    user_owner_job_posting_id: 4,
    icon_img_url: 'https://example.com/icon3.png',
    title: 'Full Stack Developer',
    address_name: '789 Web Road, Incheon',
    step: 'APPLICATION_SUCCESS',
    hourly_rate: 28,
    duration_of_days: 60,
  },
];

const ApplicationPage = () => {
  const [selectedSort, setSelectedSort] = useState<AscendingSortType>(
    ASCENDING_SORT_TYPE.ASCENDING,
  );
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(
    APPLICATION_STATUS_TYPE.INPROGRESS,
  );

  return (
    <>
      <BaseHeader
        hasBackButton={false}
        hasMenuButton={false}
        title="Applicants"
      />
      <div className="w-full p-[1.5rem]">
        <div className="flex gap-[0.25rem] pb-[2rem]">
          <SearchSortDropdown
            options={Object.values(ASCENDING_SORT_TYPE)}
            value={selectedSort}
            onSelect={(sort) => setSelectedSort(sort as AscendingSortType)}
          />
          <SearchSortDropdown
            options={Object.values(APPLICATION_STATUS_TYPE)}
            value={selectedStatus}
            onSelect={(sort) => setSelectedStatus(sort as StatusType)}
          />
        </div>
        <ApplicationCardList applicationListData={APPLICATION_LIST_DATA} />
      </div>
    </>
  );
};

export default ApplicationPage;
