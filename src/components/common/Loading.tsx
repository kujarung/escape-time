'use client';

import Lottie from 'react-lottie';
import * as animationData from '@/assets/lottie/loading.json';

export const Loading = () => {
  return (
    <div className="loading-wrap">
      <div className="dim"></div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        style={{ width: '300px', height: '300px' }}
      />
    </div>
  );
};
