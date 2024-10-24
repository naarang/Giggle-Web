import RightArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { APPLICATION_STEP } from '@/constants/application';
import {
  AppicationItemType,
  ApplicationStepType,
} from '@/types/application/applicationItem';
import { useNavigate } from 'react-router-dom';

const statusStyler = (status: ApplicationStepType) => {
  switch (status) {
    case APPLICATION_STEP.APPLICATION_SUCCESS:
      return 'bg-[#C7C6F6]';
    case APPLICATION_STEP.RESUME_REJECTED:
      return 'bg-[#FFC6C0]';
    case APPLICATION_STEP.APPLICATION_REJECTED:
      return 'bg-[#FFC6C0]';
    case APPLICATION_STEP.PENDING:
      return 'bg-[#BDBDBD]';
    default:
      return 'bg-[#FEF387]';
  }
};

type ApplicationCardType = {
  applicationData: AppicationItemType;
};

const ApplicationCard = ({ applicationData }: ApplicationCardType) => {
  const navigate = useNavigate();

  return (
    <article className="w-full border-[0.031rem] border-[#1E19263D] rounded-[1.125rem] overflow-hidden">
      <div
        className={`flex justify-between items-center px-[1rem] py-[0.5rem] ${statusStyler(applicationData.step)}`}
      >
        <div className="flex gap-[0.25rem]">
          <p className="pl-[0.5rem] caption-1 text-[#1E1926]">
            {applicationData.step.replace(/_/g, ' ').toLowerCase()}
          </p>
          <div className="w-[0.375rem] h-[0.375rem] rounded-full bg-[#FF6F61]"></div>
        </div>
        <RightArrowIcon />
      </div>
      <div className="flex flex-col gap-[1.25rem] w-full px-[1.5rem] pt-[1.5rem] pb-[1rem]">
        <div className="flex gap-[0.75rem]">
          <div className='w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
          <div>
            <h3 className="pb-[0.25rem] head-3 text-[#1E1926]">
              {applicationData.title}
            </h3>
            <p className="body-3 text-[#464646]">
              {applicationData.address_name}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-end pt-[0.25rem]">
          <Tag
            value={`${applicationData.hourly_rate} KRW`}
            padding="0.375rem 0.75rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor="white"
            color="#1E1926"
            borderColor="#1E1926"
            fontStyle="caption-1"
          />
          <p className="body-3 text-[#656565]">
            {applicationData.duration_of_days} Days After
          </p>
        </div>
      </div>
      <div className="flex">
        {/* TODO: 각각 공고의 id로 이동하기, 지원 상태 상세로 이동하기 */}
        <button
          className="flex-1 py-[0.75rem] caption-1-sb text-[#F4F4F9] bg-[#1E1926]  text-center"
          onClick={() => navigate(`/post/${applicationData.job_posting_id}`)}
        >
          Read More Posting
        </button>
        <button className="flex-1 py-[0.75rem] caption-1-sb text-[#1E1926] bg-[#FEF387]  text-center">
          Check Application Status
        </button>
      </div>
    </article>
  );
};

export default ApplicationCard;
