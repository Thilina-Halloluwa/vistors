import { Routes, Route } from 'react-router-dom';
// 1. Import the new Layout component
import Layout from './Layout'; 
import DashboardPage from './pages/DashboardPage';
import CheckInPage from './pages/CheckInPage';
import CheckOutPage from './pages/CheckOutPage';

function App() {
  return (
    <Routes>
      {/* 2. Create a parent route that uses the Layout component */}
      <Route path="/" element={<Layout />}>
        {/* 3. Nest the page routes inside. The `index` route is the default for "/" */}
        <Route index element={<DashboardPage />} />
        <Route path="check-in" element={<CheckInPage />} />
        <Route path="check-out" element={<CheckOutPage />} />
      </Route>
    </Routes>
  );
}

export default App;