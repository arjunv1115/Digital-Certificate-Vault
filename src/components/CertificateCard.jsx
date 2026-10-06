import { CalendarDays, Download, Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CertificateCard = ({ certificate, onDelete }) => {
  const handleDownload = () => {
    if (!certificate.fileData) {
      alert("No file attached to this certificate.");
      return;
    }

    const link = document.createElement("a");
    link.href = certificate.fileData;
    link.download = certificate.fileName || "certificate";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileText size={21} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">{certificate.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{certificate.issuer}</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          Active
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Category
          </span>

          <span className="font-medium text-slate-800">
            {certificate.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Issue Date
          </span>

          <span className="font-medium text-slate-800 flex items-center gap-1">
            <CalendarDays size={14} />
            {certificate.issueDate}
          </span>
        </div>

        {certificate.credentialId && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">
              Credential ID
            </span>

            <span className="font-medium text-slate-800 truncate max-w-[160px]">
              {certificate.credentialId}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
        <Link to={`/certificate/${certificate.id}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
          <Eye size={16} />
          View
        </Link>

        {certificate.fileData && (
          <button onClick={handleDownload} className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50" title="Download">
            <Download size={17} />
          </button>
        )}

        <Link to={`/certificate/${certificate.id}/edit`} className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50" title="Edit">
          <Pencil size={17} />
        </Link>

        <button onClick={() => onDelete(certificate.id)} className="p-2.5 rounded-xl border border-slate-200 text-red-500 hover:bg-red-50" title="Delete">
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;