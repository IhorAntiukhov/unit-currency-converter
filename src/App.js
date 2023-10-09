import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CurrencyPage from './pages/CurrencyPage';
import NotificationBar from './components/NotificationBar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<CurrencyPage />} />
        <Route path="/units" element={<></>} />
        <Route path="/history" element={<></>} />
      </Routes>
      <NotificationBar />
    </div>
  );
}

export default App;
