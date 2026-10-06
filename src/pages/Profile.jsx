import { useState } from "react";
import { Calendar, Mail, ShieldCheck, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name || "");

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("dcv_users") || "[]");

    const updatedUsers = users.map((item) =>
      item.id === user.id ? {...item, name,} : item);

    localStorage.setItem("dcv_users", JSON.stringify(updatedUsers));

    const currentUser = {...user, name};

    localStorage.setItem("dcv_current_user", JSON.stringify(currentUser));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      window.location.reload();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-64">
        <Navbar />

        <main className="p-4 md:p-8 max-w-4xl mx-auto">
          <div>
            <p className="text-sm text-indigo-600 font-semibold">Account</p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">Profile</h1>

            <p className="text-slate-500 mt-2">Manage your Account Information.</p>
          </div>

          <div className="mt-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-5 pb-7 border-b border-slate-100">
              <div className="w-20 h-20 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>

                <p className="text-slate-500 text-sm mt-1">{user?.email}</p>

                <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
                  <ShieldCheck size={14} />
                  Active Account
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-7">
              <div>
                <label className="label">
                  Full Name
                </label>

                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

                  <input value={name} onChange={(e) => setName(e.target.value)} className="input pl-11"/>
                </div>
              </div>

              <div>
                <label className="label">
                  Email Address
                </label>

                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

                  <input value={user?.email || ""} disabled className="input pl-11 bg-slate-50 text-slate-500"/>
                </div>
              </div>

              <div>
                <label className="label">
                  Account Created
                </label>

                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

                  <input value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""} disabled className="input pl-11 bg-slate-50 text-slate-500"/>
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-end">
              <button onClick={handleSave} className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;