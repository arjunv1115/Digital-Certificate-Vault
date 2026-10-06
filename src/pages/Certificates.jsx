import { useEffect, useMemo, useState } from "react";
import { FileText, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CertificateCard from "../components/CertificateCard";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { deleteCertificate, getUserCertificates } from "../utils/certificateStorage";

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const loadCertificates = () => {
    setCertificates(getUserCertificates(user.id));
  };

  useEffect(() => {
    if (user) {
      loadCertificates();
    }
  }, [user]);

  const categories = [
    "All",
    ...new Set(
      certificates.map(
        (certificate) => certificate.category
      )
    ),
  ];

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const searchText = search.toLowerCase();

      const matchesSearch = certificate.title.toLowerCase().includes(searchText) || certificate.issuer.toLowerCase().includes(searchText) || certificate.credentialId ?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" ||
        certificate.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [certificates, search, category]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Delete this Certificate?"
    );

    if (!confirmed) return;

    deleteCertificate(id);
    loadCertificates();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar />

        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">Vault</p>

              <h1 className="text-3xl font-bold text-slate-900 mt-1">My Certificates</h1>

              <p className="text-slate-500 mt-2">Search, View and Manage all your Certificates.</p>
            </div>

            <Link to="/add-certificate" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
              <Plus size={19} />
              Add Certificate
            </Link>
          </div>

          {certificates.length > 0 && (
            <div className="mt-7 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Certificates..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500"/>
              </div>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-indigo-500">
                {categories.map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-7">
            {certificates.length === 0 ? (
              <EmptyState />
            ) : filteredCertificates.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <FileText size={35} className="mx-auto text-slate-300"/>

                <h3 className="mt-4 font-bold">No Certificates Found</h3>

                <p className="text-sm text-slate-500 mt-1">Try Changing your Search or Category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredCertificates.map((certificate) => (<CertificateCard key={certificate.id} certificate={certificate} onDelete={handleDelete}/>)
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Certificates;