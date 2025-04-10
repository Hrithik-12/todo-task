const StatCard = ({ title, value, color }) => (
    <div className={`bg-${color}-50 p-3 sm:p-4 rounded-lg border border-${color}-100`}>
      <p className={`text-xl sm:text-2xl font-bold text-${color}-600`}>{value}</p>
      <p className="text-xs sm:text-sm text-gray-600">{title}</p>
    </div>
  );
  
  export default StatCard;