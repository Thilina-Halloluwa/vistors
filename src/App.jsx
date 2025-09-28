import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CheckInPage from './pages/CheckInPage';
import CheckOutPage from './pages/CheckOutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/check-in" element={<CheckInPage />} />
      <Route path="/check-out" element={<CheckOutPage />} />
    </Routes>
  );
}

export default App;