import Tag from '@/components/Common/Tag';
import { EmployerPostItemType } from '@/types/post/employerPostItem';
import { useNavigate } from 'react-router-dom';

type EmployerPostCardType = {
  postData: EmployerPostItemType;
};

const EmployerPostCard = ({ postData }: EmployerPostCardType) => {
  const navigate = useNavigate();

  return (
    <article className="w-full border-[0.031rem] border-[#1E19263D] rounded-[1.125rem] overflow-hidden">
      <div className="flex flex-col gap-[1.25rem] w-full px-[1.5rem] pt-[1.5rem] pb-[1rem]">
        <div className="flex gap-[0.75rem]">
          <div className='w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
          <div>
            <h3 className="pb-[0.25rem] head-3 text-[#1E1926]">
              {postData.title}
            </h3>
            <p className="body-3 text-[#464646]">{postData.address_name}</p>
          </div>
        </div>
        <div className="flex justify-between items-end pt-[0.25rem]">
          <Tag
            value={`${postData.hourly_rate} KRW`}
            padding="0.375rem 0.75rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor="white"
            color="#1E1926"
            borderColor="#1E1926"
            fontStyle="caption-1"
          />
          <p className="body-3 text-[#656565]">
            {postData.duration_of_days} Days After
          </p>
        </div>
      </div>
      <div className="flex">
        <button
          className="flex-1 py-[0.75rem] caption-1-sb text-[#464646] bg-[#F4F4F9]  text-center"
          onClick={() => navigate(`/employer/post/${postData.id}`)}
        >
          공고 상세보기
        </button>
        <button
          className="flex-1 py-[0.75rem] caption-1-sb text-[#1E1926] bg-[#FEF387]  text-center"
          onClick={() => navigate(`/employer/application/${postData.id}`)}
        >
          지원자 확인
        </button>
      </div>
    </article>
  );
};

export default EmployerPostCard;
