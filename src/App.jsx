import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mesas from './pages/Mesas';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mesas />} />
      </Routes>
    </Router>
  );
}