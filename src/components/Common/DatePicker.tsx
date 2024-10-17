import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from '@/style/CustomCalendar.module.css';

const months = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Calendar 컴포넌트의 value prop 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  setSelectedDate: (date: string) => void; // 선택된 날짜를 상위 컴포넌트에 전달하는 함수
};

const CustomCalendar = ({ setSelectedDate }: Props) => {
  // 현재 선택된 날짜 상태
  const [value, setValue] = useState<Value>(new Date());
  // 현재 표시중인 월 상태
  const [currentMonth, setCurrentMonth] = useState<string>(
    moment().format('YYYY-MM'),
  );

  // 월이 변경될 때 호출되는 핸들러
  const handleMonthChange = ({
    activeStartDate,
    view,
  }: {
    activeStartDate: Date | null;
    view: string;
  }) => {
    if (view === 'month' && activeStartDate) {
      console.log(
        `Month changed to: ${moment(activeStartDate).format('MMMM YYYY')}`,
      );
      const newMonth = moment(activeStartDate).format('YYYY-MM');
      if (newMonth !== currentMonth) {
        setCurrentMonth(newMonth);
      }
    }
  };

  // 달력 상단에 표시될 내비게이션 레이블 커스터마이징
  const navigationLabel = ({ date }: { date: Date }) => {
    return (
      <span>
        {months[date.getMonth()]} {date.getFullYear()}
      </span>
    );
  };

  return (
    <div className="w-full relative rounded-[11px] bg-white border border-[rgba(55,56,60,0.16)] box-border flex flex-col items-end justify-start py-5 gap-5 text-center text-xs text-[#121212] font-[Inter]">
      <div className={styles.customCalendar}>
        <Calendar
          onChange={setValue} // 날짜 선택 시 호출되는 핸들러
          minDetail="month" // 최소 표시 단위를 월로 설정
          onClickDay={(value) =>
            setSelectedDate(moment(value).format('YYYY/MM/DD'))
          } // 날짜 클릭 시 상위 컴포넌트에 선택된 날짜 전달
          value={value}
          formatDay={(locale, date) => date.getDate().toString()} // 일 표시 형식 커스터마이징
          formatShortWeekday={(locale, date) =>
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
          } // 요일 표시 형식 커스터마이징
          formatMonth={(locale, date) => (date.getMonth() + 1).toString()} // 월 표시 형식 커스터마이징
          className={styles.reactCalendar}
          showNeighboringMonth={false} // 이전/다음 달의 날짜를 표시하지 않음
          locale="en-US" // 로케일 설정
          navigationLabel={navigationLabel} // 내비게이션 레이블 커스터마이징
          next2Label={null} // 다음 해 버튼 숨김
          prev2Label={null} // 이전 해 버튼 숨김
          onActiveStartDateChange={handleMonthChange} // 활성 월 변경 시 호출되는 핸들러
        />
      </div>
    </div>
  );
};

// React.memo를 사용하여 불필요한 리렌더링 방지
export default React.memo(CustomCalendar);
