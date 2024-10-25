import BaseHeader from '@/components/Common/Header/BaseHeader';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useLocation } from 'react-router-dom';

const IntroductionPage = () => {
  const location = useLocation();
  const handleBackButtonClick = useNavigateBack();
  const data = location.state?.data;

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Introduction"
      />
      {data ? <p>{data}</p> : <p>다시 시도해주세요!</p>}
    </div>
  );
};

export default IntroductionPage;
