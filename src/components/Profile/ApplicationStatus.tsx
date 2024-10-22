const ApplicationStatus = () => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex flex-col gap-3 w-24 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">Applications</div>
        <div className="head-3 text-[#1E1926] text-center">7</div>
      </div>
      <div className="flex flex-col gap-3 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">
          Successful Hires
        </div>
        <div className="head-3 text-[#1E1926] text-center">2</div>
      </div>
      <div className="flex flex-col gap-3 w-24 py-2 px-1">
        <div className="body-3 text-[#1E1926] text-center">Scraps</div>
        <div className="head-3 text-[#1E1926] text-center">10</div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
