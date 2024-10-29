const EmployerJobInfo = () => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex flex-col gap-3 w-24 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">Applications</div>
        <div className="head-3 text-[#1E1926] text-center">
          {/* {applicationCounts.application_counts} */}
        </div>
      </div>
      <div className="flex flex-col gap-3 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">
          Successful Hires
        </div>
        <div className="head-3 text-[#1E1926] text-center">
          {/* {applicationCounts.successful_hire_counts} */}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-24 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">Scraps</div>
        <div className="head-3 text-[#1E1926] text-center">
          {/* {bookmarkCounts.book_mark_counts} */}
        </div>
      </div>
    </div>
  );
};

export default EmployerJobInfo;
