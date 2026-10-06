import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Download, FileText, Pencil, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getUserCertificates } from "../utils/certificateStorage";

const ViewCertificate = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    if (!user) return;

    const certificates = getUserCertificates(user.id);
    const found = certificates.find((item) => item.id === id);

    setCertificate(found);
  }, [id, user]);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        <div className="lg:ml-64">
          <Navbar />

          <main className="p-8 text-center">
            <h2 className="text-2xl font-bold">Certificate Not Found</h2>

            <Link to="/certificates" className="text-indigo-600 mt-3 inline-block">
              Back to Certificates
            </Link>
          </main>
        </div>
      </div>
    );
  }

  const downloadFile = () => {
    if (!certificate.fileData) {
      alert("No certificate file attached.");
      return;
    }

    const link = document.createElement("a");
    link.href = certificate.fileData;
    link.download = certificate.fileName || "certificate";
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar />

        <main className="p-4 md:p-8 max-w-5xl mx-auto">
          <Link to="/certificates" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={17} />
            Back to Certificates
          </Link>

          <div className="mt-6 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-indigo-600 text-white p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                    <ShieldCheck size={28} />
                  </div>

                  <div>
                    <p className="text-indigo-200 text-sm">Digital Certificate</p>

                    <h1 className="text-2xl md:text-3xl font-bold mt-1">{certificate.title}</h1>
                  </div>
                </div>

                <span className="self-start md:self-auto px-3 py-1.5 rounded-full bg-emerald-400/20 text-emerald-100 text-sm font-semibold">
                  Active
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-5">
                <Info label="Issuing Organization" value={certificate.issuer}/>
                <Info label="Category" value={certificate.category}/>
                <Info label="Issue Date" value={certificate.issueDate} icon={<Calendar size={16} />}/>
                <Info label="Expiry Date" value={certificate.expiryDate || "No Expiry"}/>
                <Info label="Credential ID" value={certificate.credentialId || "Not Provided"}/>
                <Info label="File" value={certificate.fileName || "No File Attached"} icon={<FileText size={16} />}/>
              </div>

              {certificate.description && (
                <div className="mt-8">
                  <h3 className="font-bold text-slate-900">Description</h3>

                  <p className="text-slate-500 mt-2 leading-7">{certificate.description}</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                {certificate.fileData && (
                  <button onClick={downloadFile} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
                    <Download size={18} />
                    Download Certificate
                  </button>
                )}

                <Link to={`/certificate/${certificate.id}/edit`} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">
                  <Pencil size={18} />
                  Edit Certificate
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Info = ({ label, value, icon }) => {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{label}</p>

      <p className="mt-2 text-sm font-semibold text-slate-800 flex items-center gap-2">
        {icon}
        {value}
      </p>
    </div>
  );
};

export default ViewCertificate;