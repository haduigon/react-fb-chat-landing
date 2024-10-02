import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/header/Header';
// import { FacebookPixel2 } from "./components/FacebookPixel/FacebookPixel";

// import { useEffect, useMemo } from 'react';
// import ReactPixel, { AdvancedMatching } from "react-facebook-pixel";

let count = 0;

export const App: React.FC = () => {
  // const [searchParams] = useSearchParams();

  // const pixelId = useMemo(() => searchParams.get("pixelId") || "", []);
  console.log(count++, 'app render');
  

  // count++;
  //   useEffect(() => {
  //   console.log('pixelId initialized', count);
    
  //   const advancedMatching = { em: "some@email.com" };
  //   const options = {
  //     autoConfig: true,
  //     debug: true,
  //   };
  //   ReactPixel.init(pixelId, advancedMatching as AdvancedMatching, options);
  //   ReactPixel.pageView();
  // }, [pixelId]);
  return (
    <div>
      {/* <FacebookPixel2 /> */}
      <div style={{ marginBottom: 120 }}>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}