import BaseHeader from '@/components/Common/Header/BaseHeader';

const EmployerPostPage = () => {
  return (
    <>
      <BaseHeader
        hasBackButton={false}
        hasMenuButton={false}
        title="작성한 공고"
      />
      <section className="w-full p-[1.5rem] flex flex-col gap-[1rem]">
        <h2 className="px-[0.5rem] pt-[1.5rem] head-3 text-[#1E1926]">
          공고를 클릭해서 지원자를 확인해보세요 !
        </h2>
      </section>
    </>
  );
};

export default EmployerPostPage;
