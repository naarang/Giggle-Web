import {
  useGetApplicationCounts,
  useGetOwnerApplicationCounts,
} from '@/hooks/api/useProfile';
import { ApplicationCountType, BookmarkCountType } from '@/types/api/profile';
import { useEffect, useState } from 'react';

const ApplicationStatus = () => {
  const { data: applcationData } = useGetApplicationCounts();
  const { data: bookmarkData } = useGetOwnerApplicationCounts();
  const [applicationCounts, setApplicationCounts] =
    useState<ApplicationCountType>({
      application_counts: 7,
      successful_hire_counts: 2,
    });
  const [bookmarkCounts, setBookmarkCounts] = useState<BookmarkCountType>({
    book_mark_counts: 10,
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
        book_mark_counts: bookmarkData.data.applicants_counts,
      });
    }
  }, []);

  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex flex-col gap-3 w-24 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">Applications</div>
        <div className="head-3 text-[#1E1926] text-center">
          {applicationCounts.application_counts}
        </div>
      </div>
      <div className="flex flex-col gap-3 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">
          Successful Hires
        </div>
        <div className="head-3 text-[#1E1926] text-center">
          {applicationCounts.successful_hire_counts}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-24 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">Scraps</div>
        <div className="head-3 text-[#1E1926] text-center">
          {bookmarkCounts.book_mark_counts}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
