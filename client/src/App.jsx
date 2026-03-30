import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenge1 from './pages/Challenge1';
import Hidden from './pages/Hidden';
import FinalStep from './pages/FinalStep';
import Validate from './pages/Validate';

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge-1" element={<Challenge1 />} />
        <Route path="/hidden" element={<Hidden />} />
        <Route path="/final-step" element={<FinalStep />} />
        <Route path="/validate" element={<Validate />} />
      </Routes>
    </div>
  );
}
