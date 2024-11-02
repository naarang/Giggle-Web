import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useState } from 'react';
import EmployerPostDeleteBottomSheet from '@/components/Employer/PostDetail/EmployerPostDeleteBottomSheet';
import { useNavigate, useParams } from 'react-router-dom';

const EmployerPostDetailButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpenDeleteBottomSheet, setIsOpenDeleteBottomSheet] =
    useState<boolean>(false);
  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full flex gap-[0.5rem] pt-[0.75rem] px-[1.5rem] pb-[2.5rem] bg-white z-20">
        <Button
          type={buttonTypeKeys.BACK}
          bgColor="bg-[#F4F4F9]"
          fontColor="text-[#BDBDBD]"
          isBorder={false}
          title="Delete"
          onClick={() => setIsOpenDeleteBottomSheet(true)}
        />
        <Button
          type={buttonTypeKeys.CONTINUE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Edit"
          onClick={() =>
            navigate(`/employer/post/edit/${id}`, {
              state: {
                isEdit: true,
              },
            })
          }
          // TODO: 고용주 - 공고 수정 - 1단계로 이동하기
        />
      </footer>
      <EmployerPostDeleteBottomSheet
        isShowBottomsheet={isOpenDeleteBottomSheet}
        setIsShowBottomSheet={setIsOpenDeleteBottomSheet}
      />
    </>
  );
};

export default EmployerPostDetailButton;
