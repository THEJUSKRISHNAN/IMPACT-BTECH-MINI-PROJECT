import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const RiskGauge = ({ probability }) => {
  const data = [{ value: probability * 100}];
  const riskLevel = probability >= 0.5 ? "High" : "Low";
  const riskColor = probability >= 0.5 ? "text-red-500" : "text-green-500";

  return (
    <div className="flex flex-col items-center bg-white pt-7 rounded-lg shadow-md w-full mt-4">
        <div className="flex text-xl font-bold">
        <h2 >Risk Level :</h2>
        <p className={`pl-2 ${riskColor}`}>{probability==0?"NULL": riskLevel}</p>

        </div>
      
      <RadialBarChart
        width={200}
        height={200}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
          fill={probability >= 0.5 ? "red" : "green"} // Red for high risk, green for low risk
        />
      </RadialBarChart>

      {/* Risk Level Text */}
      
    </div>
  );
};

export default RiskGauge;
