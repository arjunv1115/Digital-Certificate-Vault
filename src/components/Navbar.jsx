import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            <Menu size={22} />
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" />

            <span className="font-bold">
              CertVault
            </span>
          </div>

          <div className="hidden lg:block">
            <p className="text-sm text-slate-500">Welcome Back,</p>

            <p className="font-semibold text-slate-900">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <p className="text-sm font-semibold text-slate-800">{user?.name}</p>

            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <button onClick={logout} title="Logout" className="p-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition">
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;