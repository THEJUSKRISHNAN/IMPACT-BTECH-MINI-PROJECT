const CircleInput = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 text-lg font-semibold">{label}</label>
      <input
        type="number"
        className="w-20 h-20 rounded-full border-4 border-black bg-red-500 text-black 
                   text-center text-lg font-bold outline-none appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CircleInput;

  
  