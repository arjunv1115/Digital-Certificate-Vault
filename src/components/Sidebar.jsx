import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, PlusCircle, UserCircle, ShieldCheck } from "lucide-react";

const Sidebar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Certificates",
      path: "/certificates",
      icon: FileText,
    },
    {
      name: "Add Certificate",
      path: "/add-certificate",
      icon: PlusCircle,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  return (
    <aside className="hidden lg:flex w-64 min-h-screen bg-white border-r border-slate-200 flex-col fixed left-0 top-0 bottom-0 z-30">
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-200">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
          <ShieldCheck size={23} />
        </div>

        <div>
          <h1 className="font-bold text-slate-900">CertVault</h1>

          <p className="text-xs text-slate-500">Digital Certificate Vault</p>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink key={link.path} to={link.path} className={({ isActive }) =>`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
              <Icon size={19} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
          <ShieldCheck size={25} className="text-indigo-600 mb-2"/>

          <p className="font-semibold text-sm text-slate-900">Your Certificates</p>

          <p className="text-xs text-slate-500 mt-1">Organized in One Convenient Vault.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;