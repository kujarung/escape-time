'use client';
import { dpsnnnSThemeType, dpsnnnGThemeType } from '@/service/crawler';
import { useSearchParams } from 'next/navigation';

export const ExcludeSelector = () => {
  const searchParams = useSearchParams();
  const include = searchParams.get('include')?.split(',');

  const handleChange = (value: string[]) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (value.length === 0) {
      searchParams.delete('include');
    } else {
      searchParams.delete('include');
      searchParams.set('include', value.join(','));
    }

    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?${searchParams.toString()}`
    );
  };

  const options = Object.entries({
    ...dpsnnnSThemeType,
    ...dpsnnnGThemeType,
  }).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  return (
    <>
      <select
        style={{ width: 350 }}
        defaultValue={Object.entries({
          ...dpsnnnSThemeType,
          ...dpsnnnGThemeType,
        })
          .map((i) => i[1])
          .filter((i) =>
            (include || []).length > 0 ? include?.includes(i) : true
          )}
      />

      <button onClick={() => window.location.reload()}>검색</button>
    </>
  );
};
