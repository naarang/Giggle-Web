import { EMPLOYER_POST_LIST } from '@/constants/post';
import { AscendingSortType } from '@/types/common/sort';
import EmployerPostCard from '@/components/Employer/Post/EmployerPostCard';
import { useEffect } from 'react';

type EmployerPostCardListProps = {
  selectedSort: AscendingSortType;
};

const EmployerPostCardList = ({ selectedSort }: EmployerPostCardListProps) => {
  useEffect(() => {
    // 6.6 api 호출하기
  }, [selectedSort]);
  return (
    <>
      {EMPLOYER_POST_LIST.map((data) => (
        <EmployerPostCard postData={data} />
      ))}
    </>
  );
};

export default EmployerPostCardList;
