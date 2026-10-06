import { useEffect, useState } from "react";
import { ArrowLeft, FileUp, Save, Upload } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { addCertificate, getUserCertificates, updateCertificate } from "../utils/certificateStorage";

const AddCertificate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    category: "Education",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    description: "",
    fileName: "",
    fileData: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode || !user) return;

    const certificates = getUserCertificates(user.id);
    const existing = certificates.find((certificate) => certificate.id === id);

    if (!existing) {
      navigate("/certificates");
      return;
    }

    setForm({
      title: existing.title || "",
      issuer: existing.issuer || "",
      category: existing.category || "Education",
      issueDate: existing.issueDate || "",
      expiryDate: existing.expiryDate || "",
      credentialId: existing.credentialId || "",
      description: existing.description || "",
      fileName: existing.fileName || "",
      fileData: existing.fileData || "",
    });
  }, [id, isEditMode, user, navigate]);

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setError("File Size must be Less than 3 MB because it is stored in Browser LocalStorage.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((previous) => ({
        ...previous,
        fileName: file.name,
        fileData: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.issuer || !form.issueDate) {
      setError("Please Fill in all Required Fields.");
      return;
    }

    setSaving(true);

    if (isEditMode) {
      updateCertificate(id, form);
    } else {
      addCertificate({
        id: crypto.randomUUID(),
        userId: user.id,
        ...form,
        createdAt: new Date().toISOString(),
      });
    }

    setTimeout(() => {
      setSaving(false);
      navigate("/certificates");
    }, 400);
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

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-slate-900">
              {isEditMode ? "Edit Certificate" : "Add Certificate"}
            </h1>

            <p className="text-slate-500 mt-2">
              {isEditMode ? "Update your Certificate Information." : "Add a New Certificate to your Digital Vault."}
            </p>
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 bg-white border border-slate-200 rounded-2xl p-5 md:p-8">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="label">
                  Certificate Title *
                </label>

                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Java Programming Certification" className="input"/>
              </div>

              <div>
                <label className="label">
                  Issuing Organization *
                </label>

                <input name="issuer" value={form.issuer} onChange={handleChange} placeholder="e.g. Oracle" className="input"/>
              </div>

              <div>
                <label className="label">
                  Category *
                </label>

                <select name="category" value={form.category} onChange={handleChange} className="input">
                  <option>Education</option>
                  <option>Programming</option>
                  <option>Cloud</option>
                  <option>Database</option>
                  <option>Web Development</option>
                  <option>Internship</option>
                  <option>Workshop</option>
                  <option>Achievement</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="label">
                  Issue Date *
                </label>

                <input type="date" name="issueDate" value={form.issueDate} onChange={handleChange} className="input"/>
              </div>

              <div>
                <label className="label">
                  Expiry Date
                </label>

                <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="input"/>
              </div>

              <div>
                <label className="label">
                  Credential ID
                </label>

                <input name="credentialId" value={form.credentialId} onChange={handleChange} placeholder="e.g. CERT-2026-001" className="input"/>
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  Description
                </label>

                <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Add some Information about this Certificate..." className="input resize-none"/>
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  Certificate File
                </label>

                <label className="border-2 border-dashed border-slate-200 rounded-2xl p-7 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:bg-indigo-50/30 transition cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    {form.fileData ? (
                      <FileUp size={22} />
                    ) : (
                      <Upload size={22} />
                    )}
                  </div>

                  <p className="font-semibold text-slate-800 mt-3">
                    {form.fileName ? form.fileName : "Upload Certificate"}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    PDF, JPG, PNG — Maximum 3 MB
                  </p>

                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden"/>
                </label>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
              <Link to="/certificates" className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-center hover:bg-slate-50">
                Cancel
              </Link>

              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60">
                <Save size={18} />
                {saving
                  ? "Saving..."
                  : isEditMode
                    ? "Update Certificate"
                    : "Save Certificate"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddCertificate;