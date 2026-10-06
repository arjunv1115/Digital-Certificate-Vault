import { useEffect, useState } from "react";
import { Award, CalendarCheck, FileCheck2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import CertificateCard from "../components/CertificateCard";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { getUserCertificates, deleteCertificate } from "../utils/certificateStorage";

const Dashboard = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const loadCertificates = () => {
    if (user) {
      setCertificates(
        getUserCertificates(user.id)
      );
    }
  };

  useEffect(() => {
    loadCertificates();
  }, [user]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Delete this Certificate?"
    );

    if (!confirmed) return;

    deleteCertificate(id);
    loadCertificates();
  };

  const categories = new Set(
    certificates.map((certificate) => certificate.category)).size;

  const thisYear = new Date().getFullYear();
  const currentYearCertificates = certificates.filter((certificate) => new Date(certificate.issueDate).getFullYear() === thisYear).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar />

        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">Overview</p>

              <h1 className="text-3xl font-bold text-slate-900 mt-1">Dashboard</h1>

              <p className="text-slate-500 mt-2">Manage your Digital Certificates from One Place.</p>
            </div>

            <Link to="/add-certificate" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
              <Plus size={19} />
              Add Certificate
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard title="Total Certificates" value={certificates.length} description="Certificates Stored" icon={<FileCheck2 size={21} />}/>

            <StatCard title="Categories" value={categories} description="Different Categories" icon={<Award size={21} />} iconClass="bg-purple-50 text-purple-600"/>

            <StatCard title="Issued This Year" value={currentYearCertificates} description={`${thisYear} certificates`} icon={<CalendarCheck size={21} />} iconClass="bg-emerald-50 text-emerald-600"/>

            <StatCard title="Vault Status" value="Active" description="Local Vault Ready" icon={<FileCheck2 size={21} />} iconClass="bg-amber-50 text-amber-600"/>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Recent Certificates</h2>

                <p className="text-sm text-slate-500 mt-1">Your Latest Added Certificates</p>
              </div>

              {certificates.length > 0 && (
                <Link to="/certificates" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  View All
                </Link>
              )}
            </div>

            {certificates.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {certificates.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((certificate) => (
                    <CertificateCard key={certificate.id} certificate={certificate} onDelete={handleDelete}/>
                  ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;