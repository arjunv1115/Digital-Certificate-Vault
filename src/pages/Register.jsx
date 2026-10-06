import { useState } from "react";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({name: "", email: "", password: "", confirmPassword: ""});
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please Fill in All Fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must Contain at least 6 Characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not Match.");
      return;
    }

    const result = register({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 text-white p-12">
        <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 -top-20 right-0" />

        <div className="relative z-10 flex flex-col justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>

            <span className="text-xl font-bold">
              CertVault
            </span>
          </div>

          <div className="max-w-xl">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Personal Certificate Vault</p>

            <h1 className="text-5xl font-bold leading-tight mt-5">Build your Digital Certificate Collection.</h1>

            <p className="text-slate-400 mt-6 text-lg leading-8">Create an Account and Start Organizing your Certificates, Credentials and Professional Achievements.</p>
          </div>

          <p className="text-slate-500 text-sm">Simple. Organized. Accessible.</p>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <ShieldCheck className="text-indigo-600" />

            <span className="font-bold text-xl">
              CertVault
            </span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Create your Account</h2>

          <p className="text-slate-500 mt-2">Start Managing your Certificates today.</p>

          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-7">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"/>
            </div>

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
                <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 Characters" className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"/>

                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your Password" className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"/>

                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-60 text-white font-semibold hover:bg-indigo-700 transition">
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an Account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;