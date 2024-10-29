import Button from '@/components/Common/Button';
import { cardData, UserType } from '@/constants/user';

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
        {/* 유학생, 고용주 타입 선택 카드 */}
        {cardData.map((card) => (
          <div
            key={card.accountType}
            className={`flex flex-col justify-end gap-1.5 h-[12.5rem] w-[10rem] p-[1.125rem] bg-cover bg-yellow-100 border-[0.5px] border-[#f2f2f2] rounded-[1.25rem] ${
              accountType === card.accountType
                ? 'bg-[url("/src/assets/images/yellowCard.png")] shadow-yellowShadow '
                : ''
            }`}
            onClick={() => handleClick(card.accountType)}
          >
            <p className="text-[#464646] head-3">{card.title}</p>
            <p className="text-[#464646] body-3">{card.description}</p>
          </div>
        ))}
      </div>
      <div className="py-6 w-full">
        {/* 타입 선택 후에 Sign Up 가능 */}
        <Button
          type="large"
          bgColor={accountType ? 'bg-[#1E1926]' : 'bg-[#F4F4F9]'}
          fontColor={accountType ? 'text-[#FEF387]' : 'text-[#BDBDBD]'}
          isBorder={false}
          title="Sign Up"
          onClick={accountType ? onSignUpClick : undefined}
        />
      </div>
    </div>
  );
};

export default FindJourney;
