const ApplicationDetailInfo = () => {
  return (
    <section className="w-full flex gap-[0.25rem]">
      <div className="flex-1 flex flex-col gap-[0.25rem]">
        <div className="px-[0.75rem] py-[0.5rem] bg-[#F4F4F9] rounded-[0.5rem] text-center">
          <h5 className="pb-[0.25rem] caption-1-sb text-black">Hourly wage</h5>
          <p className="caption-1 text-[#656565]">10,000 KRW</p>
        </div>
        <div className="px-[0.75rem] py-[0.5rem] bg-[#F4F4F9] rounded-[0.5rem] text-center">
          <h5 className="pb-[0.25rem] caption-1-sb text-black">
            Working Period
          </h5>
          <p className="caption-1 text-[#656565]">6 months - 1 year</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-[0.75rem] py-[0.5rem] bg-[#F4F4F9] rounded-[0.5rem]">
        <h5 className="pb-[0.5rem] caption-1-sb text-black">
          Working days/Hours
        </h5>
        <p className="caption-1 text-[#656565]">Mon 9:00-17:00</p>
        <p className="caption-1 text-[#656565]">Mon 9:00-17:00</p>
        <p className="caption-1 text-[#656565]">Mon 9:00-17:00</p>
        <p className="caption-1 text-[#656565]">Mon 9:00-17:00</p>
      </div>
    </section>
  );
};

export default ApplicationDetailInfo;
