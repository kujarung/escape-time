'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import 'dayjs/locale/ko';
import WeekTabs from './WeekTabs';

dayjs.locale('ko');

export const WeekTable = () => {
  const today = dayjs();
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const [selectDay, setSelectDay] = useState(dayjs());
  const handlePreviousWeek = () => {
    if (!currentWeek.isSame(today.subtract(1, 'week'), 'week')) {
      setCurrentWeek(currentWeek.subtract(1, 'week'));
    }
  };

  const handleNextWeek = () => {
    if (!currentWeek.isSame(today.add(1, 'week'), 'week')) {
      setCurrentWeek(currentWeek.add(1, 'week'));
    }
  };
  return (
    <table>
      {/* <button onClick={handlePreviousWeek}>Previous</button>
      <button onClick={handleNextWeek}>Next</button> */}
      <WeekTabs
        currentWeek={currentWeek}
        selectDay={selectDay}
        setSelectDay={setSelectDay}
      />
      <tbody>
        <tr>
          <td>오전: 08</td>
          <td>오전: 08</td>
          <td>오전: 08</td>
          <td>오전: 08</td>
          <td>오전: 08</td>
          <td>오전: 08</td>
          <td>오전: 08</td>
        </tr>
      </tbody>
    </table>
  );
};
