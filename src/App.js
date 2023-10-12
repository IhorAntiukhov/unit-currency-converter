import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CurrencyPage from './pages/CurrencyPage';
import NotificationBar from './components/NotificationBar';
import UnitsPage from './pages/UnitsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <Routes>
        <Route path="/" element={<CurrencyPage />} />
        <Route path="/units/*" element={<UnitsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      <NotificationBar />
    </div>
  );
}

export default App;
