import React from 'react';
import Lottie from 'react-lottie';

const LottieBase: React.FC<{ animationData: any }> = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={'100%'} width={'100%'} />;
};

export default LottieBase;
