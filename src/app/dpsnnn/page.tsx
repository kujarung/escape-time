import { AvailableBook } from '@/components/dpsnnn/AvailableBook';
import { EarliestTime } from '@/components/dpsnnn/EarliestTime';
import { ExcludeSelector } from '@/components/dpsnnn/ExcludeSelector';
import { dpsnnnCrawler } from '@/service/crawler';

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
  const { gBookingAbleData, ssBookingAbleData } = await dpsnnnCrawler();

  return (
    <div>
      <ExcludeSelector />
      <EarliestTime
        gBookingAbleData={gBookingAbleData}
        ssBookingAbleData={ssBookingAbleData}
        include={parseSearchParams(searchParams.include)}
      />

      <AvailableBook
        gBookingAbleData={gBookingAbleData}
        ssBookingAbleData={ssBookingAbleData}
      />
    </div>
  );
}
