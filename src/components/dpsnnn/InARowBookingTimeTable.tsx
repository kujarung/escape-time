import { TimeSlot } from '@/service/crawler';

export const InARowBookingTimeTable = ({
  ssBookingAbleData,
}: {
  ssBookingAbleData: TimeSlot[];
}) => {
  type Table = { [day: string]: TimeSlot[] };

  function getTimeMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function canSchedule(
    currentDaySchedule: TimeSlot[],
    item: TimeSlot
  ): boolean {
    return !currentDaySchedule.some(
      (scheduledItem) =>
        scheduledItem.themeType === item.themeType ||
        Math.abs(
          getTimeMinutes(scheduledItem.time) - getTimeMinutes(item.time)
        ) < 80
    );
  }

  function createSchedule(items: TimeSlot[]): Table {
    // 현재 날짜를 기준으로 다음 7일간의 일정표를 생성합니다.
    const currentDate = new Date();
    const scheduleTable: Table = {};

    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(currentDate);
      tempDate.setDate(currentDate.getDate() + i);
      const dayString = tempDate.toISOString().split('T')[0];
      scheduleTable[dayString] = [];
    }

    // 아이템들을 날짜와 시간 순으로 정렬합니다.
    items.sort((a, b) => {
      if (a.day < b.day) return -1;
      if (a.day > b.day) return 1;
      return getTimeMinutes(a.time) - getTimeMinutes(b.time);
    });

    const usedThemes = new Set<string>(); // 사용된 테마를 추적합니다.

    // 조건을 만족하면서 일정표를 채웁니다.
    for (const item of items) {
      if (usedThemes.has(item.themeType)) continue; // 이미 사용된 테마는 건너뜁니다.

      const daySchedule = scheduleTable[item.day];

      if (daySchedule && canSchedule(daySchedule, item)) {
        daySchedule.push(item);
        usedThemes.add(item.themeType); // 해당 테마를 사용된 것으로 표시합니다.
      }
    }

    return scheduleTable;
  }
  const sc = createSchedule(ssBookingAbleData);

  console.log(sc);

  return (
    <div>
      {Object.entries(sc).map(([day, items]) => {
        return (
          <div key={day}>
            <h2>{day}</h2>
            <ul>
              {items.map((item, index) => {
                return (
                  <li key={index}>
                    {item.time} {item.themeName}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
