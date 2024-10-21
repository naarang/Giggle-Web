import Button from '../Common/Button';
import { UserType } from '@/constants/user';

type findJourneyProps = {
  onSignUpClick: () => void;
  onTypeSelect: (type: UserType) => void;
  accountType: UserType | null;
};

const FindJourney = ({
  onSignUpClick,
  onTypeSelect,
  accountType,
}: findJourneyProps) => {
  const handleClick = (value: UserType) => {
    onTypeSelect(value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="title-1">Find Your Journey</div>
        <div className="body-1">당신에게 알맞는 정보를 드릴게요!</div>
      </div>
      <div className="flex gap-2.5 py-6">
        {/* 유학생 카드 */}
        <div
          className="flex flex-col justify-end gap-1.5 h-[12.5rem] w-[10rem] p-[1.125rem] bg-yellow-100 border-[0.5px] border-[#f2f2f2] rounded-[1.25rem]"
          style={{
            boxShadow:
              '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
          }}
          onClick={() => handleClick(UserType.USER)}
        >
          <p className="text-[#464646] head-3">유학생</p>
          <p className="text-[#464646] body-3">
            일자리를 찾고 싶은 유학생이에요
          </p>
        </div>
        {/* 고용주 카드 */}
        <div
          className="flex flex-col justify-end gap-1.5 h-[12.5rem] w-[10rem] p-[1.125rem] bg-yellow-100 border-[0.5px] border-[#f2f2f2] rounded-[1.25rem]"
          style={{
            boxShadow:
              '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
          }}
          onClick={() => handleClick(UserType.OWNER)}
        >
          <p className="text-[#464646] head-3">고용주</p>
          <p className="text-[#464646] body-3">알바생을 찾고 싶은 고용주예요</p>
        </div>
      </div>
      <div className="py-6">
        {/* 타입 선택 후에 Sign Up 가능 */}
        {accountType ? (
          <Button
            type="large"
            bgColor="bg-[#1E1926]"
            fontColor="text-[#FEF387]"
            isBorder={false}
            title="Sign Up"
            onClick={onSignUpClick}
          />
        ) : (
          <Button
            type="large"
            bgColor="bg-[#F4F4F9]"
            fontColor="text-[#BDBDBD]"
            isBorder={false}
            title="Sign Up"
          />
        )}
      </div>
    </div>
  );
};

export default FindJourney;
