import { useState } from "react";
import { Stethoscope, UserRound, ArrowLeft } from "lucide-react";
import PatientApp from "./PatientApp";
import DoctorApp from "./DoctorApp";

function App() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("arovia_role") || null;
    } catch {
      return null;
    }
  });

  const chooseRole = (nextRole) => {
    try {
      localStorage.setItem("arovia_role", nextRole);
    } catch {}
    setMode(nextRole);
  };

  const switchRole = () => {
    try {
      localStorage.removeItem("arovia_role");
    } catch {}
    setMode(null);
  };

  if (mode === "patient") {
    return (
      <>
        <button
          type="button"
          onClick={switchRole}
          className="fixed left-4 top-4 z-[9999] inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur hover:bg-white"
        >
          <ArrowLeft size={16} /> Switch role
        </button>
        <PatientApp />
      </>
    );
  }

  if (mode === "doctor") {
    return (
      <>
        <button
          type="button"
          onClick={switchRole}
          className="fixed left-4 top-4 z-[9999] inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur hover:bg-white"
        >
          <ArrowLeft size={16} /> Switch role
        </button>
        <DoctorApp />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg">
            <Stethoscope size={32} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">AROVIA</h1>
          <p className="mt-3 max-w-xl text-slate-600">
            Your connected healthcare prototype. Choose the side you want to open.
          </p>
        </div>

        <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => chooseRole("patient")}
            className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
              <UserRound size={28} />
            </div>
            <h2 className="text-2xl font-bold">Patient Portal</h2>
            <p className="mt-2 text-slate-600">
              Open the patient login, dashboard, health records and patient-side features.
            </p>
            <span className="mt-6 inline-block font-semibold text-teal-700">Continue as Patient →</span>
          </button>

          <button
            type="button"
            onClick={() => chooseRole("doctor")}
            className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Stethoscope size={28} />
            </div>
            <h2 className="text-2xl font-bold">Doctor Portal</h2>
            <p className="mt-2 text-slate-600">
              Open the doctor login, dashboard, patient records and consultation features.
            </p>
            <span className="mt-6 inline-block font-semibold text-blue-700">Continue as Doctor →</span>
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Frontend demo • Backend integration can be connected later
        </p>
      </div>
    </main>
  );
}

export default App;
