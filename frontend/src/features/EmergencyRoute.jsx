import React from "react";

const EmergencyRoute = () => {
  const safeLocations = [
    { name: "Munnar Govt. High School", location: "10.0889,77.0607" },
    { name: "Munnar Town Hall", location: "10.0895,77.0609" },
    { name: "Devikulam Community Hall", location: "10.0765,77.1298" },
    { name: "KDH Club Auditorium", location: "10.0912,77.0743" },
    { name: "Pallivasal Community Center", location: "10.0601,77.0805" },
    { name: "Anakkulam Relief Camp", location: "10.0123,77.1307" },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-6 m-5 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        🚨 Emergency Evacuation Locations in Munnar
      </h2>
      <p className="text-center text-gray-700 mb-8">
        These locations are identified as safe zones in case of a landslide emergency.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeLocations.map((place, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps?q=${place.location}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-300 text-black p-5 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
          >
            <h3 className="font-semibold text-lg">{place.name}</h3>
            <p className="text-sm text-gray-600">📍 {place.location}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default EmergencyRoute;
