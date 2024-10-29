import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useState } from 'react';
import TimePicker from '@/components/Common/TimePicker';

// TODO: 나중에 constant로 분리해주세요!
const DAYS = {
  ['월요일']: 'MONDAY',
  ['화요일']: 'TUESDAY',
  ['수요일']: 'WEDNESDAY',
  ['목요일']: 'THURSDAY',
  ['금요일']: 'FRIDAY',
  ['토요일']: 'SATURDAY',
  ['일요일']: 'SUNDAY',
} as const;

type DayType = (typeof DAYS)[keyof typeof DAYS];

// api에게 보낼 데이터 형식
type WorkDayTimeItemType = {
  day_of_week: DayType;
  work_start_time: string;
  work_end_time: string;
  break_start_time: string;
  break_end_time: string;
};

const WorkDayTimeWithRestBottomSheet = () => {
  const [isShowBottomsheet, setisShowBottomsheet] = useState<boolean>(true);

  const [dayOfWeek, setDayOfWeek] = useState<DayType[]>([]);
  const [workStartTime, setWorkStartTime] = useState<string | null>(null);
  const [workEndTime, setWorkEndTime] = useState<string | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<string | null>(null);
  const [breakEndTime, setBreakEndTime] = useState<string | null>(null);

  const onClickDayOfWeek = (day: DayType) => {
    if (dayOfWeek.includes(day)) {
      setDayOfWeek([...dayOfWeek.filter((value) => value !== day)]);
    } else {
      setDayOfWeek([...dayOfWeek, day]);
    }
  };

  const isAvailableSubmit = () => {
    if (
      dayOfWeek.length &&
      workStartTime &&
      workEndTime &&
      breakStartTime &&
      breakEndTime
    )
      return true;
    return false;
  };

  const onClickSubmit = () => {
    if (!isAvailableSubmit()) return;

    const result: WorkDayTimeItemType[] = dayOfWeek.map((day) => {
      return {
        day_of_week: DAYS[day as keyof typeof DAYS],
        work_start_time: workStartTime!,
        work_end_time: workEndTime!,
        break_start_time: breakStartTime!,
        break_end_time: breakEndTime!,
      };
    });

    console.log(result); // TODO: API에 보낼 형식 맞춰놨쓔!
    setisShowBottomsheet(false);
  };

  return (
    <BottomSheetLayout
      hasHandlebar={true}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
    >
      <div className="w-full">
        <div className="w-full py-[0.75rem] px-[3.125rem] flex flex-col items-center gap-[0.75rem]">
          <h3 className="head-2 text-[#1E1926]">근로일 및 근로일별 근로시간</h3>
          <p className="body-3 text-[#656565]">
            원하는 근무 시간을 추가해주세요.
          </p>
        </div>
        <div className="w-full mb-[1rem] px-[1.5rem] flex flex-col gap-[0.5rem]">
          <div>
            <h5 className="px-[0.25rem] py-[0.375rem] text-[#1E1926] body-3">
              근무일자 <span className="text-[#EE4700]">*</span>
            </h5>
            <div className="flex flex-wrap gap-[0.5rem] w-full">
              {Object.keys(DAYS).map((value, index) => (
                <button
                  className={`py-[0.375rem] px-[0.875rem] body-3 border border-[#EFEFEF] rounded-[1.125rem] ${dayOfWeek.includes(value as DayType) ? 'bg-[#FEF387]' : 'bg-white'}`}
                  key={`${value}_${index}`}
                  onClick={() => onClickDayOfWeek(value as DayType)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h5 className="px-[0.25rem] py-[0.375rem] text-[#1E1926] body-3">
              근무시간 <span className="text-[#EE4700]">*</span>
            </h5>
            <div className="flex gap-[0.25rem] w-full ">
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setWorkStartTime}
              />
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setWorkEndTime}
              />
            </div>
          </div>
          <div>
            <h5 className="px-[0.25rem] py-[0.375rem] text-[#1E1926] body-3">
              휴게시간 <span className="text-[#EE4700]">*</span>
            </h5>
            <div className="flex gap-[0.25rem] w-full ">
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setBreakStartTime}
              />
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setBreakEndTime}
              />
            </div>
          </div>
        </div>
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={isAvailableSubmit() ? `bg-[#FEF387]` : `bg-[#F4F4F9]`}
          fontColor={isAvailableSubmit() ? `text-[#1E1926]` : `text-[#BDBDBD]`}
          isBorder={false}
          title={'추가하기'}
          onClick={onClickSubmit}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default WorkDayTimeWithRestBottomSheet;
