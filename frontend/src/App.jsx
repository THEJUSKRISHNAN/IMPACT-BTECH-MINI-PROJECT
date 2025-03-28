import "tailwindcss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./features/Dashboard";
import LandslideRisk from './features/LandslideRisk';
import Weather from './features/Weather';
import LandslideBot from './features/LandslideBot';
import { Heading } from "./components/Heading";
import Footer from "./components/Footer";
import EmergencyRoute from "./features/EmergencyRoute";


function App() {
  return (

    <Router>
      <Heading />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bot" element={<LandslideBot />} />
        <Route path="/landslide-risk" element={<LandslideRisk />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/emergency-route" element={<EmergencyRoute/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
