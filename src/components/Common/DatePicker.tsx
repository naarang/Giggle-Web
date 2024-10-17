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

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  setSelectedDate: (date: string) => void;
}

const CustomCalendar = ({ setSelectedDate }: Props) => {
  const [value, setValue] = useState<Value>(new Date());
  const [currentMonth, setCurrentMonth] = useState<string>(
    moment().format('YYYY-MM'),
  );

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
          onChange={setValue}
          minDetail="month"
          onClickDay={(value) =>
            setSelectedDate(moment(value).format('YYYY/MM/DD'))
          }
          value={value}
          formatDay={(locale, date) => date.getDate().toString()}
          formatShortWeekday={(locale, date) =>
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
          }
          formatMonth={(locale, date) => (date.getMonth() + 1).toString()}
          className={styles.reactCalendar}
          showNeighboringMonth={false}
          locale="en-US"
          navigationLabel={navigationLabel}
          next2Label={null}
          prev2Label={null}
          onActiveStartDateChange={handleMonthChange}
        />
      </div>
    </div>
  );
};

export default React.memo(CustomCalendar);
