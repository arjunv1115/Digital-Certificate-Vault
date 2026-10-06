import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <FileText size={28} />
      </div>

      <h3 className="mt-5 font-bold text-slate-900 text-lg">No Certificates yet</h3>

      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">Add your First Digital Certificate and keep all your Important Credentials Organized in One place.</p>

      <Link to="/add-certificate" className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
        <Plus size={18} />
        Add Certificate
      </Link>
    </div>
  );
};

export default EmptyState;