import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:5000"; // Ensure Flask backend is running here

const LandslideBot = () => {
  const [category, setCategory] = useState("1");
  const [customQuery, setCustomQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getResponse = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const requestData = { category };
    if (category === "9" && customQuery.trim() !== "") {
      requestData.custom_prompt = customQuery;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/get-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response || "No response available.");
    } catch (error) {
      setError("Error fetching response. Please try again.");
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 ">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg  w-[70%] text-center">
        <h1 className="text-2xl font-bold text-black">Landslide Information Bot</h1>
        <select
          className="w-full p-2 mt-4 border-2 rounded-lg focus:outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="1">Causes of Landslides</option>
          <option value="2">Signs of an Impending Landslide</option>
          <option value="3">Preventive Measures</option>
          <option value="4">Emergency Response and Safety Tips</option>
          <option value="5">Impact on Environment and Infrastructure</option>
          <option value="6">Landslide-Prone Areas</option>
          <option value="7">Myths and Facts about Landslides</option>
          <option value="8">Role of Afforestation in Prevention</option>
          <option value="9">Custom Query</option>
        </select>

        {category === "9" && (
          <input
            type="text"
            className="w-full p-2 mt-2 border-2 rounded-lg focus:outline-none"
            placeholder="Enter your question"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
          />
        )}

        <button
          className="w-full p-2 mt-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition duration-300"
          onClick={getResponse}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Information"}
        </button>

        {error && <div className="mt-4 p-4 bg-red-400 text-white rounded-lg">{error}</div>}

        {response && (
          <div className="mt-4 p-4 bg-gray-300 text-black rounded-lg text-left whitespace-pre-line">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandslideBot;
