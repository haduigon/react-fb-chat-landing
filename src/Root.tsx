import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { DownloadReport } from './components/download/DownloadReport';
import { FbChatLanding } from './components/animation/FbChatLanding';
import { AppContextProvider } from './context/AppContext';

export const Root = () => (
  <HashRouter>
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<FbChatLanding />} />
          <Route path="download" element={<DownloadReport />} />
        </Route>
      </Routes>
    </AppContextProvider>
  </HashRouter>
)