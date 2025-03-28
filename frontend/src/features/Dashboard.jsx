import { Link } from "react-router-dom";


function Dashboard() {
  return (
    <>
      <p className="text-xl text-center bg-gray-200 m-5 p-3 rounded-lg">
        IMPACT: Integrated Modeling for Predictive Analysis and Crisis Tracking is a disaster management system designed to predict, monitor,
        and respond to natural disasters, particularly landslides. By integrating machine learning, and AI-driven assistance,
        the system provides early warnings and emergency support to authorities, rescue teams, and individuals. One of its key features is an
        AI-powered chatbot, which offers instant responses to user queries regarding landslide risks, suggests preventive measures based on
        location, and connects users to disaster relief resources. Additionally, the weather forecasting module fetches real-time data such as
        rainfall, humidity, and temperature to alert users about conditions that may trigger landslides or floods, ensuring better preparedness.
        To enhance emergency response, the system includes an Emergency Evacuation and Disaster Relief Camp Finder, which displays nearby
        evacuation centers and safe zones on a map, provides real-time updates on shelter capacity.Another crucial feature is the SMS Alert System, which sends real-time alerts when a landslide risk is detected, notifies emergency
        contacts and authorities, and provides safety instructions for immediate action. This system is an essential tool for disaster management teams, government agencies, and communities
        in landslide-prone areas, helping to minimize casualties and improve crisis response through data-driven decision-making and real-time
        alerts.
      </p>

      <div className="flex flex-col items-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link to="/bot" className="bg-gray-200 text-black font-semibold p-8 rounded-lg shadow-lg text-center hover:bg-gray-300">
            <h2 className="text-xl mb-2">🤖 Landslide Bot</h2>
            <p className="text-sm font-normal">An AI-powered chatbot to provide instant assistance and information on landslides.</p>
          </Link>
          <Link to="/landslide-risk" className="bg-gray-200 text-black font-semibold p-8 rounded-lg shadow-lg text-center hover:bg-gray-300">
            <h2 className="text-xl mb-2">🌍 Landslide Risk Prediction</h2>
            <p className="text-sm font-normal">Predicts the risk of landslides based on various environmental factors.</p>
          </Link>
          <Link to="/weather" className="bg-gray-200 text-black font-semibold p-8 rounded-lg shadow-lg text-center hover:bg-gray-300">
            <h2 className="text-xl mb-2">⛅ Weather Forecast</h2>
            <p className="text-sm font-normal">Provides real-time weather forecasts to help assess potential landslide risks.</p>
          </Link>
          <Link to="/emergency-route" className="bg-gray-200 text-black font-semibold p-8 rounded-lg shadow-lg text-center hover:bg-gray-300">
            <h2 className="text-xl mb-2">🚨Emergency Evacuation Locations</h2>
            <p className="text-sm font-normal">Helps locate the safest routes and nearby relief camps in case of a disaster.</p>
          </Link>
        </div>
      </div>




    </>

  );
}

export default Dashboard;
