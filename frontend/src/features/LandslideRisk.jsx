import React, { useState } from 'react'
import CircleInput from '../components/CircleInput'
import RiskGauge from '../components/RiskGauge'
import RiskDescription from '../components/RiskDescription'
import { predictLandslide } from "../api";
import MapComponent from '../components/MapComponent'

function LandslideRisk() {

    const [prediction, setPrediction] = useState(0)

    const [riskData, setRiskData] = useState(0);

    const [values, setValues] = useState({
        Rainfall_mm: 0,
        Slope_Angle: 0,
        Soil_Saturation: 0,
        Vegetation_Cover: 0,
        Earthquake_Activity: 0,
        Proximity_to_Water: 0,
        Soil_Type_Gravel: 0,
        Soil_Type_Sand: 0,
        Soil_Type_Silt: 0,
    });

    const handleInputChange = (label, newValue) => {
        setValues((prevValues) => ({
            ...prevValues,
            [label]: newValue, // Update only the changed input
        }));
    };

    const handleSubmit = async () => {
        const response = await predictLandslide(values);
        setRiskData(response); // Update parent state with API response
        // console.log(riskData)
        setPrediction(riskData.prediction_prob)
    };


    return (

        <div>
            {/* <h1 className="text-center font-bold text-black text-5xl p-4  bg-gray-200 rounded-lg m-5">
                IMPACT: Integrated Modeling for Predictive Analysis and Crisis Tracking
            </h1> */}

            <div className="flex  p-4 bg-gray-200 mb-10 ml-5 mr-5 rounded-lg">


                <section className="w-3/5 flex flex-col items-center p-4">
                    {/* left */}
                    <div className='w-full'>
                        <MapComponent />
                    </div>
                    <div>
                        <RiskDescription risk={prediction} />
                    </div>

                </section>

                <section>
                    {/* right */}
                    <div>

                        <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-md">
                            {Object.keys(values).map((label) => (
                                <CircleInput
                                    key={label}
                                    label={label}
                                    value={values[label]}
                                    onChange={(newValue) => handleInputChange(label, newValue)}
                                />
                            ))}
                        </div>


                        <div>
                            <RiskGauge probability={prediction} />
                        </div>

                        <div className='flex flex-col items-center'>
                            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semiblack text-xl hover:cursor-pointer hover:bg-blue-700" onClick={handleSubmit}>
                                Predict Risk
                            </button>
                        </div>


                    </div>

                </section>


            </div>



        </div>

    )
}

export default LandslideRisk
