import TopRightArrowIcons from '@/assets/icons/Home/TopRightArrowIcon.svg?react';

const HomeApplicationList = () => {
  return (
    <section className="w-full py-[1.5rem] bg-[#FEF387]">
      <h3 className="px-[1.25rem] pb-[0.5rem] head-3 text-[#464646]">
        Ongoing Application
      </h3>
      <div className="flex gap-[0.5rem] px-[1.25rem] overflow-x-scroll whitespace-nowrap no-scrollbar">
        <article className="flex flex-col gap-[0.5rem] px-[1.25rem] pt-[0.75rem] pb-[1.25rem] min-w-[17.5rem] bg-white rounded-[1rem] shadow-cardShadow">
          <div className="w-fit px-[0.438rem] py-[0.125rem] caption-2 bg-[#1E1926] rounded-[0.188rem] text-[#F4F4F9]">
            Under the Review
          </div>
          <div className="w-full flex gap-[1rem] items-center">
            <div className='w-[2rem] h-[2rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
            <div className="flex-1">
              <h5 className="pb-[0.125rem] button-2 text-[#171719]">
                공고제목
              </h5>
              <p className="caption-1 text-[#BDBDBD]">장소이름</p>
            </div>
            <button className="px-[0.75rem] py-[0.25rem] bg-[#1B1B1B] rounded-[1.313rem]">
              <TopRightArrowIcons />
            </button>
          </div>
        </article>
        <article className="flex flex-col gap-[0.5rem] px-[1.25rem] pt-[0.75rem] pb-[1.25rem] min-w-[17.5rem] bg-white rounded-[1rem] shadow-cardShadow">
          <div className="w-fit px-[0.438rem] py-[0.125rem] caption-2 bg-[#1E1926] rounded-[0.188rem] text-[#F4F4F9]">
            Under the Review
          </div>
          <div className="w-full flex gap-[1rem] items-center">
            <div className='w-[2rem] h-[2rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
            <div className="flex-1">
              <h5 className="pb-[0.125rem] button-2 text-[#171719]">
                공고제목
              </h5>
              <p className="caption-1 text-[#BDBDBD]">장소이름</p>
            </div>
            <button className="px-[0.75rem] py-[0.25rem] bg-[#1B1B1B] rounded-[1.313rem]">
              <TopRightArrowIcons />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HomeApplicationList;
