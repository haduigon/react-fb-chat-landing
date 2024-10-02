import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { DownloadReport } from './components/download/DownloadReport';
import { FbChatLanding } from './components/animation/FbChatLanding';
import { AppContextProvider, QuizContextProvider } from './context/AppContext';
// import { FacebookPixel2 } from './components/FacebookPixel/FacebookPixel';

export const Root = () => (
  <HashRouter>
    <AppContextProvider>
      <QuizContextProvider>
      {/* <FacebookPixel2 /> */}
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<FbChatLanding />} />
          <Route path="download" element={<DownloadReport />} />
        </Route>
        </Routes>
        </QuizContextProvider>
    </AppContextProvider>
  </HashRouter>
)