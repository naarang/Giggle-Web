import { OngoingInterviewItemType } from '@/types/home/ongoingInterviewItem';
import HomeApplicationCard from '@/components/Home/HomeApplicationCard';

// 진행중인 인터뷰 더미데이터
const ONGOING_INTERVIEW_LIST: OngoingInterviewItemType[] = [
  {
    id: 12,
    icon_img_url: 'aa',
    title: '서류 제목이양 야다ㅏ야아닫',
    address_name: '주소 주소 주소 주소 주소',
  },
  {
    id: 23,
    icon_img_url: 'aa',
    title: '서류2',
    address_name: '주소 주소 22',
  },
  {
    id: 24,
    icon_img_url: 'aa',
    title: '서류3',
    address_name: '주소 주소 33',
  },
];

const HomeApplicationList = () => {
  return (
    <section className="w-full py-[1.5rem] bg-[#FEF387]">
      <h3 className="px-[1.25rem] pb-[0.5rem] head-3 text-[#464646]">
        Ongoing Application
      </h3>
      <div className="flex gap-[0.5rem] px-[1.25rem] overflow-x-scroll whitespace-nowrap no-scrollbar">
        {ONGOING_INTERVIEW_LIST.map((value: OngoingInterviewItemType) => (
          <HomeApplicationCard key={value.id} applicationData={value} />
        ))}
      </div>
    </section>
  );
};

export default HomeApplicationList;
