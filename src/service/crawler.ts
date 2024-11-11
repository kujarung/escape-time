import axios from 'axios';
import * as cheerio from 'cheerio';
import url from 'url';

export const ssUrl = 'https://dpsnnn-s.imweb.me/reserve_ss';
export const gUrl = 'https://dpsnnn.com/reserve_g';

export const makeUrl = ({
  branch,
  idx,
  day,
}: {
  branch: 'ss' | 'g';
  idx: string;
  day: string;
}) => {
  if (branch === 'ss') {
    return `${ssUrl}?idx=${idx}&day=${day}`;
  }

  return `${gUrl}?idx=${idx}&day=${day}`;
};
export enum dpsnnnGThemeType {
  '상자' = 'box',
  '행복' = 'happiness',
}

export enum dpsnnnSThemeType {
  '문장' = 'sentence',
  '자격' = 'qualification',
  '별' = 'star',
  '쥐' = 'mouse',
}

export type TimeSlot = {
  idx: string;
  day: string;
  text: string;
  themeName: string;
  themeType: dpsnnnGThemeType | dpsnnnSThemeType | '';
  time: string;
  branch: 'ss' | 'g';
};

export const findEarliestTime = (
  schedule1: TimeSlot[],
  schedule2: TimeSlot[],
  include: string[]
): TimeSlot | null => {
  const combinedSchedule: TimeSlot[] = [...schedule1, ...schedule2].filter(
    (i) => include.includes(i.themeType)
  );

  if (combinedSchedule.length === 0) return null;

  return combinedSchedule.reduce((earliest, current) => {
    const earliestDateTime = new Date(`${earliest.day}T${earliest.time}`);
    const currentDateTime = new Date(`${current.day}T${current.time}`);

    return currentDateTime < earliestDateTime ? current : earliest;
  });
};

export const convertThemeType = (themeType: string) => {
  if (themeType === '상자' || themeType === '행복') {
    return dpsnnnGThemeType[themeType];
  } else if (
    themeType === '문장' ||
    themeType === '자격' ||
    themeType === '별' ||
    themeType === '쥐'
  ) {
    return dpsnnnSThemeType[themeType];
  }

  return '';
};

export const dpsnnnCrawler = async () => {
  try {
    const [ssResponse, gResponse] = await Promise.all([
      axios.get(ssUrl),
      axios.get(gUrl),
    ]);

    const ssBookingAbleData = extractBookingData(ssResponse.data, 'ss');
    const gBookingAbleData = extractBookingData(gResponse.data, 'g');

    return {
      allData: ssBookingAbleData.concat(gBookingAbleData),
      ssBookingAbleData,
      gBookingAbleData,
    };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return {
      ssBookingAbleData: [],
      gBookingAbleData: [],
    };
  }
};

const extractBookingData = (htmlData: string, branch: 'ss' | 'g') => {
  const $ = cheerio.load(htmlData);
  const bookingAbleData: TimeSlot[] = [];

  $('.booking_list').each((_, element) => {
    const isClosed = $(element).hasClass('closed');
    const isDisabled = $(element).hasClass('disable');
    const hasText = $(element).text().trim() !== '-';

    if (!isClosed && !isDisabled && hasText) {
      const bookingLink = $(element).find('a').attr('href');
      if (bookingLink) {
        const parsedUrl = url.parse(bookingLink, true);
        bookingAbleData.push({
          idx: (parsedUrl.query.idx || '').toString(),
          day: (parsedUrl.query.day || '').toString(),
          text: $(element).text().trim(),
          themeName: $(element).text().split('/')[0].trim(),
          time: $(element).text().split('/')[1].trim(),
          themeType: convertThemeType($(element).text().split('/')[0].trim()),
          branch,
        });
      }
    }
  });

  return bookingAbleData;
};
