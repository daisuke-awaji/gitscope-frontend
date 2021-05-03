import React from 'react';
import Lottie from 'react-lottie';
import animationData from './pull-request-lead-time-demo.json';

const PullRequestLeadTimeDemoLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={'100%'} width={'100%'} />;
};

export default PullRequestLeadTimeDemoLottie;
