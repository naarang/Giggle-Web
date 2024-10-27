import { EMPLOYER_POST_LIST } from '@/constants/post';
import { KoAscendingSortType } from '@/types/common/sort';
import EmployerPostCard from '@/components/Employer/Post/EmployerPostCard';
import { useEffect } from 'react';

type EmployerPostCardListProps = {
  selectedSort: KoAscendingSortType;
};

const EmployerPostCardList = ({ selectedSort }: EmployerPostCardListProps) => {
  useEffect(() => {
    // 6.6 api 호출하기
  }, [selectedSort]);
  return (
    <>
      {EMPLOYER_POST_LIST.map((data) => (
        <EmployerPostCard key={data.id} postData={data} />
      ))}
    </>
  );
};

export default EmployerPostCardList;
