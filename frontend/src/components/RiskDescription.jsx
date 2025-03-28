const RiskDescription = ({ risk }) => {
  if (risk <= 0) return null;
  let description = "";
  let measures = [];

  if (risk == 0) {
    description = ""
    measures = []
  }
  else if (risk > 0.5) {
    description =
      "The likelihood of a landslide occurring in this area is significantly high. " +
      "Factors such as heavy rainfall, steep slopes, and soil saturation indicate unstable conditions. " +
      "Immediate precautionary measures are necessary to prevent loss of life and property.";

    measures = [
      "Evacuate the area if advised by local authorities.",
      "Monitor slopes for cracks or sudden shifts in terrain.",
      "Avoid traveling near steep slopes or landslide-prone areas.",
      "Ensure proper drainage to reduce soil saturation.",
      "Stay updated with weather and emergency alerts."
    ];
  } else {
    description =
      "The probability of a landslide is currently low. " +
      "However, changes in environmental conditions, such as heavy rainfall or seismic activity, " +
      "could increase the risk. Remain vigilant and take preventive actions to maintain safety.";

    measures = [
      "Maintain proper drainage systems to prevent excessive water buildup.",
      "Avoid unnecessary excavation or construction on steep slopes.",
      "Plant vegetation to stabilize the soil and prevent erosion.",
      "Regularly inspect the area for any early signs of ground movement.",
      "Stay informed about upcoming weather conditions that may increase risk."
    ];
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full mt-5">
      <h2 className="text-xl font-semibold">Risk Description</h2>
      <p className="mt-2">{description}</p>

      <h2 className="text-xl font-semibold mt-4">Immediate Measures</h2>
      <ul className="list-disc ml-5 mt-2">
        {measures.map((measure, index) => (
          <li key={index}>{measure}</li>
        ))}
      </ul>
    </div>
  );
};

export default RiskDescription;
