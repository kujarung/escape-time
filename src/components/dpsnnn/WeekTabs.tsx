import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';

const WeekTabs = ({
  currentWeek,
  selectDay,
  setSelectDay,
}: {
  selectDay: dayjs.Dayjs;
  setSelectDay: Dispatch<SetStateAction<dayjs.Dayjs>>;
  currentWeek: dayjs.Dayjs;
}) => {
  // 주의 시작(일요일) 반환
  const startOfWeek = currentWeek.startOf('week');

  // 배열로 일주일 날짜 계산
  const weekDays = Array(7)
    .fill(0)
    .map((_, i) => startOfWeek.add(i, 'day'));

  return (
    <thead>
      <tr>
        {weekDays.map((day, index) => (
          <th
            key={'day' + index}
            style={{
              backgroundColor: `${day.isSame(selectDay, 'date') ? 'red' : ''}`,
            }}
            onClick={() => setSelectDay(day)}
          >
            <span>
              {day.format('dd')} {/* 요일 */}
            </span>
            <br />
            <span>
              {day.format('YYYY-MM-DD')} {/* 날짜 */}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default WeekTabs;
