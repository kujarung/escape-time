import { AvailableBook } from '@/components/dpsnnn/AvailableBook';
import { EarliestTime } from '@/components/dpsnnn/EarliestTime';
import { InARowBookingTimeTable } from '@/components/dpsnnn/InARowBookingTimeTable';
import { dpsnnnCrawler } from '@/service/crawler';
import { Suspense } from 'react';

const parseSearchParams = (searchParams: string | undefined): string[] => {
  if (!searchParams || searchParams.trim() === '') {
    return [];
  }

  return searchParams.split(',').map((param) => param.trim());
};

export default async function DpsnnnPage({
  searchParams,
}: {
  searchParams: { include?: string };
}) {
  // const { gBookingAbleData, ssBookingAbleData } = await dpsnnnCrawler();

  return (
    <Suspense>
      {/* <EarliestTime
        gBookingAbleData={gBookingAbleData}
        ssBookingAbleData={ssBookingAbleData}
        include={parseSearchParams(searchParams.include)}
      />

      <AvailableBook
        gBookingAbleData={gBookingAbleData}
        ssBookingAbleData={ssBookingAbleData}
      />

      <InARowBookingTimeTable ssBookingAbleData={ssBookingAbleData} /> */}
      ddpss
    </Suspense>
  );
}
