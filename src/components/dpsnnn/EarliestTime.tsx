import { findEarliestTime, makeUrl, TimeSlot } from '@/service/crawler';
import Link from 'next/link';
import { ExcludeSelector } from './ExcludeSelector';

export const EarliestTime = ({
  gBookingAbleData,
  ssBookingAbleData,
  include,
}: {
  gBookingAbleData: TimeSlot[];
  ssBookingAbleData: TimeSlot[];
  include: string[];
}) => {
  const earliestTimeItem = findEarliestTime(
    gBookingAbleData,
    ssBookingAbleData,
    include
  );
  return (
    <>
      <p>가장 빠른 단편선</p>
      <ExcludeSelector />
      <div className="">
        {earliestTimeItem ? (
          <Link
            href={`${makeUrl({
              branch: earliestTimeItem.branch,
              idx: earliestTimeItem.idx,
              day: earliestTimeItem.day,
            })}`}
            target="_blank"
            rel="noreferrer"
          >
            {earliestTimeItem?.time}
            {earliestTimeItem?.themeName} 예약하기
          </Link>
        ) : (
          <p>예약 가능한 단편선이 없습니다.</p>
        )}
      </div>
    </>
  );
};
