import {
  useGetApplicationCounts,
  userGetBookmarksCounts,
} from '@/hooks/api/useProfile';
import { ApplicationCountType, BookmarkCountType } from '@/types/api/profile';
import { useEffect, useState } from 'react';

const ApplicationStatus = () => {
  const { data: applcationData } = useGetApplicationCounts();
  const { data: bookmarkData } = userGetBookmarksCounts();

  const [applicationCounts, setApplicationCounts] =
    useState<ApplicationCountType>({
      application_counts: 0,
      successful_hire_counts: 0,
    });
  const [bookmarkCounts, setBookmarkCounts] = useState<BookmarkCountType>({
    book_mark_counts: 0,
  });

  useEffect(() => {
    if (applcationData?.success) {
      setApplicationCounts({
        application_counts: applcationData.data.application_counts,
        successful_hire_counts: applcationData.data.successful_hire_counts,
      });
    }
    if (bookmarkData?.success) {
      setBookmarkCounts({
        book_mark_counts: bookmarkData.data.book_mark_counts,
      });
    }
  }, [applcationData, bookmarkData]);

  return (
    <div className="flex gap-4 items-center justify-center p-4 bg-white rounded-md">
      <div className="flex flex-col justify-between w-24 h-[5.25rem] p-3 bg-[#F4F4F9] rounded-md">
        <div className="body-3 text-[#1E1926] text-center">Applications</div>
        <div className="head-3 text-[#1E1926] text-center">
          {applicationCounts.application_counts}
        </div>
      </div>
      <div className="flex flex-col justify-between h-[5.25rem] gap-3 p-3 bg-[#F4F4F9] rounded-md">
        <div className="body-3 text-[#1E1926] text-center">
          Successful Hires
        </div>
        <div className="head-3 text-[#1E1926] text-center">
          {applicationCounts.successful_hire_counts}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 w-24 h-[5.25rem] p-3 bg-[#F4F4F9] rounded-md">
        <div className="body-3 text-[#1E1926] text-center">Scraps</div>
        <div className="head-3 text-[#1E1926] text-center">
          {bookmarkCounts.book_mark_counts}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
