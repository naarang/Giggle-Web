import BaseHeader from '@/components/Common/Header/BaseHeader';
import LanguageSection from '@/components/Language/LanguageSection';
import useNavigateBack from '@/hooks/useNavigateBack';

const LanguagePage = () => {
  const handleBackButtonClick = useNavigateBack();

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Language"
      />
      <LanguageSection />
    </div>
  );
};

export default LanguagePage;
