import {
  PersonalInformationType,
  VisaListType,
} from '@/types/postApply/resumeDetailItem';
import MypageCard from '@/components/ManageResume/components/MypageCard';
import { ManageResumeType } from '@/constants/manageResume';

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
        type={ManageResumeType.VISA}
        informations={[
          {
            title: visaData.visa as string,
            description: [visaData.description],
          },
        ]}
      />
      <MypageCard
        type={ManageResumeType.PERSONALINFORMATION}
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
