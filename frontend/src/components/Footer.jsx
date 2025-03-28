import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black text-center py-4 m-5 rounded-lg">
      <nav className="mb-2">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link to="/" className="text-black font-semibold hover:underline">
              🏠 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/bot" className="text-black font-semibold hover:underline">
              🤖 Landslide Bot
            </Link>
          </li>
          <li>
            <Link to="/landslide-risk" className="text-black font-semibold hover:underline">
              🌍 Landslide Risk Prediction
            </Link>
          </li>
          <li>
            <Link to="/weather" className="text-black font-semibold hover:underline">
              ⛅ Weather Forecast
            </Link>
          </li>
          <li>
            <Link to="/emergency-route" className="text-black font-semibold hover:underline">
              🚨 Emergency Evacuation Locations
            </Link>
          </li>
        </ul>
      </nav>
      <p className="text-sm font-semibold mt-5 mb-5">
        Copyright © 2025 <span className="font-bold">IMPACT</span> | All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
