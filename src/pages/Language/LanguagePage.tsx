import BaseHeader from '@/components/Common/Header/BaseHeader';
import LanguageSection from '@/components/Language/LanguageSection';
import { useNavigate } from 'react-router-dom';

const LanguagePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="Language"
      />
      <LanguageSection />
    </div>
  );
};

export default LanguagePage;
