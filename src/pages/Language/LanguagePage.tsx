import BaseHeader from '@/components/Common/Header/BaseHeader';
import LanguageSection from '@/components/Language/LanguageSection';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguagePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    const previousPath = location.state?.from;
    // 기타 언어 추가 페이지를 경우하였을 경우
    if (previousPath == '/resume/language/add') navigate(-3);
    // 기타 언어 추가 페이지를 경우하지 않았을 경우
    else navigate(-1);
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => goBack()}
        hasMenuButton={false}
        title="Language"
      />
      <LanguageSection />
    </div>
  );
};

export default LanguagePage;
