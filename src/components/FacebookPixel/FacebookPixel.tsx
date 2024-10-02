import React from "react";
import { useEffect } from "react";
import ReactPixel, { AdvancedMatching } from "react-facebook-pixel";

let count = 0;

const FacebookPixel = () => {

  const pixelId = '123456789'

    useEffect(() => {
    console.log('pixelId initialized', count++);
    
    const advancedMatching = { em: "some@email.com" };
    const options = {
      autoConfig: true,
      debug: true,
    };
    ReactPixel.init(pixelId, advancedMatching as AdvancedMatching, options);
    ReactPixel.pageView();
    }, [pixelId]);
  
  return null;
}

export const FacebookPixel2 = React.memo(FacebookPixel);