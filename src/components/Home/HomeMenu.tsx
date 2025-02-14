import RecommendPostIcon from '@/assets/icons/Home/RecommendPostIcon.svg?react';
import SavedPostIcon from '@/assets/icons/Home/SavedPostIcon.svg?react';
import ResumeIcon from '@/assets/icons/Home/ResumeIcon.svg?react';
import ApplyIcon from '@/assets/icons/Home/ApplyIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import CommingSoonBottomSheet from '@/components/Home/ComingSoonBottomSheet';
import { useMemo, useState } from 'react';
import LoginBottomSheet from '@/components/Home/LoginBottomSheet';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

const HomeMenu = () => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();

  const [isOpenCommingSoonBottomSheet, setIsOpenCommingSoonBottomSheet] =
    useState<boolean>(false);
  const [isOpenLoginBottomSheet, setIsOpenLoginBottomSheet] =
    useState<boolean>(false);

  const menuItems = useMemo(() => {
    if (account_type === UserType.OWNER)
      return [
        {
          icon: <RecommendPostIcon />,
          text: '인재추천',
          onClick: () => setIsOpenCommingSoonBottomSheet(true),
        },
        {
          icon: <SavedPostIcon />,
          text: '공고추가',
          onClick: () => navigate('/employer/post/create'),
        },
        {
          icon: <ResumeIcon />,
          text: '공고관리',
          onClick: () => navigate('/employer/post'),
        },
      ];
    else
      return [
        {
          icon: <RecommendPostIcon />,
          text: 'Just for You',
          onClick: () => setIsOpenCommingSoonBottomSheet(true),
        },
        {
          icon: <SavedPostIcon />,
          text: 'Saved Jobs',
          onClick: () => navigate('/resume/scrapped'),
        },
        {
          icon: <ResumeIcon />,
          text: 'My Resume',
          onClick: () => navigate('/profile/manage-resume'),
        },
        {
          icon: <ApplyIcon />,
          text: 'Applications',
          onClick: () => navigate('/application'),
        },
      ];
  }, [navigate, account_type]);

  const checkLogin = (fn: () => void) => {
    if (!account_type) setIsOpenLoginBottomSheet(true);
    else fn();
  };

  return (
    <>
      <nav className="p-4 flex gap-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex-1 sm:flex-none flex flex-col items-center gap-2 px-4 py-3 border border-[#EBEEF1] rounded-lg"
            onClick={() => checkLogin(item.onClick)}
          >
            {item.icon}
            <p className="button-2 text-[#333333] break-all">{item.text}</p>
          </button>
        ))}
      </nav>
      <CommingSoonBottomSheet
        isShowBottomsheet={isOpenCommingSoonBottomSheet}
        setIsShowBottomSheet={setIsOpenCommingSoonBottomSheet}
      />
      <LoginBottomSheet
        isShowBottomsheet={isOpenLoginBottomSheet}
        setIsShowBottomSheet={setIsOpenLoginBottomSheet}
      />
    </>
  );
};

export default HomeMenu;
