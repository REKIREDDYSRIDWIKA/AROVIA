import { useState } from "react";
import { Mic, User, Stethoscope } from "lucide-react";

const translations = {
  en: {
    tagline: "Your health record, wherever you go",
    chooseLanguage: "Choose your language",
    searchPlaceholder: "Describe your symptoms or ask a question...",
    patient: "I'm a Patient",
    doctor: "I'm a Doctor / Health Worker",
  },
  te: {
    tagline: "మీ ఆరోగ్య రికార్డు, మీరు ఎక్కడ ఉన్నా",
    chooseLanguage: "మీ భాషను ఎంచుకోండి",
    searchPlaceholder: "మీ లక్షణాలను వివరించండి లేదా ప్రశ్న అడగండి...",
    patient: "నేను రోగిని",
    doctor: "నేను వైద్యుడు / ఆరోగ్య కార్యకర్తను",
  },
  hi: {
    tagline: "आपका स्वास्थ्य रिकॉर्ड, जहां भी आप हों",
    chooseLanguage: "अपनी भाषा चुनें",
    searchPlaceholder: "अपने लक्षण बताएं या कोई प्रश्न पूछें...",
    patient: "मैं एक मरीज हूं",
    doctor: "मैं डॉक्टर / स्वास्थ्य कार्यकर्ता हूं",
  },
};

function App() {
  const [language, setLanguage] = useState("en");
  const [page, setPage] = useState("home");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);

  const t = translations[language];

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      language === "en"
        ? "en-IN"
        : language === "te"
        ? "te-IN"
        : "hi-IN";

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
    };

    recognition.onerror = () => setListening(false);

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  // PATIENT LOGIN
  if (page === "patient-login") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">

          <button
            onClick={() => setPage("home")}
            className="mb-8 self-start text-sm font-semibold text-teal-700"
          >
            ← Back
          </button>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-600 text-2xl font-bold text-white shadow-lg">
              A
            </div>

            <h1 className="text-3xl font-bold text-teal-700">
              Patient Login
            </h1>

            <p className="mt-2 text-slate-600">
              Enter your phone number to continue
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">

            <label className="mb-2 block text-sm font-semibold">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
            />

            <button
              onClick={() => {
                if (phone.length < 10) {
                  alert("Please enter a valid phone number.");
                  return;
                }

                setPage("otp");
              }}
              className="mt-5 w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Send OTP
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Demo login for hackathon
            </p>

          </div>
        </main>
      </div>
    );
  }

  // OTP PAGE
  if (page === "otp") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">

          <button
            onClick={() => setPage("patient-login")}
            className="mb-8 self-start text-sm font-semibold text-teal-700"
          >
            ← Back
          </button>

          <div className="text-center">

            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-600 text-2xl font-bold text-white shadow-lg">
              A
            </div>

            <h1 className="text-3xl font-bold text-teal-700">
              Enter OTP
            </h1>

            <p className="mt-2 text-slate-600">
              We sent a 6-digit OTP to your phone
            </p>

          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">

            <label className="mb-2 block text-sm font-semibold">
              OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-lg tracking-widest outline-none focus:border-teal-600"
            />

            <button
              onClick={() => {
                if (otp === "123456") {
                  setPage("patient-dashboard");
                } else {
                  alert("For demo, enter OTP: 123456");
                }
              }}
              className="mt-5 w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Verify OTP
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Demo OTP: 123456
            </p>

          </div>
        </main>
      </div>
    );
  }

  // PATIENT DASHBOARD
  if (page === "patient-dashboard") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto min-h-screen w-full max-w-md px-5 py-10">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Welcome back</p>
              <h1 className="text-3xl font-bold text-teal-700">
                Patient Dashboard
              </h1>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-xl font-bold text-white">
              A
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Patient</p>
            <h2 className="mt-1 text-xl font-bold">
              Demo Patient
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Phone: {phone}
            </p>
          </div>

          <div className="mt-6 grid gap-4">

            <button className="rounded-2xl bg-white p-5 text-left shadow-sm hover:border-teal-500">
              <h3 className="text-lg font-bold text-teal-700">
                Medical History
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                View your previous medical records
              </p>
            </button>

            <button className="rounded-2xl bg-white p-5 text-left shadow-sm">
              <h3 className="text-lg font-bold text-teal-700">
                Allergies & Medications
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                View allergies and current medications
              </p>
            </button>

            <button className="rounded-2xl bg-teal-600 p-5 text-left text-white shadow-md">
              <h3 className="text-lg font-bold">
                + Add New Record
              </h3>
              <p className="mt-1 text-sm text-teal-50">
                Add a medical report or prescription
              </p>
            </button>

            <button className="rounded-2xl bg-white p-5 text-left shadow-sm">
              <h3 className="text-lg font-bold text-teal-700">
                Symptom Checker
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Check your symptoms and urgency
              </p>
            </button>

          </div>

          <button
            onClick={() => setPage("home")}
            className="mt-8 w-full rounded-xl border-2 border-teal-600 bg-white py-3 font-semibold text-teal-700"
          >
            Log Out
          </button>

        </main>
      </div>
    );
  }

  // HOME PAGE
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">

        {/* LOGO */}
        <div className="text-center">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-600 text-2xl font-bold text-white shadow-lg">
            A
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-teal-700">
            AROVIA
          </h1>

          <p className="mt-2 text-base text-slate-600">
            {t.tagline}
          </p>

        </div>

        {/* LANGUAGE */}
        <section className="mt-10">

          <h2 className="mb-4 text-center text-lg font-semibold">
            {t.chooseLanguage}
          </h2>

          <div className="grid grid-cols-3 gap-3">

            {[
              ["en", "English"],
              ["te", "తెలుగు"],
              ["hi", "हिंदी"],
            ].map(([code, label]) => (

              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`rounded-xl border-2 px-3 py-4 text-sm font-semibold shadow-sm transition ${
                  language === code
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-slate-200 bg-white hover:border-teal-300"
                }`}
              >
                {label}
              </button>

            ))}

          </div>

        </section>

        {/* SEARCH + VOICE */}
        <section className="mt-8">

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
            />

            <button
              onClick={startVoiceInput}
              aria-label="Voice input"
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition ${
                listening
                  ? "animate-pulse bg-red-500"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              <Mic size={22} />
            </button>

          </div>

          {listening && (
            <p className="mt-2 text-center text-sm font-medium text-red-500">
              Listening...
            </p>
          )}

        </section>

        {/* PATIENT + DOCTOR */}
        <section className="mt-8 space-y-4">

          <button
            onClick={() => setPage("patient-login")}
            className="flex w-full items-center gap-4 rounded-2xl bg-teal-600 p-5 text-left text-white shadow-md transition hover:bg-teal-700"
          >
            <User size={24} />

            <span className="text-lg font-semibold">
              {t.patient}
            </span>

          </button>

          <button
            className="flex w-full items-center gap-4 rounded-2xl border-2 border-teal-600 bg-white p-5 text-left text-teal-700 shadow-sm transition hover:bg-teal-50"
          >
            <Stethoscope size={24} />

            <span className="text-lg font-semibold">
              {t.doctor}
            </span>

          </button>

        </section>

        {/* FOOTER */}
        <p className="mt-auto pt-10 text-center text-xs text-slate-400">
          AROVIA • Healthcare for everyone
        </p>

      </main>
    </div>
  );
}

export default App;