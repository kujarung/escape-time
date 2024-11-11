import { makeUrl, TimeSlot } from '@/service/crawler';
import { Flex, Space } from 'antd';
import Link from 'next/link';

export const AvailableBook = ({
  gBookingAbleData,
  ssBookingAbleData,
}: {
  gBookingAbleData: TimeSlot[];
  ssBookingAbleData: TimeSlot[];
}) => {
  return (
    <div>
      <p>예약 가능한 단편선</p>
      <Flex>
        <Space>
          {gBookingAbleData.map((i) => {
            return (
              <div key={'g' + i.time}>
                <Link
                  href={`${makeUrl({
                    branch: i.branch,
                    idx: i.idx,
                    day: i.day,
                  })}`}
                >
                  {i.day} {i.time} {i.themeName}
                </Link>
              </div>
            );
          })}

          {ssBookingAbleData.map((i) => {
            return (
              <div key={'ss' + i.time}>
                <Link
                  target="_blank"
                  href={`${makeUrl({
                    branch: i.branch,
                    idx: i.idx,
                    day: i.day,
                  })}`}
                >
                  <td>
                    {i.day} {i.time} {i.themeName}
                  </td>
                </Link>
              </div>
            );
          })}
        </Space>
      </Flex>
    </div>
  );
};
