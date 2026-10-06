const StatCard = ({title, value, description, icon, iconClass = "bg-indigo-50 text-indigo-600"}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>

          {description && (
            <p className="text-xs text-slate-400 mt-2">{description}</p>
          )}
        </div>

        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;