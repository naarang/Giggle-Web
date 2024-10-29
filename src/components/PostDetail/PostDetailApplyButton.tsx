import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import PostDetailConfirmBottomSheet from '@/components/PostDetail/PostDetailConfirmBottomSheet';
import LoginBottomSheet from '@/components/Common/LoginBottomSheet';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { useState } from 'react';

const PostDetailApplyButton = () => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isOpenConfirmBottomSheet, setIsOpenConfirmBottomSheet] =
    useState<boolean>(false);
  const [isOpenLoginBottomSheet, setIsOpenLoginBottomSheet] =
    useState<boolean>(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full flex gap-[0.5rem] pt-[0.75rem] px-[1.5rem] pb-[2.5rem] bg-white z-20">
        <button
          className="flex justify-center items-center min-w-[3.25rem] w-[3.25rem] h-[3.25rem] rounded-full bg-[#F4F4F980]"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          {isBookmarked ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
        </button>
        <Button
          type={buttonTypeKeys.APPLY}
          bgColor=""
          fontColor="text-white"
          isBorder={false}
          title="Apply Now"
          onClick={() => setIsOpenConfirmBottomSheet(true)}
        />
      </footer>
      <PostDetailConfirmBottomSheet
        isShowBottomsheet={isOpenConfirmBottomSheet}
        setIsShowBottomSheet={setIsOpenConfirmBottomSheet}
      />
      <LoginBottomSheet
        isShowBottomsheet={isOpenLoginBottomSheet}
        setIsShowBottomSheet={setIsOpenLoginBottomSheet}
      />
    </>
  );
};

export default PostDetailApplyButton;
