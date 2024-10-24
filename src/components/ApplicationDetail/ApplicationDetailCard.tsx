import Tag from '@/components/Common/Tag';

const ApplicationDetailCard = () => {
  return (
    <article className="w-full border-[0.031rem] border-[#1E19263D] rounded-[1.125rem]">
      <div className="flex flex-col gap-[1.25rem] w-full px-[1.5rem] pt-[1.5rem] pb-[1rem]">
        <div className="flex gap-[0.75rem]">
          <div className='w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-cover bg-[url("/src/assets/images/JobIconExample.jpeg")]'></div>
          <div>
            <h3 className="pb-[0.25rem] head-3 text-[#1E1926]">공고 제목</h3>
            <p className="body-3 text-[#464646]">주소</p>
          </div>
        </div>
        <div className="flex justify-between items-end pt-[0.25rem]">
          <Tag
            value={`10000 KRW`}
            padding="0.375rem 0.75rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor="white"
            color="#1E1926"
            borderColor="#1E1926"
            fontStyle="caption-1"
          />
          <p className="body-3 text-[#656565]">3 Days After</p>
        </div>
      </div>
    </article>
  );
};

export default ApplicationDetailCard;
