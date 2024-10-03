import React from "react";
import { useEffect } from "react";
import ReactPixel, { AdvancedMatching } from "react-facebook-pixel";
import { useSearchParams } from "react-router-dom";

let count = 0;

const FacebookPixel = () => {
 const [searchParams] = useSearchParams();

  // const params = new URLSearchParams(searchParams);
  const pixelId = searchParams.get('pixelId') || '';
  const pixelId2 = searchParams.get('lng');
 console.log('pixelId initialized', pixelId2, count++);
    useEffect(() => {
    console.log('pixelId initialized', pixelId2, count++);
    
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