import { useState } from "react";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({email: "", password: ""});

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please Enter Email and Password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(form);

      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }

      navigate("/dashboard");
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-700 text-white p-12">
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-40 -top-20 -left-20" />

        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-0 right-0" />

        <div className="relative z-10 flex flex-col justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>

            <span className="text-xl font-bold">
              CertVault
            </span>
          </div>

          <div className="max-w-xl">
            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest">Digital Certificate Management</p>

            <h1 className="text-5xl font-bold leading-tight mt-5">Keep your Certificates Organized in One Place.</h1>

            <p className="text-indigo-100 mt-6 text-lg leading-8">Store, Manage and Access your Important Digital Certificates through a Simple Personal Vault.</p>
          </div>

          <p className="text-indigo-200 text-sm">© 2026 CertVault</p>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <ShieldCheck className="text-indigo-600" />

              <span className="font-bold text-xl">
                CertVault
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>

            <p className="text-slate-500 mt-2">Sign in to Access your Certificate Vault.</p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"/>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Enter your Password" className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"/>

                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60 transition">
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-7">
            Don't have an Account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;