import {
  PersonalInformationType,
  VisaListType,
} from '@/types/postApply/resumeDetailItem';
import MypageCard from '@/components/ManageResume/components/MypageCard';

type MypageCardSectionProps = {
  visaData: VisaListType;
  personalData: PersonalInformationType;
};

const MypageCardSection = ({
  visaData,
  personalData,
}: MypageCardSectionProps) => {
  return (
    <>
      <MypageCard
        title="Visa"
        informations={[
          {
            title: visaData.visa as string,
            description: [visaData.description],
          },
        ]}
      />
      <MypageCard
        title="Personal Information"
        informations={[
          {
            title: 'Address',
            description: [
              personalData.main_address,
              personalData.detailed_address,
            ],
          },
          {
            title: 'Phone Number',
            description: [personalData.phone_number],
          },
          {
            title: 'Email',
            description: [personalData.email],
          },
        ]}
      />
    </>
  );
};

export default MypageCardSection;
