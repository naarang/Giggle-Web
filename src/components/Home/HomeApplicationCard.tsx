import TopRightArrowIcons from '@/assets/icons/Home/TopRightArrowIcon.svg?react';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import { OngoingInterviewItemType } from '@/types/home/ongoingInterviewItem';
import { useNavigate } from 'react-router-dom';

type HomeApplicationCardProps = {
  applicationData: OngoingInterviewItemType;
};

const HomeApplicationCard = ({ applicationData }: HomeApplicationCardProps) => {
  const navigate = useNavigate();
  const { updateCurrentPostId } = useCurrentPostIdEmployeeStore();

  const goToApplicationDetailPage = () => {
    updateCurrentPostId(applicationData.id);
    navigate(`/application/${applicationData.id}`);
  };

  return (
    <article className="flex flex-col gap-[0.5rem] px-[1.25rem] pt-[0.75rem] pb-[1.25rem] min-w-[17.5rem] bg-white rounded-[1rem] shadow-cardShadow">
      <div className="w-fit px-[0.438rem] py-[0.125rem] caption-2 bg-[#1E1926] rounded-[0.188rem] text-[#F4F4F9]">
        Under the Review
      </div>
      <div className="w-full flex gap-[1rem] items-center">
        <div className='w-[2rem] h-[2rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
        <div className="flex-1">
          <h5 className="pb-[0.125rem] button-2 text-[#171719]">
            {applicationData.title}
          </h5>
          <p className="caption-1 text-[#BDBDBD]">
            {applicationData.address_name}
          </p>
        </div>
        <button
          className="px-[0.75rem] py-[0.25rem] bg-[#1B1B1B] rounded-[1.313rem]"
          onClick={goToApplicationDetailPage}
        >
          <TopRightArrowIcons />
        </button>
      </div>
    </article>
  );
};

export default HomeApplicationCard;
