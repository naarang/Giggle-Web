import { OngoingInterviewItemType } from '@/types/home/ongoingInterviewItem';
import HomeApplicationCard from '@/components/Home/HomeApplicationCard';
import { useGetInterviewList } from '@/hooks/api/usePost';

const HomeApplicationList = () => {
  // TODO: 우선 최대 10개까지 보여주도록 함
  const { data } = useGetInterviewList(1, 10);

  if (!data?.data?.ongoing_interviews_list?.length) return <></>;

  return (
    <section className="w-full py-[1.5rem] bg-[#FEF387]">
      <h3 className="px-[1.25rem] pb-[0.5rem] head-3 text-[#464646]">
        Ongoing Application
      </h3>
      <div className="flex gap-[0.5rem] px-[1.25rem] overflow-x-scroll whitespace-nowrap no-scrollbar">
        {data?.data?.ongoing_interviews_list.map(
          (value: OngoingInterviewItemType) => (
            <HomeApplicationCard key={value.id} applicationData={value} />
          ),
        )}
      </div>
    </section>
  );
};

export default HomeApplicationList;
