import React from "react";
import Lottie from "react-lottie";
import animationData from "./visualize-team.json";

const VisualizeTeamProductivityLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={500} width={500} />;
};

export default VisualizeTeamProductivityLottie;
