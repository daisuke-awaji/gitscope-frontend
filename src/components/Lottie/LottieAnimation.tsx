import React from 'react';
import LottieBase from './LottieBase';
import discussion from './34533-business-team.json';
import risk from './risk.json';

export const Discussion = () => {
  return <LottieBase animationData={discussion} />;
};

export const Risk = () => {
  return <LottieBase animationData={risk} />;
};
