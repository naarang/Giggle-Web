import { EmployerSummaryData } from '@/constants/profile';
// import { usegetOwnerSummaries } from '@/hooks/api/useProfile';

const EmployerProfileCard = () => {
  // const { data } = usegetOwnerSummaries();
  const data = EmployerSummaryData;

  return (
    <>
      {data && data.success ? (
        <div className="pt-5 pb-4 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={data?.data.icon_img_url} alt="profile image" />
          </div>
          <h1 className="head-3 text-[#1E1926]">{data?.data.company_name}</h1>
        </div>
      ) : (
        <div>로딩 중</div>
      )}
    </>
  );
};

export default EmployerProfileCard;
