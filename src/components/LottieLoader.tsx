
"use client";

import React from "react";
import Lottie from "lottie-react";

// Import the animation JSON file from the public directory.
// Depending on your setup, you might import it directly if you have proper JSON module support.
// Alternatively, you can fetch it from the public folder if needed.
import animationData from "../animations/loading-animation.json";

const LottieLoader = () => {
  return (
    <div className="flex items-center justify-center">
      {/* Configure the Lottie animation as needed */}
      <Lottie animationData={animationData} loop={true} style={{ width: 150, height: 150 }} />
    </div>
  );
};

export default LottieLoader;
