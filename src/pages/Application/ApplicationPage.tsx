import ApplicationCardList from '@/components/Application/ApplicationCardList';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { APPLICATION_STATUS_TYPE } from '@/constants/application';
import { ASCENDING_SORT_TYPE } from '@/constants/sort';
import { useGetApplyPostList } from '@/hooks/api/usePost';
import { ApplicationStatusType } from '@/types/application/applicationStatus';
import { AscendingSortType } from '@/types/common/sort';
import { useEffect, useState } from 'react';

const ApplicationPage = () => {
  const [selectedSort, setSelectedSort] = useState<AscendingSortType>(
    ASCENDING_SORT_TYPE.ASCENDING,
  );
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatusType>(
    APPLICATION_STATUS_TYPE.TOTAL,
  );

  const [requestParams, setRequestParams] = useState({
    page: 1,
    size: 10,
    sorting: selectedSort,
    status: selectedStatus,
  });

  const { data, refetch } = useGetApplyPostList(requestParams);

  const selectSort = (sort: AscendingSortType) => {
    setSelectedSort(sort);
    setRequestParams({ ...requestParams, sorting: sort });
  };

  const selectStatus = (status: ApplicationStatusType) => {
    setSelectedStatus(status);
    setRequestParams({ ...requestParams, status: status });
  };

  useEffect(() => {
    refetch();
  }, [requestParams, refetch]);

  if (!data?.success) return <></>;

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
            onSelect={(sort) => selectSort(sort as AscendingSortType)}
          />
          <SearchSortDropdown
            options={Object.values(APPLICATION_STATUS_TYPE)}
            value={selectedStatus}
            onSelect={(status) => selectStatus(status as ApplicationStatusType)}
          />
        </div>
        <ApplicationCardList
          applicationListData={data?.data?.job_posting_list ?? []}
        />
      </div>
    </>
  );
};

export default ApplicationPage;
