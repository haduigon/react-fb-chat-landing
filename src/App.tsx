import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';

export const App: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 120 }}>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}