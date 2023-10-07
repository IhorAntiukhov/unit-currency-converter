import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CurrencyPage from './pages/CurrencyPage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<CurrencyPage />} />
        <Route path="/units" element={<></>} />
        <Route path="/history" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
