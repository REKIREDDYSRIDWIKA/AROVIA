import React, { useEffect, useMemo, useState, useRef } from "react";
/*
  AROVIA — DOCTOR SIDE
  Self-contained React/Vite App.jsx
  No Tailwind or lucide-react required.
*/

const DOCTOR_STORAGE = "arovia_doctor";
const REPORT_STORAGE = "arovia_reports";
const PRECONSULTATION_STORAGE = "arovia_preconsultations";
const CONSULTATION_STORAGE = "arovia_consultations";
const CONSENT_STORAGE = "arovia_consent";

const demoPatients = [
  {
    id: "ARV-001",
    name: "Ravi Kumar",
    age: 52,
    gender: "Male",
    bloodType: "O+",
religion: "Hindu",
occupation: "Farmer",
diet: "Vegetarian",
address: "Balapur, Hyderabad, Telangana",
lastVisit: "2 Sep 2026",
    urgency: "Medium",
    condition: "Follow-up required",
    allergies: ["Penicillin"],
    medications: ["Metformin 500 mg", "Amlodipine 5 mg"],
    medicationDetails: [
  {
    name: "Metformin",
    dose: "500 mg",
    schedule: "Twice daily",
    status: "Active",
  },
  {
    name: "Amlodipine",
    dose: "5 mg",
    schedule: "Once daily",
    status: "Active",
  },
],
    history: [
      {
        date: "2 Sep 2026",
        title: "Routine follow-up",
        note: "Patient reports improved energy levels. Continue current plan and review after two weeks.",
      },
      {
        date: "15 Aug 2026",
        title: "Initial consultation",
        note: "Baseline history recorded. No previous major admissions reported.",
      },
    ],
  },
  {
    id: "ARV-018",
    name: "Sita Devi",
    age: 51,
    gender: "Female",
    bloodType: "B+",
religion: "Hindu",
occupation: "Teacher",
diet: "Vegetarian",
address: "LB Nagar, Hyderabad, Telangana",
lastVisit: "28 Aug 2026",
    urgency: "High",
    condition: "Needs clinical review",
    allergies: ["Sulfa drugs"],
    medications: ["Amlodipine 5 mg"],
    medicationDetails: [
  {
    name: "Amlodipine",
    dose: "5 mg",
    schedule: "Once daily",
    status: "Active",
  },
],
    history: [
      {
        date: "28 Aug 2026",
        title: "Clinical review",
        note: "Follow-up required after elevated blood pressure reading.",
      },
    ],
  },
  {
    id: "ARV-024",
    name: "Lakshmi Bai",
    age: 42,
    gender: "Female",
    bloodType: "A+",
religion: "Hindu",
occupation: "Homemaker",
diet: "Vegetarian",
address: "Kothapet, Hyderabad, Telangana",
lastVisit: "21 Aug 2026",
    urgency: "Routine",
    condition: "Stable",
    allergies: [],
    medications: ["Vitamin D"],
    medicationDetails: [
  {
    name: "Vitamin D",
    dose: "1 tablet",
    schedule: "Once daily",
    status: "Active",
  },
],
    history: [
      {
        date: "21 Aug 2026",
        title: "Routine check",
        note: "Stable condition. Continue current care plan.",
      },
    ],
  },
];

const demoReports = [
  {
    id: "r1",
    name: "Blood Test Report",
    type: "Lab Report",
    date: "2026-09-04",
    doctor: "Dr. Ananya Rao",
    facility: "Arovia Rural Health Centre",
    fileData: null,
    fileType: "",
  },
  {
    id: "r2",
    name: "Prescription - Follow Up",
    type: "Prescription",
    date: "2026-09-02",
    doctor: "Dr. Ananya Rao",
    facility: "Arovia Rural Health Centre",
    fileData: null,
    fileType: "",
  },
  {
    id: "r3",
    name: "Chest Scan",
    type: "Scan",
    date: "2026-08-28",
    doctor: "Dr. Vikram Singh",
    facility: "District Telemedicine Unit",
    fileData: null,
    fileType: "",
  },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getDoctor() {
  return readStorage(DOCTOR_STORAGE, null);
}

function getReports() {
  return readStorage(REPORT_STORAGE, demoReports);
}

function saveReports(reports) {
  try {
    localStorage.setItem(REPORT_STORAGE, JSON.stringify(reports));
  } catch {
    // Ignore storage errors in demo mode.
  }
}

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Icon({ name, size = 22, strokeWidth = 2 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    arrowLeft: (
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </>
    ),
    arrowRight: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4.2 3.6-7 8-7s8 2.8 8 7" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    stethoscope: (
      <>
        <path d="M6 3v6a6 6 0 0 0 12 0V3" />
        <path d="M4 3h4M16 3h4" />
        <path d="M9 15a4 4 0 0 0 8 0v-1" />
        <circle cx="18" cy="11" r="2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    qr: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <line x1="9" y1="12" x2="16" y2="12" />
        <line x1="9" y1="16" x2="16" y2="16" />
      </>
    ),
    activity: <path d="M3 12h4l2-7 4 14 2-7h6" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    pill: (
      <>
        <path d="M9 15l6-6" />
        <rect x="5" y="5" width="8" height="14" rx="4" transform="rotate(45 5 5)" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4" />
        <polyline points="7 9 12 4 17 9" />
        <path d="M4 15v4h16v-4" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3Z" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h3l2-2h6l2 2h3v11H4z" />
        <circle cx="12" cy="12.5" r="3.5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    alertTriangle: (
      <>
        <path d="m12 3 10 18H2L12 3Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    alertCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </>
    ),
    checkCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    hospital: (
      <>
        <path d="M3 21h18M6 21V5h12v16M10 9h4M12 7v4M9 14h2M13 14h2" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
      </>
    ),
    x: (
      <>
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 9.5a11 11 0 0 1 14 0" />
        <path d="M8 13a6.5 6.5 0 0 1 8 0" />
        <path d="M11 16.5a2 2 0 0 1 2 0" />
        <path d="M12 20h.01" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <polyline points="3 4 3 9 8 9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
  };

  return <svg {...common}>{icons[name] || icons.file}</svg>;
}

function Badge({ level }) {
  const normalized = String(level || "Routine").toLowerCase();
  const icon =
    normalized === "high"
      ? "alertTriangle"
      : normalized === "medium"
        ? "alertCircle"
        : "checkCircle";

  return (
    <span className={`badge badge-${normalized}`}>
      <Icon name={icon} size={13} />
      {level}
    </span>
  );
}

function Layout({
  title,
  current,
  navigate,
  onBack,
  noNav = false,
  children,
  sessionSeconds = null,
}) {
  return (
    <div className="arovia-app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-stack">
            {onBack ? (
              <button className="icon-btn" onClick={onBack} aria-label="Go back">
                <Icon name="arrowLeft" size={20} />
              </button>
            ) : (
              <div className="brand-mark">
                <Icon name="stethoscope" size={21} />
              </div>
            )}

            <div className="title-wrap">
              <div className="eyebrow">Arovia</div>
              <div className="top-title">{title}</div>
            </div>
          </div>

          {!onBack && (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    {sessionSeconds !== null && (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px",
      borderRadius: 999,
      background: "#eaf8ef",
      color: "#16794a",
      fontSize: 11,
      fontWeight: 700,
      whiteSpace: "nowrap",
    }}
  >
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#22c55e",
      }}
    />
    Session{" "}
    {String(Math.floor(sessionSeconds / 60)).padStart(2, "0")}:
    {String(sessionSeconds % 60).padStart(2, "0")}
  </div>
)}

    <div className="doctor-mini">
      <Icon name="user" size={18} />
    </div>
  </div>
)}
        </div>
      </header>

      {children}

      {!noNav && (
        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            <button
              className={`nav-item ${current === "dashboard" ? "active" : ""}`}
              onClick={() => navigate("dashboard")}
            >
              <Icon name="activity" size={20} />
              Home
            </button>

            <button
              className={`nav-item ${current === "patient" ? "active" : ""}`}
              onClick={() => navigate("patient")}
            >
              <Icon name="file" size={20} />
              Records
            </button>

            <button
              className={`nav-item ${current === "share" ? "active" : ""}`}
              onClick={() => navigate("share")}
            >
              <Icon name="qr" size={20} />
              Scan
            </button>

            <button
              className={`nav-item ${current === "profile" ? "active" : ""}`}
              onClick={() => navigate("profile")}
            >
              <Icon name="user" size={20} />
              Profile
              
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

function DoctorLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [error, setError] = useState("");

  function submitLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setOtpMode(true);
  }

  function verifyOtp() {
    if (otp !== "123456") {
      setError("Invalid OTP. Demo OTP: 123456");
      return;
    }

    const doctor = {
      name: "Dr. Ananya Rao",
      email: email.trim(),
      facility: "Arovia Rural Health Centre",
      role: "Registered Healthcare Personnel",
    };

    localStorage.setItem(DOCTOR_STORAGE, JSON.stringify(doctor));
    onLogin(doctor);
  }

  if (otpMode) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Enter OTP</h1>

          <p className="login-sub">
            Enter the 6-digit OTP.
          </p>

          <input
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            placeholder="Enter OTP"
          />

          {error && <div className="error">{error}</div>}

          <button
            className="primary-btn full"
            type="button"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>

          <button
            className="secondary-btn full"
            type="button"
            onClick={() => {
              setOtpMode(false);
              setOtp("");
              setError("");
            }}
          >
            Back to Login
          </button>

          <p className="demo-hint">
            Demo OTP: 123456
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome back</h1>

        <p className="login-sub">
          Sign in to access the Arovia Doctor Portal.
        </p>

        <form onSubmit={submitLogin}>
          <label className="form-label">Email</label>

          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="doctor@arovia.com"
          />

          <label className="form-label">Password</label>

          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter your password"
          />

          {error && <div className="error">{error}</div>}

          <button className="primary-btn full" type="submit">
            Sign In
          </button>
        </form>

        <p className="demo-hint">
          Demo: any email and password.
        </p>
      </div>
    </div>
  );
}


function DoctorClinicalWorkspace({ doctor, patient, navigate }) {
  const currentPatient = patient || demoPatients[0];
  const pre = getPatientPreConsultation(currentPatient);
  const [tab, setTab] = useState("overview");
  const [aiDraft, setAiDraft] = useState(`AI draft: ${currentPatient.name} has ${pre.currentComplaint || currentPatient.condition}. ${pre.duration ? `Duration ${pre.duration}. ` : ""}${pre.associatedSymptoms || "Review associated symptoms."} Review allergies, medications and the latest timeline before consultation.`);
  const [aiStatus, setAiStatus] = useState("AI-generated draft");
  const [reason, setReason] = useState("");
  const [emergencyStatus, setEmergencyStatus] = useState("Not requested");
  const [consent, setConsent] = useState(() => getPatientConsent(currentPatient.id) || { active: true, purpose: "Clinical consultation", expiresAt: "End of visit" });
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState(false);
  const investigations = [
    ["Haemoglobin", "13.2 g/dL", "12–16 g/dL", "Normal"],
    ["Fasting glucose", "118 mg/dL", "70–99 mg/dL", "Above reference"],
    ["Blood pressure", "138/86 mmHg", "<120/80 mmHg", "Above reference"],
  ];
  const tabs = [
    ["overview", "Clinical Dashboard"], ["timeline", "Medical Timeline"], ["ai", "AI Summary Review"],
    ["investigations", "Investigations"], ["emergency", "Emergency Access"], ["consent", "Consent UI"],
    ["notes", "Doctor Notes"], ["integration", "Integration States"],
  ];
  function saveConsent(active) {
    const next = { active, purpose: consent.purpose || "Clinical consultation", expiresAt: active ? (consent.expiresAt || "End of visit") : "Revoked" };
    setConsent(next);
    const all = readStorage(CONSENT_STORAGE, {});
    try { localStorage.setItem(CONSENT_STORAGE, JSON.stringify({ ...all, [currentPatient.id]: next })); } catch {}
  }
  function requestEmergency() {
    if (!reason.trim()) { alert("Enter a reason before requesting emergency access."); return; }
    setEmergencyStatus("Access granted · event logged");
  }
  function saveNote() {
    if (!note.trim()) return;
    const all = readStorage("arovia_doctor_notes", []);
    const next = [{ id: `note-${Date.now()}`, patientId: currentPatient.id, doctor: doctor?.name || "Doctor", note: note.trim(), timestamp: new Date().toISOString() }, ...(Array.isArray(all) ? all : [])];
    try { localStorage.setItem("arovia_doctor_notes", JSON.stringify(next)); } catch {}
    setNote(""); setSavedNote(true); window.setTimeout(() => setSavedNote(false), 2500);
  }
  return (
    <section className="clinical-workspace">
      <div className="workspace-head"><div><div className="eyebrow">CLINICAL DASHBOARD</div><h2 className="section-title">Complete Doctor Workspace</h2><p className="section-sub">All required clinical review features in one dashboard.</p></div><button className="primary-btn" onClick={() => navigate("patient")}><Icon name="file" size={17}/> Open Full Patient Record</button></div>
      <div className="workspace-tabs">{tabs.map(([key, label]) => <button key={key} className={`workspace-tab ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>{label}</button>)}</div>

      {tab === "overview" && <div className="workspace-grid">
        <section className="workspace-card workspace-wide"><div className="workspace-card-head"><div><div className="eyebrow">PATIENT DEMOGRAPHICS</div><h3>Patient identity</h3></div><Icon name="user" size={20}/></div><div className="workspace-data-grid">{[["Patient ID",currentPatient.id],["Name",currentPatient.name],["Age",`${currentPatient.age} years`],["Gender",currentPatient.gender],["Blood group",currentPatient.bloodType]].map(([a,b])=><div className="workspace-data" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></section>
        <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">HPI</div><h3>History of Present Illness</h3></div><Icon name="activity" size={20}/></div><div className="workspace-list">{[["Chief complaint",pre.currentComplaint || currentPatient.condition],["Duration",pre.duration || "Not recorded"],["Severity",pre.severity || "Not recorded"],["Pattern",pre.pattern || "Not recorded"],["Associated symptoms",pre.associatedSymptoms || "None recorded"]].map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></section>
        <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">PAST HISTORY</div><h3>Clinical history</h3></div><Icon name="history" size={20}/></div><div className="workspace-list">{currentPatient.history.map((h,i)=><div key={i}><strong>{h.title}</strong><span>{h.date}</span><p>{h.note}</p></div>)}</div></section>
        <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">MEDICATIONS</div><h3>Current medications</h3></div><Icon name="pill" size={20}/><div style={{ display: "grid", gap: 10 }}>
  {(currentPatient.medicationDetails || []).map((medicine) => (
    <div
      key={medicine.name}
      style={{
        padding: 14,
        border: "1px solid #e5ecee",
        borderRadius: 12,
        background: "#fbfdfd",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="pill" size={16} />
          <strong style={{ fontSize: 12 }}>
            {medicine.name}
          </strong>
        </div>

        <span
          style={{
            padding: "5px 9px",
            borderRadius: 999,
            background: "#eaf8ef",
            color: "#18794e",
            fontSize: 9,
            fontWeight: 800,
          }}
        >
          {medicine.status}
        </span>
      </div>

      <div
        style={{
          marginTop: 8,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          color: "#667085",
          fontSize: 10,
        }}
      >
        <span>Dose: {medicine.dose}</span>
        <span>Schedule: {medicine.schedule}</span>
      </div>
    </div>
  ))}
</div></div></section> 
        <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">ALLERGIES</div><h3>Safety alerts</h3></div><Icon name="alertTriangle" size={20}/></div><div className="allergy-alert-list">{currentPatient.allergies.length ? currentPatient.allergies.map(a=><div key={a}><Icon name="alertTriangle" size={16}/><strong>{a}</strong></div>) : <div>No known allergies</div>}</div></section>
        <section className="workspace-card">
  <div className="workspace-card-head">
    <div>
      <div className="eyebrow">AYUSH HISTORY</div>
      <h3>AYUSH / Traditional Medicine</h3>
    </div>
    <Icon name="heart" size={20} />
  </div>

  <div className="workspace-list">
    <div>
      <span>System of medicine</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Previous AYUSH treatment</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Treatment / therapy</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Duration</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Practitioner / centre</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Notes</span>
      <strong>Clinician verification required.</strong>
    </div>
  </div>
</section>
        <section className="workspace-card workspace-wide">
  <div className="workspace-card-head">
    <div>
      <div className="eyebrow">REVIEW OF SYSTEMS</div>
      <h3>ROS — System Review</h3>
      <p>System-by-system review for clinician verification.</p>
    </div>
    <Icon name="clipboard" size={20} />
  </div>

  <div className="workspace-list">
    <div>
      <span>General</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Cardiovascular</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Respiratory</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Gastrointestinal</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Neurological</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Musculoskeletal</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Genitourinary</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Skin</span>
      <strong>Not recorded</strong>
    </div>
  </div>

  <div
    style={{
      marginTop: 14,
      padding: 12,
      borderRadius: 10,
      background: "#f8f9fc",
      fontSize: 12,
      color: "#667085",
    }}
  >
    ROS information requires clinician verification.
  </div>
</section>
      </div>}

      {tab === "timeline" && <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">MEDICAL TIMELINE</div><h3>Chronological records</h3><p>Visits, documents, investigations, procedures/surgeries and medication history.</p></div><Icon name="clock" size={20}/></div><div className="workspace-timeline">{currentPatient.history.map((h,i)=><div className="workspace-timeline-item" key={i}><span className="timeline-dot"/><div><strong>{h.title}</strong><span>{h.date}</span><p>{h.note}</p></div></div>)}<div className="workspace-timeline-item"><span className="timeline-dot"/><div><strong>Medication history</strong><span>Current</span><p>{currentPatient.medications.join(" · ")}</p></div></div><div className="workspace-timeline-item"><span className="timeline-dot"/><div><strong>Documents / investigations</strong><span>Patient record</span><p>Open the full record to review original uploaded documents.</p></div></div></div><button className="secondary-btn" onClick={() => navigate("patient")}>Open Full Patient Timeline</button></section>}

      {tab === "ai" && <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">AI SUMMARY REVIEW</div><h3>Structured AI-generated draft
        <div
  style={{
    marginTop: 8,
    padding: "9px 12px",
    borderRadius: 10,
    background: "#f4f7fb",
    border: "1px solid #e1e7ef",
    color: "#475467",
    fontSize: 10,
    fontWeight: 700,
  }}
>
  AI-assisted draft · Doctor review required before confirmation
</div></h3><p>Show → edit → confirm/accept or reject/request correction.</p></div><span className="workspace-status">{aiStatus}</span></div><div className="ai-draft-label"><Icon name="shield" size={16}/> Clearly labelled AI-generated draft · decision support only</div><textarea className="input textarea ai-review-text" value={aiDraft} onChange={e=>{setAiDraft(e.target.value);setAiStatus("Edited draft");}}/><div className="modal-actions"><button className="secondary-btn" onClick={()=>{setAiStatus("Correction requested");alert("Correction request recorded in this frontend demo.");}}>Reject / Request Correction</button><button className="primary-btn" onClick={()=>setAiStatus("Accepted by doctor")}>Confirm / Accept</button></div></section>}

      {tab === "investigations" && <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">INVESTIGATION DISPLAY</div><h3>Lab values</h3><p>Reference ranges, abnormal-value flags and original-document access.</p></div><Icon name="activity" size={20}/></div><div className="investigation-table"><div className="investigation-row investigation-head"><span>Lab value</span><span>Value</span><span>Reference</span><span>Status</span></div>{investigations.map(([a,b,c,d])=><div className={`investigation-row ${d !== "Normal" ? "abnormal" : ""}`} key={a}><span>{a}</span><strong>{b}</strong><span>{c}</span><span>{d}</span></div>)}</div><button className="secondary-btn" style={{marginTop:12}} onClick={()=>navigate("patient")}>Open Original Document</button></section>}

      {tab === "emergency" && <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">EMERGENCY ACCESS</div><h3>Protected critical information</h3><p>Emergency request, reason, critical-information view, status and visible access event.</p></div><Icon name="shield" size={20}/></div><div className="emergency-mini-grid"><div><span>Emergency status</span><strong>{emergencyStatus}</strong></div><div><span>Critical information</span><strong>{currentPatient.bloodType} · {currentPatient.allergies.join(", ") || "No known allergies"} · {currentPatient.medications.join(", ")}</strong></div></div><label className="form-label">Reason field</label><textarea className="input textarea" rows="3" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Why is emergency access required?"/><div className="modal-actions"><button className="secondary-btn" onClick={()=>navigate("emergency")}>Open Protected Emergency Page</button><button className="primary-btn" onClick={requestEmergency}>Request / Grant Demo Access</button></div><div className="access-event"><Icon name="checkCircle" size={17}/><div><strong>Access event visible</strong><span>{emergencyStatus === "Not requested" ? "No access event yet." : `Access event recorded for ${doctor?.name || "Doctor"}.`}</span></div></div></section>}
      <section className="workspace-card">
  <div className="workspace-card-head">
    <div>
      <div className="eyebrow">FAMILY / PERSONAL HISTORY</div>
      <h3>Family, Personal & Surgical History</h3>
    </div>
    <Icon name="users" size={20} />
  </div>

  <div className="workspace-list">
    <div>
      <span>Past Surgical History</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Family History</span>
      <strong>Not recorded</strong>
    </div>

    <div>
      <span>Personal History</span>
      <strong>Not recorded</strong>
    </div>
  </div>

  <div
    style={{
      marginTop: 14,
      padding: 12,
      borderRadius: 10,
      background: "#f8f9fc",
      fontSize: 12,
      color: "#667085",
    }}
  >
    History information requires clinician verification.
  </div>
</section>

      {tab === "consent" && <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">CONSENT UI</div><h3>Patient-controlled access</h3><p>Consent status, what data can be shared, purpose and revocation status.</p></div><Icon name="shield" size={20}/></div><div className="consent-grid"><div><span>Consent status</span><strong>{consent.active ? "Active" : "Revoked"}</strong></div><div><span>What can be shared</span><strong>Clinical record, reports & medications</strong></div><div><span>Purpose</span><strong>{consent.purpose}</strong></div><div><span>Revocation / expiry</span><strong>{consent.active ? consent.expiresAt : "Revoked"}</strong></div></div><div className="modal-actions"><button className="secondary-btn" onClick={()=>saveConsent(false)}>Revoke Consent</button><button className="primary-btn" onClick={()=>saveConsent(true)}>Grant / Restore Consent</button></div></section>}

      {tab === "notes" && <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">DOCTOR NOTES</div><h3>Consultation notes</h3><p>Add, save/update notes and keep timestamps in the frontend demo.</p></div><Icon name="edit" size={20}/></div><textarea className="input textarea" rows="6" value={note} onChange={e=>setNote(e.target.value)} placeholder="Add consultation notes, observations or follow-up instructions..."/>{savedNote && <div className="success-banner"><Icon name="checkCircle" size={17}/> Note saved locally with timestamp.</div>}<div className="modal-actions"><button className="primary-btn" onClick={saveNote}>Save / Update Note</button></div></section>}

      {tab === "integration" && <section className="workspace-card"><div className="workspace-card-head"><div><div className="eyebrow">INTEGRATION STATES</div><h3>System readiness</h3><p>Frontend status placeholders for backend/API/AI integration.</p></div><Icon name="activity" size={20}/></div><div className="integration-grid"><div><span>ABDM / FHIR status</span><strong>Frontend ready · API pending</strong></div><div><span>Submission status</span><strong>Demo data saved locally</strong></div><div><span>API errors</span><strong>None in frontend demo</strong></div><div><span>Loading / empty states</span><strong>Patient search and reports supported</strong></div></div></section>}
    </section>
  );
}

function DoctorDashboard({ doctor, navigate, openPatient }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(15 * 60);
const [showSessionWarning, setShowSessionWarning] = useState(false);
const [verifiedCases, setVerifiedCases] = useState({});

useEffect(() => {
  const timer = setInterval(() => {
    setSessionSeconds((seconds) => {
      if (seconds <= 1) {
        clearInterval(timer);
        localStorage.removeItem(DOCTOR_STORAGE);
        window.location.reload();
        return 0;
      }

      if (seconds <= 60) {
        setShowSessionWarning(true);
      }

      return seconds - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

const sessionMinutes = String(Math.floor(sessionSeconds / 60)).padStart(2, "0");
const sessionRemainingSeconds = String(sessionSeconds % 60).padStart(2, "0");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
const [pendingSync, setPendingSync] = useState(3);

useEffect(() => {
  const handleOnline = () => {
    setIsOnline(true);
    setPendingSync(0);
  };

  const handleOffline = () => {
    setIsOnline(false);
    setPendingSync(3);
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);
  const doctorTasks = [
  {
    title: "Reports awaiting review",
    count: 8,
    detail: "Laboratory and diagnostic reports",
    icon: "file",
  },
  {
    title: "Patients needing follow-up",
    count: 4,
    detail: "Follow-up actions due today",
    icon: "clock",
  },
  {
    title: "Pending referrals",
    count: 3,
    detail: "Referrals awaiting action",
    icon: "arrowRight",
  },
  {
    title: "Incomplete consultations",
    count: 2,
    detail: "Consultation notes still pending",
    icon: "edit",
  },
];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return demoPatients;

    return demoPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(q) ||
        patient.id.toLowerCase().includes(q)
    );
  }, [query]);

  function searchPatient() {
  if (!query.trim()) {
    return;
  }

  setIsSearching(true);

  setTimeout(() => {
    setIsSearching(false);

    if (filtered.length > 0) {
      openPatient(filtered[0]);
    }
  }, 700);
}

  return (
    <Layout
  title="Doctor Dashboard"
  current="dashboard"
  navigate={navigate}
  sessionSeconds={sessionSeconds}
>
      <main className="page-container">
        <div className="hero-grid">
          <section className="hero">
            <div className="eyebrow light">Arovia Doctor Portal</div>
            <h2>Good morning, {doctor?.name || "Doctor"} 👋</h2>
            <p>
              Manage patient records, reports and secure consultations from one
              simple workspace.
            </p>

            <div className="hero-actions">
              <button className="white-btn" onClick={() => openPatient(demoPatients[0])}>
                <Icon name="file" size={17} />
                Open Patient Record
              </button>

              <button className="white-btn" onClick={() => navigate("share")}>
                <Icon name="qr" size={17} />
                Scan Patient QR
              </button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-label">Patients under care</div>
                <div className="hero-stat-value">128</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-label">Flagged today</div>
                <div className="hero-stat-value">6</div>
              </div>
            </div>
          </section>

          <section className="overview-card">
            <div className="section-head">
              <div>
                <h2 className="section-title">Today's overview</h2>
                <p className="section-sub">Quick clinical activity.</p>
              </div>
              <div className="brand-mark">
                <Icon name="activity" size={20} />
              </div>
            </div>

            <div className="metric">
              <div>
                <div className="metric-label">Appointments</div>
                <div className="metric-value">14</div>
              </div>
              <Badge level="Routine" />
            </div>

            <div className="metric">
              <div>
                <div className="metric-label">Reports awaiting review</div>
                <div className="metric-value">8</div>
              </div>
              <Badge level="Medium" />
            </div>

            <div className="metric">
              <div>
                <div className="metric-label">Urgent patients</div>
                <div className="metric-value danger-text">2</div>
              </div>
              <Badge level="High" />
            </div>
          </section>
        </div>
        <section className="dashboard-section">
  <div className="search-card">
    <div className="section-head">
      <div>
        <div className="eyebrow">TODAY'S FOCUS</div>
        <h2 className="section-title">Doctor Focus Today</h2>
        <p className="section-sub">
          Quick view of the items that may need your attention first.
        </p>
      </div>
      <Icon name="activity" size={20} />
    </div>

    <div className="workspace-data-grid">
      <div className="workspace-data">
        <span>Reports awaiting review</span>
        <strong>8</strong>
      </div>

      <div className="workspace-data">
        <span>High-priority patients</span>
        <strong>2</strong>
      </div>

      <div className="workspace-data">
        <span>New patient cases</span>
        <strong>2</strong>
      </div>

      <div className="workspace-data">
        <span>AI summaries</span>
        <strong>Review required</strong>
      </div>
    </div>
  </div>
</section>

        <section className="dashboard-section">
          <div className="search-card">
            <div className="section-head">
              <div>
                <h2 className="section-title">Search Patient</h2>
                <p className="section-sub">
                  Search by patient name or Arovia ID.
                </p>
              </div>

              <button className="secondary-btn" onClick={() => navigate("share")}>
                <Icon name="qr" size={18} />
                Scan QR
              </button>
            </div>

            <div className="search-row">
              <div className="field-wrap">
                <span className="field-icon">
                  <Icon name="search" size={19} />
                </span>

                <input
                  className="input with-icon"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchPatient();
                  }}
                  placeholder="Enter patient ID or name"
                />
              </div>

              <button
  className="dark-btn"
  onClick={searchPatient}
  disabled={isSearching}
>
  {isSearching ? "Searching..." : "Search"}
</button>
            </div>
            {isSearching && (
  <div
    style={{
      marginTop: 14,
      padding: 12,
      borderRadius: 10,
      background: "#eef3ff",
      color: "#344054",
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    Searching patient records...
  </div>
)}

            {query && filtered.length === 0 && (
  <div
    style={{
      marginTop: 14,
      padding: 16,
      borderRadius: 12,
      background: "#f8fafc",
      textAlign: "center",
      color: "#667085",
      fontSize: 13,
    }}
  >
    <strong style={{ display: "block", marginBottom: 5 }}>
      No patient found
    </strong>
    Try searching with a different patient name or Arovia ID.
  </div>
)}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="search-card">

          </div>
        </section>
                {/* NEW PATIENT CASES */}
                <section className="dashboard-section">
  <div className="search-card">
    <div className="section-head">
      <div>
        <div className="eyebrow">CASE REVIEW</div>
        <h2 className="section-title">Doctor Case Overview</h2>
        <p className="section-sub">
          Quick view of patient cases waiting for clinical review.
        </p>
      </div>

      <Icon name="file" size={21} />
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
        marginTop: 14,
      }}
    >
      <div className="workspace-data">
        <span>New cases</span>
        <strong>2</strong>
      </div>

      <div className="workspace-data">
        <span>Needs verification</span>
        <strong>2</strong>
      </div>

      <div className="workspace-data">
        <span>Next action</span>
        <strong>Review patient record</strong>
      </div>
    </div>
  </div>
</section>
        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <h2 className="section-title">New Patient Cases</h2>
              <p className="section-sub">
                Patient cases submitted for doctor review.
              </p>
            </div>
          </div>

          <div className="search-card">
            {[
            {
  patientId: "ARV-001",
  patient: "Ravi Kumar",
  complaint: "Chest discomfort",
  duration: "3 days",
  submitted: "10 min ago",
  completeness: 82,
  missing: ["Allergy history", "Family history"],
},
              {
  patientId: "ARV-018",
  patient: "Sita Devi",
  complaint: "Diabetes follow-up",
  duration: "1 day",
  submitted: "25 min ago",
  completeness: 94,
  missing: ["Diet history"],
},
        
            ].map((caseItem, index) => (
              <div
                key={caseItem.patientId}
                style={{
                  padding: "16px 0",
            borderBottom:
                    index !== 1 ? "1px solid #e9edf3" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {caseItem.patient} · {caseItem.patientId}
                    </div>

                    <div
                      style={{
                        marginTop: 5,
                        color: "#344054",
                        fontSize: 13,
                      }}
                    >
                      Chief complaint: {caseItem.complaint}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        color: "#667085",
                        fontSize: 13,
                      }}
                    >
                      Duration: {caseItem.duration}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        color: "#98a2b3",
                        fontSize: 12,
                      }}
                    >
                      Submitted {caseItem.submitted}
                    </div>
                    <div
  style={{
    marginTop: 12,
    fontSize: 13,
    fontWeight: 700,
    color: caseItem.completeness < 90 ? "#b54708" : "#16794a",
  }}
>
  Case completeness: {caseItem.completeness}%
</div>

{caseItem.missing.length > 0 && (
  <div
    style={{
      marginTop: 6,
      fontSize: 12,
      color: "#667085",
    }}
  >
    Missing: {caseItem.missing.join(", ")}
  </div>
)}
<button
  type="button"
  onClick={() =>
    alert(
      `Request sent to ${caseItem.patient} for: ${caseItem.missing.join(", ")}`
    )
  }
  style={{
    marginTop: 10,
    border: "none",
    background: "transparent",
    padding: 0,
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  Request Missing Information →
</button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "#fff4e5",
                        color: "#b54708",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      NEW
                    </span>

                    <button
  type="button"
  className="secondary-btn"
  onClick={() => {
    setVerifiedCases((prev) => ({
      ...prev,
      [caseItem.patientId]: true,
    }));
  }}
>
  {verifiedCases[caseItem.patientId] ? "✓ Verified" : "Verify Case"}
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <h2 className="section-title">Doctor Task Queue</h2>
              <p className="section-sub">
                Clinical actions that may need your attention.
              </p>
            </div>
          </div>

          <div
            className="patients-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {[
  {
    title: "Reports awaiting review",
    count: 8,
    detail: "Laboratory and diagnostic reports",
    icon: "file",
    action: () => navigate("upload"),
  },
  {
    title: "Patients needing follow-up",
    count: 4,
    detail: "Follow-up actions due today",
    icon: "clock",
    action: () => openPatient(demoPatients[0]),
  },
  {
    title: "Pending referrals",
    count: 3,
    detail: "Referrals awaiting action",
    icon: "arrowRight",
    action: () => openPatient(demoPatients[2]),
  },
  {
    title: "Incomplete consultations",
    count: 2,
    detail: "Consultation notes still pending",
    icon: "edit",
    action: () => openPatient(demoPatients[0]),
  },
].map((task) => (
              <div
                key={task.title}
                className="patient-card"
                style={{
                  cursor: "default",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      display: "grid",
                      placeItems: "center",
                      background: "#eef3ff",
                    }}
                  >
                    <Icon name={task.icon} size={19} />
                  </div>

                  <strong
                    style={{
                      fontSize: 28,
                      lineHeight: 1,
                    }}
                  >
                    {task.count}
                  </strong>
                </div>

                <p className="patient-name">{task.title}</p>

                <div className="condition">
                  {task.detail}
                </div>

 <button
  type="button"
  onClick={() => navigate("upload")}
  style={{
    marginTop: 14,
    border: "none",
    background: "transparent",
    padding: 0,
    fontSize: 13,
    fontWeight: 600,
    color: "#4f46e5",
    cursor: "pointer",
  }}
></button>
  <button
  type="button"
  onClick={task.action}
  style={{
    marginTop: 14,
    border: "none",
    background: "transparent",
    padding: 0,
    fontSize: 13,
    fontWeight: 600,
    color: "#4f46e5",
    cursor: "pointer",
  }}
>
  Review task →
</button>
              </div>
            ))}
          </div>
</section>
                

        {/* RECENT ACTIVITY / AUDIT TRAIL */}
        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <h2 className="section-title">Recent Activity</h2>
              <p className="section-sub">
                Recent clinical and access activity for this doctor.
              </p>
            </div>
          </div>

          <div className="search-card">
            {[
              {
                action: "Patient record opened",
                patient: "Ravi Kumar · ARV-001",
                time: "2 min ago",
                icon: "user",
              },
              {
                action: "Investigation reviewed",
                patient: "Ravi Kumar · Troponin I",
                time: "8 min ago",
                icon: "file",
              },
              {
                action: "Consent status checked",
                patient: "Ravi Kumar · ARV-001",
                time: "15 min ago",
                icon: "shield",
              },
              {
                action: "Doctor note added",
                patient: "Ravi Kumar · ARV-001",
                time: "24 min ago",
                icon: "edit",
              },
              {
                action: "Emergency access reviewed",
                patient: "Lakshmi Bai · ARV-024",
                time: "41 min ago",
                icon: "alertTriangle",
              },
            ].map((item, index) => (
              <div
                key={`${item.action}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom:
                    index !== 4 ? "1px solid #e9edf3" : "none",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    background: "#eef3ff",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={item.icon} size={18} />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    {item.action}
                  </div>

                  <div
                    style={{
                      color: "#667085",
                      fontSize: 13,
                    }}
                  >
                    {item.patient}
                  </div>
                </div>

                <div
                  style={{
                    color: "#98a2b3",
                    fontSize: 12,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </section>
        
                

        {/* OFFLINE SYNC STATUS */}
        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <h2 className="section-title">Offline Sync Status</h2>
              <p className="section-sub">
                Monitor connectivity and pending changes.
              </p>
            </div>
          </div>

          <div className="search-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    background: isOnline ? "#eaf8ef" : "#fff4e5",
                  }}
                >
                  <Icon
                    name={isOnline ? "wifi" : "wifiOff"}
                    size={20}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {isOnline
                      ? "Connection restored"
                      : "Working offline"}
                  </div>

                  <div
                    style={{
                      color: "#667085",
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  >
                    {isOnline
                      ? pendingSync === 0
                        ? "All changes synchronized."
                        : `${pendingSync} changes waiting to sync.`
                      : `${pendingSync} changes waiting to sync.`}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  background: isOnline ? "#eaf8ef" : "#fff4e5",
                }}
              >
                {isOnline ? "ONLINE" : "OFFLINE"}
              </div>
            </div>
          </div>
        </section>
       
        

        {/* REFERRAL TRACKING */}
        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <h2 className="section-title">Referral Tracking</h2>
              <p className="section-sub">
                Track referred patients and follow-up status.
              </p>
            </div>
          </div>

          <div className="search-card">
          {[
  {
    patient: "Ravi Kumar · ARV-001",
    patientId: "ARV-001",
    referredTo: "Cardiology",
    reason: "Chest discomfort",
    status: "Pending",
    followUp: "18 Sep 2026",
  },
  {
    patient: "Lakshmi Bai · ARV-024",
    patientId: "ARV-024",
    referredTo: "General Medicine",
    reason: "Hypertension review",
    status: "Accepted",
    followUp: "20 Sep 2026",
  },
  {
    patient: "Sita Devi · ARV-018",
    patientId: "ARV-018",
    referredTo: "Diabetes Clinic",
    reason: "HbA1c follow-up",
    status: "Completed",
    followUp: "25 Sep 2026",
  },
].map((referral, index) => (
            
              <div
                key={`${referral.patient}-${index}`}
                style={{
                  padding: "16px 0",
                  borderBottom:
                    index !== 2 ? "1px solid #e9edf3" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {referral.patient}
                    </div>

                    <div
                      style={{
                        marginTop: 5,
                        color: "#667085",
                        fontSize: 13,
                      }}
                    >
                      Referred to: {referral.referredTo}
                    </div>

                    <div
                      style={{
                        marginTop: 3,
                        color: "#667085",
                        fontSize: 13,
                      }}
                    >
                      Reason: {referral.reason}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                  <button
  type="button"
  onClick={() => {
    const patient = demoPatients.find(
      (p) => p.id === referral.patientId
    );

    if (patient) {
      openPatient(patient);
    }
  }}
  style={{
    border: "none",
    fontSize: 12,
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: 999,
    background:
      referral.status === "Completed"
        ? "#eaf8ef"
        : referral.status === "Accepted"
        ? "#eef3ff"
        : "#fff4e5",
    cursor: "pointer",
  }}
>
  {referral.status}
</button>

                    <div
                      style={{
                        marginTop: 6,
                        color: "#667085",
                        fontSize: 12,
                      }}
                    >
                      Follow-up: {referral.followUp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXISTING APPOINTMENTS */}
        <section className="dashboard-section">

                </section>

        {/* MEDICATION SAFETY REVIEW */}
        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <h2 className="section-title">Medication Safety Review</h2>
              <p className="section-sub">
                Clinical decision support for medication review.
              </p>
            </div>
          </div>

          <div className="search-card">
            {[
  {
    patient: "Ravi Kumar · ARV-001",
    patientId: "ARV-001",
    medication: "Aspirin",
    issue: "No recorded medication conflict.",
    status: "Review",
    icon: "pill",
  },
  {
    patient: "Ravi Kumar · ARV-001",
    patientId: "ARV-001",
    medication: "Penicillin",
    issue: "Recorded allergy requires clinician review.",
    status: "Alert",
    icon: "alertTriangle",
  },
  {
    patient: "Sita Devi · ARV-018",
    patientId: "ARV-018",
    medication: "Metformin",
    issue: "Current medication listed in patient record.",
    status: "Review",
    icon: "pill",
  },
].map((item, index) => (
              <div
                key={`${item.patient}-${item.medication}-${index}`}
                style={{
                  padding: "16px 0",
                  borderBottom:
                    index !== 2 ? "1px solid #e9edf3" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      display: "grid",
                      placeItems: "center",
                      background:
                        item.status === "Alert"
                          ? "#fff4e5"
                          : "#eef3ff",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      name={item.icon}
                      size={19}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {item.patient}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: "#344054",
                      }}
                    >
                      Medication: {item.medication}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color:
                          item.status === "Alert"
                            ? "#b54708"
                            : "#667085",
                      }}
                    >
                      {item.issue}
                    </div>
                  </div>

                  <button
  type="button"
  onClick={() => {
    const patient = demoPatients.find(
      (p) => p.id === item.patientId
    );

    if (patient) {
      openPatient(patient);
    }
  }}
  style={{
    padding: "7px 10px",
    border: "none",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background:
      item.status === "Alert"
        ? "#fff4e5"
        : "#eef3ff",
    cursor: "pointer",
  }}
>
  {item.status}
</button>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 10,
              fontSize: 12,
              color: "#667085",
            }}
          >
            Decision support only — the clinician makes the final medication decision.
          </p>
        </section>

        {/* EXISTING APPOINTMENTS */}
        <section className="dashboard-section">

        </section>

        {/* EXISTING APPOINTMENTS */}

        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <h2 className="section-title">Appointments</h2>
              <p className="section-sub">
                Today’s scheduled patient consultations.
              </p>
            </div>
          </div>

          <div className="patients-grid appointment-grid">
            {[
              { patient: demoPatients[0], time: "10:00 AM", type: "Follow-up consultation" },
              { patient: demoPatients[1], time: "11:30 AM", type: "Clinical review" },
              { patient: demoPatients[2], time: "02:00 PM", type: "Routine check-up" },
            ].map(({ patient, time, type }) => (
              <button
                key={`${patient.id}-${time}`}
                className="patient-card appointment-card"
                onClick={() => openPatient(patient)}
              >
                <div className="patient-identity">
                  <div className="avatar">{initials(patient.name)}</div>
                  <div>
                    <p className="patient-name">{patient.name}</p>
                    <div className="patient-id">{patient.id}</div>
                  </div>
                </div>

                <div className="appointment-time">
                  <Icon name="clock" size={16} />
                  <strong>{time}</strong>
                </div>

                <div className="condition">{type}</div>

                <div className="appointment-open">
                  <span>Open Patient Brief</span>
                  <Icon name="arrowRight" size={15} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <DoctorClinicalWorkspace doctor={doctor} patient={demoPatients[0]} navigate={navigate} />
      </main>
    </Layout>
  );
}



function getPatientPreConsultation(patient) {
  const all = readStorage(PRECONSULTATION_STORAGE, {});
  const saved = all?.[patient.id];
  if (saved) return saved;

  if (patient.id === "ARV-001") {
    return {
      status: "Completed",
      currentComplaint: "Chest discomfort",
      duration: "2 days",
      severity: "6/10",
      pattern: "Intermittent",
      associatedSymptoms: "Breathlessness reported",
      previousSimilar: "No previous similar episode recorded",
      attentionFlag: "Potential red-flag symptoms reported — clinician review recommended.",
    };
  }

  return {
    status: "Not completed",
    currentComplaint: "",
    duration: "",
    severity: "",
    pattern: "",
    associatedSymptoms: "",
    previousSimilar: "",
    attentionFlag: "",
  };
}

function getPatientConsultations(patientId) {
  const all = readStorage(CONSULTATION_STORAGE, []);
  return Array.isArray(all) ? all.filter((item) => item.patientId === patientId) : [];
}

function getPatientConsent(patientId) {
  const all = readStorage(CONSENT_STORAGE, {});
  return all?.[patientId] || null;
}

function SmartDoctorAssistance({ patient, reports }) {
  const latestReport = reports
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];

  const reviewItems = [];
  if (patient.allergies.length) {
    reviewItems.push({
      icon: "alertTriangle",
      title: "Check allergy history",
      text: `Recorded allergy: ${patient.allergies.join(", ")}.`,
    });
  }
  if (patient.medications.length) {
    reviewItems.push({
      icon: "pill",
      title: "Review current medications",
      text: `${patient.medications.length} medication(s) are currently recorded.`,
    });
  }
  if (patient.urgency !== "Routine") {
    reviewItems.push({
      icon: "alertCircle",
      title: "Review priority status",
      text: `${patient.urgency} priority · ${patient.condition}.`,
    });
  }
  if (latestReport) {
    reviewItems.push({
      icon: "file",
      title: "Review latest document",
      text: `${latestReport.name} · ${formatDate(latestReport.date)}.`,
    });
  }

  const questions = [
    "What symptoms or concerns have changed since the last visit?",
    "Is the patient taking the current medications as prescribed?",
    "Are there any new allergies, reactions, or medication side effects?",
  ];

  return (
    <section className="card smart-assistance">
      <div className="section-head">
        <div>
          <div className="eyebrow">Doctor Support</div>
          <h2 className="section-title">Smart Visit Preparation</h2>
          <p className="section-sub">
            A quick record-based checklist to help prepare for the consultation.
          </p>
        </div>
        <div className="smart-icon">
          <Icon name="stethoscope" size={21} />
        </div>
      </div>

      <div className="support-notice">
        <Icon name="shield" size={16} />
        <span>Decision support only — this does not diagnose or replace clinical judgement.</span>
      </div>

      <div className="smart-columns">
        <div>
          <div className="smart-heading">Key things to review</div>
          <div className="smart-list">
            {reviewItems.map((item, index) => (
              <div className="smart-item" key={`${item.title}-${index}`}>
                <div className="smart-item-icon"><Icon name={item.icon} size={16} /></div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="smart-heading">Suggested questions</div>
          <div className="question-list">
            {questions.map((question, index) => (
              <div className="question-item" key={question}>
                <span>{index + 1}</span>
                <p>{question}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PatientRecord({ doctor, patient, navigate, openReferral }) {
  const caseBriefs = {
  "ARV-001": {
    complaint: "Chest discomfort",
    duration: "3 days",
    history: "Hypertension",
    symptom: "Breathlessness",
    missing: "Allergy history",
  },

  "ARV-018": {
    complaint: "Diabetes follow-up",
    duration: "1 day",
    history: "Type 2 diabetes",
    symptom: "Fatigue",
    missing: "Diet history",
  }
};


  const [patientLoadError, setPatientLoadError] = useState(false);
  const [lastUpdated] = useState(() => new Date());
  const currentPatient = patient || demoPatients[0];
  const [reports, setReports] = useState(getReports());
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showAllTimeline, setShowAllTimeline] = useState(false);
  const preConsultation = getPatientPreConsultation(currentPatient);
  const [consultations, setConsultations] = useState(() => getPatientConsultations(currentPatient.id));
  const patientConsent = getPatientConsent(currentPatient.id);

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  function saveVisitNote() {
    if (!note.trim()) return;
    alert("Visit note saved successfully.");
    setNote("");
    setShowNote(false);
  }

  const patientReports = reports
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const clinicalFlags = [];
  if (currentPatient.urgency === "High") {
    clinicalFlags.push({
      title: "High-priority patient",
      text: "Clinical review should be prioritised.",
      level: "high",
    });
  } else if (currentPatient.urgency === "Medium") {
    clinicalFlags.push({
      title: "Follow-up required",
      text: "Review the current care plan and recent symptoms.",
      level: "medium",
    });
  }
  if (currentPatient.allergies.length) {
    clinicalFlags.push({
      title: "Allergy alert",
      text: currentPatient.allergies.join(", "),
      level: "high",
    });
  }
  if (currentPatient.medications.length >= 2) {
    clinicalFlags.push({
      title: "Medication review",
      text: `${currentPatient.medications.length} current medications recorded.`,
      level: "medium",
    });
  }

  const timelineItems = [
    ...currentPatient.history.map((item, index) => ({
      key: `visit-${item.date}-${index}`,
      date: item.date,
      title: item.title,
      note: item.note,
      kind: "Visit",
    })),
    ...patientReports.map((report) => ({
      key: `report-${report.id}`,
      date: report.date,
      title: report.name,
      note: `${report.type} uploaded by ${report.doctor}.`,
      kind: "Report",
    })),
    ...(preConsultation.status === "Completed"
      ? [{
          key: `preconsult-${currentPatient.id}`,
          date: preConsultation.date || new Date().toISOString().slice(0, 10),
          title: "AI Pre-Consultation",
          note: `${preConsultation.currentComplaint || "Current concern recorded"} · ${preConsultation.status}.`,
          kind: "Pre-Consultation",
        }]
      : []),
    ...consultations.map((item) => ({
      key: item.id,
      date: item.date,
      title: "Consultation",
      note: `${item.doctor || "Doctor"} · ${item.assessment || item.notes || "Consultation completed."}`,
      kind: "Consultation",
    })),
  ].sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const visibleTimeline = showAllTimeline ? timelineItems : timelineItems.slice(0, 4);
  
  

  return (
    <Layout
      title="Patient Record"
      current="patient"
      navigate={navigate}
      onBack={() => navigate("dashboard")}
    >
      <main className="page-container">
        <section className="patient-banner">
          <div className="patient-banner-inner">
            {patientLoadError && (
  <div
    style={{
      marginBottom: 18,
      padding: 16,
      borderRadius: 12,
      background: "#fff4e5",
      border: "1px solid #f6d7a7",
    }}
  >
    <div
      style={{
        fontWeight: 700,
        fontSize: 15,
        marginBottom: 6,
      }}
    >
      Unable to load patient data
    </div>

    <div
      style={{
        fontSize: 13,
        color: "#667085",
        marginBottom: 12,
      }}
    >
      Please try again.
    </div>

    <button
      type="button"
      className="secondary-btn"
      onClick={() => setPatientLoadError(false)}
    >
      Retry
    </button>
  </div>
)}

  <div
  style={{
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    background: "#f8fafc",
    border: "1px solid #e4e7ec",
  }}
>
  <div
    style={{
      fontWeight: 700,
      fontSize: 13,
      marginBottom: 4,
    }}
  >
    Record status: Up to date
  </div>

  <div
    style={{
      fontSize: 12,
      color: "#667085",
    }}
  >
    Last updated:{" "}
    {lastUpdated.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    })}
  </div>
</div>

            <div className="patient-banner-left">
              <div className="avatar-xl">{initials(currentPatient.name)}</div>
              <div>
                <div className="banner-label">Patient ID: {currentPatient.id}</div>
                <h1 className="banner-name">{currentPatient.name}</h1>
                <div className="banner-meta">
                  {currentPatient.gender} · {currentPatient.age} years
                </div>
              </div>
            </div>

            <button className="white-btn" onClick={() => navigate("consultation")}>
              <Icon name="video" size={17} />
              Start Consultation
            </button>
          </div>

          <div className="banner-info-row">
            <div>
              <span>Blood Group</span>
              <strong>{currentPatient.bloodType}</strong>
            </div>
            <div>
              <span>Last Visit</span>
              <strong>{currentPatient.lastVisit}</strong>
            </div>
            <div className={`banner-urgency banner-urgency-${String(currentPatient.urgency || "Routine").toLowerCase()}`}>
              <span>Urgency</span>
              <div className="banner-urgency-value">
                <strong className="urgency-text">{currentPatient.urgency}</strong>
                <strong className="condition-text">{currentPatient.condition}</strong>
              </div>
            </div>
          </div>
        </section>
        <section className="workspace-card" style={{ marginTop: 20 }}>
  <div className="workspace-card-head">
    <div>
      <div className="eyebrow">PATIENT DETAILS</div>
      <h3>Patient information</h3>
      <p>Basic patient information for quick review.</p>
    </div>
    <Icon name="user" size={20} />
  </div>

  <div className="workspace-data-grid">
    {[
      ["Patient ID", currentPatient.id],
      ["Name", currentPatient.name],
      ["Address", currentPatient.address || "Not recorded"],
      ["Age", `${currentPatient.age} years`],
      ["Gender", currentPatient.gender],
      ["Religion", currentPatient.religion || "Not recorded"],
      ["Occupation / Work", currentPatient.occupation || "Not recorded"],
      ["Diet", currentPatient.diet || "Not recorded"],
      ["Blood group", currentPatient.bloodType],
      ["Last visit", currentPatient.lastVisit],
    ].map(([label, value]) => (
      <div className="workspace-data" key={label}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    ))}
  </div>
</section>
<section className="workspace-card">
  <div className="workspace-card-head">
    <div>
      <div className="eyebrow">CURRENT MEDICATIONS</div>
      <h3>Medicines</h3>
      <div
  style={{
    marginTop: 8,
    padding: "10px 12px",
    borderRadius: 10,
    background: "#f0f8f6",
    color: "#087f74",
    fontSize: 10,
    fontWeight: 700,
  }}
>
  {currentPatient.medications.length} medication(s) currently recorded
</div>
      <p>Currently recorded medications.</p>
    </div>
    <Icon name="pill" size={20} />
  </div>

  <div className="tag-list">
    {currentPatient.medications.map((medicine) => (
      <span className="clinical-tag" key={medicine}>
        <Icon name="pill" size={14} />
        {medicine}
      </span>
    ))}
  </div>
</section>
<section className="workspace-card">
  <div className="workspace-card-head">
    <div>
      <div className="eyebrow">ALLERGIES</div>
      <h3>Allergy information</h3>
      <div
  style={{
    marginTop: 8,
    padding: "10px 12px",
    borderRadius: 10,
    background: currentPatient.allergies.length
      ? "#fff4f2"
      : "#eef8f6",
    color: currentPatient.allergies.length
      ? "#a13d32"
      : "#087f74",
    fontSize: 10,
    fontWeight: 700,
  }}
>
  {currentPatient.allergies.length
    ? `${currentPatient.allergies.length} known allergy recorded · Review before prescribing`
    : "No known allergies recorded"}
</div>
      <p>Important allergy and safety information.</p>
    </div>
    <Icon name="alertTriangle" size={20} />
  </div>

  <div className="allergy-alert-list">
    {currentPatient.allergies.length ? (
      currentPatient.allergies.map((allergy) => (
        <div key={allergy}>
          <Icon name="alertTriangle" size={16} />
          <strong>{allergy}</strong>
        </div>
      ))
    ) : (
      <div>No known allergies</div>
    )}
  </div>
</section>
<section className="workspace-card" style={{ marginTop: 18 }}>
  <div className="workspace-card-head">
    <div>
      <div className="eyebrow">SAFETY ALERTS</div>
      <h3>Important clinical alerts</h3>
      <p>Key information the doctor should notice before consultation.</p>
    </div>
    <Icon name="alertTriangle" size={20} />
  </div>

  <div className="workspace-data-grid">
    <div className="workspace-data">
      <span>Allergies</span>
      <strong>
        {currentPatient.allergies.length
          ? currentPatient.allergies.join(", ")
          : "None known"}
      </strong>
    </div>

    <div className="workspace-data">
      <span>Priority</span>
      <strong>{currentPatient.urgency}</strong>
    </div>

    <div className="workspace-data">
      <span>Condition</span>
      <strong>{currentPatient.condition}</strong>
    </div>

    <div className="workspace-data">
      <span>Current medications</span>
      <strong>{currentPatient.medications.length} recorded</strong>
    </div>
  </div>
</section>


        <section className="patient-brief-card">
          <div className="brief-header">
            <div>
              <div className="eyebrow">PATIENT BRIEF</div>
              <h2 className="section-title">Understand the patient in seconds</h2>
              <p className="section-sub">
                A concise pre-consultation summary prepared from the patient record.
              </p>
            </div>
            <div className="brief-status">
              <Icon name={preConsultation.status === "Completed" ? "checkCircle" : "clock"} size={17} />
              {preConsultation.status === "Completed" ? "Pre-consultation completed" : "Pre-consultation pending"}
            </div>
          </div>

          <div className="brief-grid">
            <div className="brief-item brief-wide">
              <span>Current complaint</span>
              <strong>{preConsultation.currentComplaint || "No current complaint recorded"}</strong>
            </div>
            <div className="brief-item">
              <span>Duration</span>
              <strong>{preConsultation.duration || "—"}</strong>
            </div>
            <div className="brief-item">
              <span>Severity</span>
              <strong>{preConsultation.severity || "—"}</strong>
            </div>
            <div className="brief-item">
              <span>Pattern</span>
              <strong>{preConsultation.pattern || "—"}</strong>
            </div>
            <div className="brief-item brief-wide">
              <span>Associated symptoms</span>
              <strong>{preConsultation.associatedSymptoms || "None recorded"}</strong>
            </div>
            <div className="brief-item">
              <span>Relevant history</span>
              <strong>{currentPatient.history[0]?.title || "No recent history"}</strong>
            </div>
            <div className="brief-item">
              <span>Recent reports</span>
              <strong>{patientReports.length} document(s)</strong>
            </div>
          </div>

          <div className="brief-safety-row">
            <div className="brief-alert">
              <Icon name="alertTriangle" size={17} />
              <div>
                <strong>Attention flag</strong>
                <span>{preConsultation.attentionFlag || "No pre-consultation attention flag recorded."}</span>
              </div>
            </div>
            <div className="brief-access">
              <Icon name="shield" size={17} />
              <div>
                <strong>Patient-controlled access</strong>
                <span>
                  {patientConsent?.active
                    ? `Access granted by patient · expires ${patientConsent.expiresAt || "as configured"}`
                    : "No active sharing permission recorded in this prototype."}
                </span>
              </div>
            </div>
          </div>

          <div className="brief-footer">
            <span>Allergies: <strong>{currentPatient.allergies.length ? currentPatient.allergies.join(", ") : "None known"}</strong></span>
            <span>Medications: <strong>{currentPatient.medications.length ? currentPatient.medications.join(", ") : "None recorded"}</strong></span>
          </div>
        </section>

        <section className="clinical-snapshot">
          <div className="snapshot-head">
            <div>
              <div className="eyebrow">Clinical Snapshot</div>
              <h2 className="section-title">What the doctor should notice first</h2>
              <p className="section-sub">
                A quick, non-diagnostic summary generated from the record.
              </p>
            </div>
            <div className="snapshot-icon"><Icon name="activity" size={22} /></div>
          </div>

          <div className="snapshot-grid">
            <div className="snapshot-stat">
              <span>Condition</span>
              <strong>{currentPatient.condition}</strong>
            </div>
            <div className="snapshot-stat">
              <span>Last activity</span>
              <strong>{timelineItems[0]?.date || currentPatient.lastVisit}</strong>
            </div>
            <div className="snapshot-stat">
              <span>Documents</span>
              <strong>{patientReports.length}</strong>
            </div>
            <div className="snapshot-stat">
              <span>Medications</span>
              <strong>{currentPatient.medications.length}</strong>
            </div>
          </div>

          <div className="risk-section">
            <div className="risk-section-title">
              <Icon name="alertTriangle" size={17} />
              Risk Flags
            </div>
            <div className="risk-list">
              {clinicalFlags.length ? clinicalFlags.map((flag, index) => (
                <div className={`risk-flag risk-${flag.level}`} key={`${flag.title}-${index}`}>
                  <Icon name={flag.level === "high" ? "alertTriangle" : "alertCircle"} size={18} />
                  <div>
                    <strong>{flag.title}</strong>
                    <span>{flag.text}</span>
                  </div>
                </div>
              )) : (
                <div className="risk-flag risk-routine">
                  <Icon name="checkCircle" size={18} />
                  <div>
                    <strong>No active risk flags</strong>
                    <span>Nothing in this demo record is marked high priority.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <SmartDoctorAssistance patient={currentPatient} reports={patientReports} />

        <div className="offline-bar">
          <div className="offline-left">
            <div className={`connectivity-dot ${offlineMode ? "offline" : ""}`} />
            <div>
              <strong>{offlineMode ? "Low-Connectivity Mode" : "Connected Mode"}</strong>
              <span>
                {offlineMode
                  ? "Using locally available patient information. Changes can sync when connection returns."
                  : "Patient record is ready for normal online use."}
              </span>
            </div>
          </div>
          <button className="secondary-btn" onClick={() => setOfflineMode((value) => !value)}>
            <Icon name="activity" size={17} />
            {offlineMode ? "Go Online" : "Enable Offline"}
          </button>
        </div>

        <div className="record-grid">
          <div className="stack">
            <section className="card">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Patient Health Timeline</h2>
                  <p className="section-sub">Visits and uploaded reports in one chronological view.</p>
                  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
    marginTop: 14,
    marginBottom: 16,
  }}
>
  <div className="workspace-data">
    <span>Total Events</span>
    <strong>{timelineItems.length}</strong>
  </div>

  <div className="workspace-data">
    <span>Visits</span>
    <strong>{timelineItems.filter(item => item.kind === "Visit").length}</strong>
  </div>

  <div className="workspace-data">
    <span>Reports</span>
    <strong>{timelineItems.filter(item => item.kind === "Report").length}</strong>
  </div>

  <div className="workspace-data">
    <span>Consultations</span>
    <strong>{timelineItems.filter(item => item.kind === "Consultation").length}</strong>
  </div>
</div>
                </div>
                <Icon name="clock" size={22} />
              </div>

              <div className="timeline">
                {visibleTimeline.map((item) => (
                  <div className="timeline-item enhanced" key={item.key}>
                    <div className={`timeline-dot ${item.kind === "Report" ? "report-dot" : ""}`} />
                    <div className="timeline-content">
                      <div className="timeline-meta">
                        <span className="date-chip">{formatDate(item.date) || item.date}</span>
                        <span className="timeline-kind">{item.kind}</span>
                      </div>
                      <div className="history-title">{item.title}</div>
                      <p className="muted">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {timelineItems.length > 4 && (
                <button className="secondary-btn full" onClick={() => setShowAllTimeline((value) => !value)}>
                  {showAllTimeline ? "Show Less" : `View Full Timeline (${timelineItems.length})`}
                </button>
              )}
            </section>

            <section className="card">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Allergies & Medications</h2>
                  <p className="section-sub">Important information for safe treatment.</p>
                </div>
                <Icon name="pill" size={22} />
              </div>

              <div className="info-grid">
                <div className="info-box allergy-box">
                  <div className="info-label">Allergies</div>
                  {currentPatient.allergies.length ? currentPatient.allergies.map((item) => (
                    <div className="allergy-item" key={item}>
                      <Icon name="alertTriangle" size={16} />
                      {item}
                    </div>
                  )) : <div className="info-value">No known allergies</div>}
                </div>

                <div className="info-box">
                  <div className="info-label">Current medications</div>
                  {currentPatient.medications.map((item) => (
                    <div className="med-item" key={item}>
                      <Icon name="pill" size={15} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <div className="card">
  <h2 className="section-title">AI Case Brief</h2>

  <p className="section-sub">
    Structured summary from the patient's case-taking information.
  </p>

  <div style={{ marginTop: 16 }}>
    <strong>Chief complaint</strong>
    <div style={{ marginTop: 4, color: "#667085", fontSize: 13 }}>
    {patient?.id === "ARV-018" ? "Diabetes follow-up" : "Chest discomfort"}
    </div>
  </div>

  <div style={{ marginTop: 12 }}>
    <strong>Duration</strong>
    <div style={{ marginTop: 4, color: "#667085", fontSize: 13 }}>
      {patient?.id === "ARV-018" ? "1 day" : "3 days"}
    </div>
  </div>

  <div style={{ marginTop: 12 }}>
    <strong>Key history</strong>
    <div style={{ marginTop: 4, color: "#667085", fontSize: 13 }}>
      {patient?.id === "ARV-018" ? "Type 2 diabetes" : "Hypertension"}
    </div>
  </div>

  <div style={{ marginTop: 12 }}>
    <strong>Important symptom</strong>
    <div style={{ marginTop: 4, color: "#667085", fontSize: 13 }}>
      
    </div>
  </div>{patient?.id === "ARV-018" ? "Fatigue" : "Breathlessness"}

  <div style={{ marginTop: 12 }}>
    <strong>Missing information</strong>
    <div
      style={{
        marginTop: 4,
        color: "#b54708",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {patient?.id === "ARV-018" ? "Diet history" : "Allergy history"}
    </div>
  </div>

  <div
    style={{
      marginTop: 16,
      padding: 10,
      borderRadius: 10,
      background: "#eef3ff",
      color: "#344054",
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    AI-assisted clinical review — doctor verification required.
  </div>
</div>

            <section className="card">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Reports & Prescriptions</h2>
                  <p className="section-sub">Newest uploaded documents appear first.</p>
                </div>
                <button className="primary-btn" onClick={() => navigate("upload")}>
                  <Icon name="upload" size={17} />
                  Upload Report
                </button>
              </div>

              <div className="report-scroll">
                {patientReports.length > 0 ? (
                   patientReports.map((report) => (
                  <button className="report-card" key={report.id} onClick={() => setSelectedReport(report)}>
                    <div className="report-thumb">
                      {report.fileData && report.fileType?.startsWith("image/") ? (
                        <img src={report.fileData} alt={report.name} />
                      ) : <Icon name="file" size={42} />}
                    </div>
                    <div className="report-name">{report.name}</div>
                    <div className="report-type">{report.type}</div>
                    <div className="report-date">{formatDate(report.date)}</div>
                    <div className="doctor-tag">{report.doctor}</div>
                    <div className="facility-tag">{report.facility}</div>
                  </button>
                  ))
) : (
  <div
    style={{
      padding: 28,
      textAlign: "center",
      color: "#667085",
      background: "#f8fafc",
      borderRadius: 12,
    }}
  >
    <div
      style={{
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 6,
      }}
    >
      No reports available
    </div>

    <div style={{ fontSize: 13 }}>
      Reports uploaded for this patient will appear here.
    </div>
  </div>
)}
              </div>
            </section>
          </div>

          <div className="stack">
            <section className="card">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Add Visit Note</h2>
                  <p className="section-sub">Record a clinical observation.</p>
                </div>
                <Icon name="edit" size={21} />
              </div>

              {!showNote ? (
                <button className="dark-btn full" onClick={() => setShowNote(true)}>
                  <Icon name="edit" size={17} />
                  Add Visit Note
                </button>
              ) : (
                <div>
                  <textarea
                    className="input textarea"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter visit notes..."
                  />
                  <button className="primary-btn full" onClick={saveVisitNote}>
                    Save Visit Note
                  </button>
                </div>
              )}
            </section>

            <section className="card">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Patient Summary</h2>
                  <p className="section-sub">Quick details at a glance.</p>
                </div>
                <Icon name="activity" size={21} />
              </div>

              <div className="metric">
                <div>
                  <div className="metric-label">Patient ID</div>
                  <div className="metric-value small">{currentPatient.id}</div>
                </div>
              </div>
              <div className="metric">
                <div>
                  <div className="metric-label">Current condition</div>
                  <div className="metric-value small">{currentPatient.condition}</div>
                </div>
              </div>
              <div className="metric">
                <div>
                  <div className="metric-label">Emergency access</div>
                  <div className="metric-value small">Doctor-only protected</div>
                </div>
                <Icon name="shield" size={20} />
              </div>
            </section>

            <section className="card sync-card">
              <div className="sync-icon">
                <Icon name="activity" size={20} />
              </div>
              <div>
                <h3>Connectivity</h3>
                <p>{offlineMode ? "Offline-first view enabled." : "Last synchronized: 10 Sep 2026 · 6:30 PM"}</p>
                <span>{offlineMode ? "Local record available for viewing." : "Record available for offline viewing."}</span>
              </div>
            </section>
          </div>
        </div>
      </main>

      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="eyebrow">{selectedReport.type}</div>
                <h2 className="section-title">{selectedReport.name}</h2>
              </div>
              <button className="icon-btn" onClick={() => setSelectedReport(null)}>
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="modal-preview">
              {selectedReport.fileData && selectedReport.fileType?.startsWith("image/") ? (
                <img src={selectedReport.fileData} alt={selectedReport.name} />
              ) : (
                <div className="document-placeholder">
                  <Icon name="file" size={58} />
                  <strong>Document preview</strong>
                  <span>{selectedReport.type} · {formatDate(selectedReport.date)}</span>
                </div>
              )}
            </div>

            <div className="info-grid">
              <div className="info-box">
                <div className="info-label">Uploaded by</div>
                <div className="info-value">{selectedReport.doctor}</div>
              </div>
              <div className="info-box">
                <div className="info-label">Facility</div>
                <div className="info-value">{selectedReport.facility}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function UploadReport({ doctor, navigate }) {
  const [type, setType] = useState("Lab Report");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  function submit(e) {
    e.preventDefault();

    if (uploading) return;

    setUploading(true);

    const finish = (fileData = null, fileType = "") => {
      const newReport = {
        id: `report-${Date.now()}`,
        name: file?.name || `${type} - ${formatDate(date)}`,
        type,
        date,
        doctor: doctor?.name || "Doctor",
        facility: doctor?.facility || "Arovia Rural Health Centre",
        fileData,
        fileType,
      };

      const reports = getReports();
      saveReports([newReport, ...reports]);

      window.setTimeout(() => {
        setUploading(false);
        navigate("patient");
      }, 700);
    };

    if (!file) {
      finish();
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      finish(
        typeof reader.result === "string" ? reader.result : null,
        file.type || ""
      );
    };

    reader.onerror = () => finish();

    reader.readAsDataURL(file);
  }

  return (
    <Layout title="Upload Report" noNav onBack={() => navigate("patient")}>
      <main className="page-container narrow">
        <section className="card">
          <div className="login-icon">
            <Icon name="upload" size={25} />
          </div>

          <div className="eyebrow" style={{ marginTop: 18 }}>
            Patient Records
          </div>

          <h1 className="login-title compact">Upload Medical Report</h1>

          <p className="login-sub">
            Add a report or prescription to the patient record. New uploads
            appear at the top.
          </p>

          <form onSubmit={submit}>
            <label className="form-label">Report Type</label>
            <select
              className="input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Lab Report</option>
              <option>Prescription</option>
              <option>Scan</option>
              <option>Discharge Summary</option>
            </select>

            <label className="form-label">Report Date</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="form-label">Medical Document</label>
            <label className="file-input-label">
              <Icon name="upload" size={17} />
              {file ? file.name : "Choose file"}
              <input
                className="hidden-file"
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            <div className="metric upload-doctor">
              <div className="doctor-upload-info">
                <Icon name="hospital" size={21} />
                <div>
                  <div className="metric-label">Uploading doctor</div>
                  <strong>{doctor?.name || "Doctor"}</strong>
                  <span>{doctor?.facility || "Arovia Rural Health Centre"}</span>
                </div>
              </div>
            </div>

            <button className="primary-btn full" disabled={uploading}>
              <Icon name="upload" size={18} />
              {uploading ? "Uploading..." : "Upload Report"}
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
}

function Consultation({ doctor, patient, navigate }) {
  const currentPatient = patient || demoPatients[0];
  const [notes, setNotes] = useState("");
  const [assessment, setAssessment] = useState("");
  const [prescription, setPrescription] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saved, setSaved] = useState(false);

  function saveConsultation() {
    if (!notes.trim() && !assessment.trim() && !prescription.trim() && !followUp.trim()) {
      alert("Please enter at least one consultation detail.");
      return;
    }

    const existing = readStorage(CONSULTATION_STORAGE, []);
    const item = {
      id: `consult-${Date.now()}`,
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      doctor: doctor?.name || "Doctor",
      date: new Date().toISOString().slice(0, 10),
      notes: notes.trim(),
      assessment: assessment.trim(),
      prescription: prescription.trim(),
      followUp: followUp.trim(),
    };

    const next = Array.isArray(existing) ? [item, ...existing] : [item];

    try {
      localStorage.setItem(CONSULTATION_STORAGE, JSON.stringify(next));
    } catch {}

    setSaved(true);
  }

  return (
    <Layout title="Video Consultation" noNav onBack={() => navigate("patient")}>
      <main className="page-container">
        <div className="consultation-grid">
          <section className="card">
            <div className="section-head">
              <div>
                <div className="eyebrow">CONSULTATION</div>
                <h2 className="section-title">Secure Video Consultation</h2>
                <p className="section-sub">
                  Consultation with {currentPatient.name} · {currentPatient.id}
                </p>
              </div>
              <span className="badge badge-routine">
                <span className="status-dot" />
                Ready
              </span>
            </div>

            <div className="video-wrap">
              <iframe
                className="video-frame"
                title="Arovia consultation"
                src="https://meet.jit.si/swasthlink-demo-room"
                allow="camera; microphone; fullscreen; display-capture"
              />
            </div>
          </section>

          <section className="card consultation-form-card">
            <div className="section-head">
              <div>
                <div className="eyebrow">CLOSE THE LOOP</div>
                <h2 className="section-title">Complete Consultation</h2>
                <p className="section-sub">
                  Save the clinician's assessment so it becomes the newest Health Journey event.
                </p>
              </div>
              <Icon name="edit" size={21} />
            </div>

            <label className="form-label">Consultation Notes</label>
            <textarea
              className="input textarea"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record important observations from the consultation..."
            />

            <label className="form-label">Diagnosis / Assessment</label>
            <textarea
              className="input textarea"
              rows="3"
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Enter clinician assessment..."
            />

            <label className="form-label">Prescription / Medication</label>
            <textarea
              className="input textarea"
              rows="3"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter medication or prescription details..."
            />

            <label className="form-label">Follow-up Notes</label>
            <textarea
              className="input textarea"
              rows="3"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Enter follow-up plan..."
            />

            {saved && (
              <div className="success-banner">
                <Icon name="checkCircle" size={18} />
                Consultation saved to {currentPatient.name}'s Health Journey.
              </div>
            )}

            <div className="modal-actions">
              <button className="secondary-btn" onClick={() => navigate("patient")}>
                Return to Patient Record
              </button>
              <button className="primary-btn" onClick={saveConsultation}>
                <Icon name="checkCircle" size={17} />
                {saved ? "Saved" : "Save Consultation"}
              </button>
            </div>

            <div className="prototype-note">
              Prototype note: saved locally for the hackathon demo. It is not a production clinical database.
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

function ShareScan({ navigate, openPatient }) {
  const [active, setActive] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [scanStatus, setScanStatus] = useState("Ready to scan a patient QR code.");
  const html5ScannerRef = useRef(null);
  const videoRef = useRef(null);
  const detectorRef = useRef(null);
  const detectorTimerRef = useRef(null);
  const [cameraMode, setCameraMode] = useState("");

  const demoQr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAFyAQAAAADAX2ykAAACeUlEQVR4nO2bQW7bMBBF35QCvKSBHMBHoW5W5Ei9gXQUHyCAuDRA43chSpGcNkZQx5CKmWX8Fh8Y/Bl+ijHxlep/fAkH55133nnnnXf+b7zVaqC3BsgNwNWszdNv7RP1OP9gPkmSBoBYgHgxa/NB6giSJK3579bj/IP5XB1q7UdmNPZz9Tj/TXw6m5kdg/R6/EO7N6/f+Tt8LJDOdf9uQI/z/8JPgzcKyEB/HGTEi4k4YADLK5Ct6Xf+86r97UenBki/mgL5RZbOTeHWxFvT7/znNfZ34dD+VBAUIBa0du/29Dt/p8bwkwYAgtQBU0iaM9MUktRtTb/zd2oKt0HqxoaG2u6kUpkkaYzI3t+d8VN/Y4E0zHZWQRrC4n7D/btLfjGfJRXURYk0hDqaRxPHgvd3l/zSv/OaXXW1sDCx93dn/Go+T1N4Ma478P27Y/49HwnySzHiwPT9KBQjvjXqLRQ9R4/zj+VX8/ndtdNorict+f7dKb/IR9NArkerscldlHz/7pe/9e/i1LzIv0Pw/btrPp0Pgtxgdirzj6EmpY7ppLVV/c7f469Ws1A+SF2u7YZYsDZe7Jb/bj3OP4SfH2aEAvmIJV1NxIL608Xqh6V8xFL3DD3OP5ZH61rcdHTUrTuCvn/3y7+/n5x27dVIw9XmJCzfv3vmx6urAeznEDRt3TkTq2DtM/U4/2A+zy+cc1PfX/XHIHqz0cTu3/+D708XszZKpLPVM/Xr8erv2/fJNx/+kg+iNxCUhr5l9chua/qd/7xu308KwCAUS12QJV0biG8TtzX9zt+p6f4ZYA5E461VXH/u93y0Q978/7udd9555513/un8b0OX2CI73QtFAAAAAElFTkSuQmCC";

  function extractPatientId(rawValue = "") {
    const value = String(rawValue || "").trim();
    if (!value) return "";

    const idMatch = value.match(/ARV-\d{3}/i);
    return idMatch ? idMatch[0].toUpperCase() : value.toUpperCase();
  }

  function findPatient(id = patientId) {
    const value = extractPatientId(id);
    const match = demoPatients.find(
      (patient) => patient.id.toLowerCase() === value.toLowerCase()
    );

    if (match) {
      stopScanner();
      setPatientId(match.id);
      setScanStatus(`Patient found: ${match.name} · ${match.id}`);
      openPatient(match);
    } else {
      setScanStatus("Patient not found. Try ARV-001, ARV-018 or ARV-024.");
    }
  }

  async function loadQrLibrary() {
    return new Promise((resolve, reject) => {
      if (window.Html5Qrcode) {
        resolve(window.Html5Qrcode);
        return;
      }

      const existing = document.getElementById("arovia-html5-qrcode");
      if (existing) {
        const onLoad = () => resolve(window.Html5Qrcode);
        const onError = () => reject(new Error("QR scanner library could not be loaded."));
        existing.addEventListener("load", onLoad, { once: true });
        existing.addEventListener("error", onError, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.id = "arovia-html5-qrcode";
      script.src = "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";
      script.async = true;
      script.onload = () => resolve(window.Html5Qrcode);
      script.onerror = () => reject(new Error("QR scanner library could not be loaded."));
      document.body.appendChild(script);
    });
  }

  function handleDecodedValue(decodedText) {
    const raw = String(decodedText || "").trim();
    const extracted = extractPatientId(raw);
    setPatientId(extracted);

    const match = demoPatients.find(
      (patient) => patient.id.toLowerCase() === extracted.toLowerCase()
    );

    if (match) {
      setScanStatus(`QR recognized: ${match.name} · ${match.id}`);
      stopScanner();
      openPatient(match);
    } else {
      setScanStatus(`QR recognized (${raw}), but no matching patient was found.`);
    }
  }

  async function startNativeDetector() {
    if (!window.BarcodeDetector || !navigator.mediaDevices?.getUserMedia) return false;

    try {
      const supported = await window.BarcodeDetector.getSupportedFormats?.();
      if (Array.isArray(supported) && !supported.includes("qr_code")) return false;
    } catch (error) {
      // Continue — some browsers expose BarcodeDetector without getSupportedFormats.
    }

    const video = videoRef.current;
    if (!video) return false;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });

    video.srcObject = stream;
    await video.play();

    detectorRef.current = new window.BarcodeDetector({ formats: ["qr_code"] });
    setCameraMode("native");
    setScanStatus("Camera is active. Point it at the patient's QR code.");

    const scanFrame = async () => {
      if (!detectorRef.current || !videoRef.current || videoRef.current.readyState < 2) return;
      try {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes?.length) {
          handleDecodedValue(codes[0].rawValue);
          return;
        }
      } catch (error) {
        // Keep scanning.
      }
      detectorTimerRef.current = window.setTimeout(scanFrame, 180);
    };

    detectorTimerRef.current = window.setTimeout(scanFrame, 180);
    return true;
  }

  async function startFallbackScanner() {
    const Html5Qrcode = await loadQrLibrary();
    if (!Html5Qrcode) throw new Error("QR scanner is unavailable.");

    const container = document.getElementById("arovia-qr-reader");
    if (!container) throw new Error("Scanner container is not ready.");

    if (html5ScannerRef.current) {
      await stopScanner();
    }

    const scanner = new Html5Qrcode("arovia-qr-reader");
    html5ScannerRef.current = scanner;
    setCameraMode("html5");
    setScanStatus("Camera is active. Point it at the patient's QR code.");

    await scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 240, height: 240 },
        aspectRatio: 1,
      },
      (decodedText) => handleDecodedValue(decodedText),
      () => {}
    );
  }

  async function startScanner() {
    try {
      setScanStatus("Starting camera…");
      setActive(true);

      // Give React one frame to mount the live scanner container.
      await new Promise((resolve) => requestAnimationFrame(resolve));

      try {
        const nativeStarted = await startNativeDetector();
        if (nativeStarted) return;
      } catch (nativeError) {
        // Fall through to the HTML5 QR fallback.
        if (nativeError?.name === "NotAllowedError" || nativeError?.name === "PermissionDeniedError") {
          throw nativeError;
        }
      }

      await startFallbackScanner();
    } catch (error) {
      await stopScanner();
      setScanStatus(
        error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError"
          ? "Camera permission was blocked. Allow camera access and try again."
          : "Unable to start the camera. Make sure Chrome has camera permission and try again."
      );
    }
  }

  async function stopScanner() {
    if (detectorTimerRef.current) {
      window.clearTimeout(detectorTimerRef.current);
      detectorTimerRef.current = null;
    }

    detectorRef.current = null;

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    const scanner = html5ScannerRef.current;
    html5ScannerRef.current = null;

    if (scanner) {
      try {
        const state = scanner.getState?.();
        if (state === 2 || state === 3) {
          await scanner.stop();
        }
      } catch (error) {}
      try {
        scanner.clear();
      } catch (error) {}
    }

    setCameraMode("");
    setActive(false);
  }

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Layout title="Scan / Share" current="share" navigate={navigate}>
      <main className="page-container">
        <div className="hero-grid">
          <section className="card scan-card">
            <div className="login-icon centered">
              <Icon name="qr" size={29} />
            </div>

            <h2 className="login-title compact center">Scan Patient QR</h2>

            <p className="login-sub center">
              Use the browser camera to scan a patient's Arovia QR code and open their record instantly.
            </p>

            <div className={`scanner-box real-scanner ${active ? "scanner-running" : ""}`}>
              <div id="arovia-qr-reader" className={`qr-reader ${active && cameraMode === "html5" ? "qr-reader-visible" : ""}`}></div>
              <video
                ref={videoRef}
                className={`browser-camera-video ${active && cameraMode === "native" ? "visible" : ""}`}
                playsInline
                muted
                autoPlay
              />

              {!active && (
                <div className="demo-qr-panel">
                  <div className="demo-qr-label">
                    <Icon name="qr" size={16} />
                    DEMO PATIENT QR
                  </div>
                  <div className="demo-qr-frame">
                    <img src={demoQr} alt="Demo QR for Ravi Kumar ARV-001" className="demo-qr-image" />
                  </div>
                  <strong>Ravi Kumar · ARV-001</strong>
                  <span>Scan this demo QR with the browser camera.</span>
                </div>
              )}

              {active && (
                <div className="scanner-overlay">
                  <div className="scan-corners" />
                  <span>Place the patient's QR inside the square</span>
                </div>
              )}
            </div>

            <div className="scan-status">
              <span className={`status-dot ${active ? "live" : ""}`}></span>
              {scanStatus}
            </div>

            <button className="primary-btn" onClick={active ? stopScanner : startScanner}>
              <Icon name="camera" size={18} />
              {active ? "Stop Scanner" : "Open Camera Scanner"}
            </button>

            <button className="secondary-btn full demo-qr-open-btn" onClick={() => findPatient("ARV-001")}>
              <Icon name="qr" size={17} />
              Test Demo QR · Open Ravi Kumar
            </button>

            <div className="scan-help">
              <strong>Supported demo IDs</strong>
              <span>ARV-001 · ARV-018 · ARV-024</span>
            </div>
          </section>

          <section className="card">
            <h2 className="section-title">Manual Patient ID</h2>
            <p className="section-sub">
              Use this fallback when QR scanning is unavailable.
            </p>

            <input
              className="input"
              style={{ marginTop: 18 }}
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="ARV-001"
            />

            <button className="dark-btn full" onClick={() => findPatient()}>
              Open Patient Record
            </button>

            <div className="metric">
              <div>
                <div className="metric-label">Privacy</div>
                <div className="metric-value small">Secure doctor access</div>
              </div>
              <Icon name="shield" size={21} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

function DoctorProfile({ doctor, logout, navigate }) {
  return (
    <Layout title="Doctor Profile" current="profile" navigate={navigate}>
      <main className="page-container narrow">
        <section className="card">
          <div className="profile-head">
            <div className="avatar profile-avatar">{initials(doctor?.name)}</div>
            <div>
              <h2 className="section-title">{doctor?.name || "Doctor"}</h2>
              <p className="section-sub">{doctor?.email || "doctor@example.com"}</p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <div className="info-label">Facility</div>
              <div className="info-value">
                {doctor?.facility || "Arovia Rural Health Centre"}
              </div>
            </div>

            <div className="info-box">
              <div className="info-label">Access level</div>
              <div className="info-value">Healthcare personnel</div>
            </div>
          </div>

          <div className="profile-feature">
            <Icon name="shield" size={19} />
            Registered healthcare personnel
          </div>

          <button className="danger-btn full" onClick={logout}>
            <Icon name="logout" size={17} />
            Logout
          </button>
        </section>
      </main>
    </Layout>
  );
}

function EmergencyPage({ doctor, goToLogin }) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [offlineReady, setOfflineReady] = useState(true);
  const [accessCount, setAccessCount] = useState(1);

  const reports = getReports()
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 5);

  const emergencyPatient = demoPatients[0];

  function unlock() {
    if (pin === "2468") {
      setUnlocked(true);
      setAccessCount((count) => count + 1);
    } else {
      alert("Incorrect PIN. Demo PIN: 2468");
    }
  }

  function openEmergencyReport(report) {
    setSelectedReport(report);
    setAccessCount((count) => count + 1);
  }

  if (!doctor) {
    return (
      <div className="emergency-page">
        <div className="emergency-bar">
          <div className="emergency-inner">
            <div className="brand-stack">
              <div className="emergency-brand">
                <Icon name="shield" size={21} />
              </div>
              <div className="title-wrap">
                <div className="eyebrow emergency-eyebrow">Arovia</div>
                <div className="top-title">Emergency Access</div>
              </div>
            </div>
            <span className="badge badge-high">
              <Icon name="lock" size={13} />
              Restricted
            </span>
          </div>
        </div>

        <main className="emergency-main narrow">
          <section className="login-required-card">
            <div className="emergency-login-icon">
              <Icon name="shield" size={29} />
            </div>
            <div className="eyebrow emergency-eyebrow" style={{ marginTop: 18 }}>
              Restricted Area
            </div>
            <h1 className="login-title emergency-title">Doctor login required</h1>
            <p className="login-sub">
              This emergency file is restricted to registered doctors and healthcare
              workers. Patient accounts cannot access it.
            </p>
            <button className="emergency-btn full" onClick={goToLogin}>
              Go to Doctor Login
              <Icon name="arrowRight" size={17} />
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="emergency-page">
      <div className="emergency-bar">
        <div className="emergency-inner">
          <div className="brand-stack">
            <div className="emergency-brand">
              <Icon name="shield" size={21} />
            </div>
            <div className="title-wrap">
              <div className="eyebrow emergency-eyebrow">Arovia</div>
              <div className="top-title">Emergency Access</div>
            </div>
          </div>

          <div className="emergency-top-status">
            <span className="badge badge-high">
              <Icon name="lock" size={13} />
              Doctor only
            </span>
            <span className="emergency-live">
              <span className="status-dot" />
              Protected
            </span>
          </div>
        </div>
      </div>

      <main className="emergency-main">
        {!unlocked ? (
          <>
            <section className="emergency-intro">
              <div className="emergency-kicker">FAST EMERGENCY ACCESS</div>
              <h1>Critical information, without the paperwork.</h1>
              <p>
                Unlock the minimum information a healthcare worker may need first:
                identity, blood type, allergies, medications and recent documents.
              </p>
            </section>

            <section className="login-required-card emergency-unlock-card">
              <div className="emergency-login-icon">
                <Icon name="lock" size={29} />
              </div>
              <h2 className="section-title" style={{ marginTop: 18 }}>
                Unlock emergency patient file
              </h2>
              <p className="login-sub">
                Enter the secure PIN assigned for this emergency file.
              </p>

              <label className="form-label">Emergency PIN</label>
              <input
                className="input emergency-pin"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                maxLength={4}
                placeholder="4-digit PIN"
              />

              <button className="emergency-btn full" onClick={unlock}>
                Unlock Emergency File
              </button>

              <div className="secure-note">
                <Icon name="shield" size={15} />
                Doctor identity and emergency access are logged.
              </div>
              <p className="demo-hint">Demo PIN: 2468</p>
            </section>
          </>
        ) : (
          <>
            <section className="emergency-intro unlocked">
              <div>
                <div className="emergency-kicker">EMERGENCY PATIENT FILE</div>
                <h1>{emergencyPatient.name}</h1>
                <p>
                  {emergencyPatient.gender} · {emergencyPatient.age} years ·{" "}
                  {emergencyPatient.id}
                </p>
              </div>
              <div className="emergency-unlocked-pill">
                <Icon name="checkCircle" size={16} />
                Access granted
              </div>
            </section>

            <div className="emergency-connectivity">
              <div>
                <div className="emergency-connect-title">
                  <Icon name="wifi" size={16} />
                  Emergency cache ready
                </div>
                <span>
                  {offlineReady
                    ? "Critical record is available even if connectivity drops."
                    : "Offline cache disabled for this demo."}
                </span>
              </div>
              <button
                className="emergency-cache-btn"
                onClick={() => setOfflineReady((value) => !value)}
              >
                {offlineReady ? "Cache Ready" : "Enable Cache"}
              </button>
            </div>

            <section className="emergency-critical-grid">
              <div className="critical-card blood">
                <div className="critical-card-top">
                  <span>Blood Type</span>
                  <Icon name="heart" size={18} />
                </div>
                <strong>{emergencyPatient.bloodType}</strong>
                <small>Check before transfusion decisions.</small>
              </div>

              <div className="critical-card allergy">
                <div className="critical-card-top">
                  <span>Allergy · RED FLAG</span>
                  <Icon name="alertTriangle" size={18} />
                </div>
                <strong>
                  {emergencyPatient.allergies.length
                    ? emergencyPatient.allergies.join(", ")
                    : "No known allergies"}
                </strong>
                <small>Review before prescribing medication.</small>
              </div>
            </section>

            <div className="emergency-grid">
              <section className="card emergency-med-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow">Current treatment</div>
                    <h2 className="section-title">Current Medications</h2>
                  </div>
                  <Icon name="pill" size={21} />
                </div>
                <div className="emergency-med-list">
                  {emergencyPatient.medications.map((medication) => (
                    <div key={medication}>
                      <Icon name="pill" size={17} />
                      {medication}
                    </div>
                  ))}
                </div>
              </section>

              <section className="card emergency-history-card">
                <div className="section-head">
                  <div>
                    <div className="eyebrow">Latest known status</div>
                    <h2 className="section-title">Recent Visit</h2>
                  </div>
                  <Icon name="history" size={21} />
                </div>
                <div className="emergency-history-main">
                  <strong>{emergencyPatient.history[0]?.title || "No recent visit"}</strong>
                  <span>{emergencyPatient.lastVisit}</span>
                  <p>{emergencyPatient.history[0]?.note || "No note available."}</p>
                </div>
              </section>
            </div>

            <section className="card">
              <div className="section-head">
                <div>
                  <div className="eyebrow">Recent clinical documents</div>
                  <h2 className="section-title">Reports & Prescriptions</h2>
                  <p className="section-sub">
                    Maximum 5 recent documents shown for rapid emergency review.
                  </p>
                </div>
                <span className="document-count">{reports.length} shown</span>
              </div>

              <div className="emergency-report-list">
                {reports.length ? reports.map((report) => (
                  <button
                    className="emergency-report"
                    key={report.id}
                    onClick={() => openEmergencyReport(report)}
                  >
                    <div className="mini-report-icon">
                      <Icon name="file" size={22} />
                    </div>
                    <div>
                      <strong>{report.name}</strong>
                      <span>
                        {report.type} · {formatDate(report.date)}
                      </span>
                      <small>
                        {report.doctor} · {report.facility}
                      </small>
                    </div>
                    <div className="report-view-label">
                      <Icon name="eye" size={15} />
                      View
                    </div>
                  </button>
                )) : (
                  <div className="empty-emergency">
                    No reports available in the emergency cache.
                  </div>
                )}
              </div>
            </section>

            <section className="emergency-access-log">
              <div className="access-log-icon">
                <Icon name="shield" size={18} />
              </div>
              <div>
                <strong>Emergency access logged</strong>
                <span>
                  Accessed by {doctor.name} · {doctor.facility} · {accessCount} protected action(s)
                </span>
              </div>
              <Badge level="Routine" />
            </section>
          </>
        )}
      </main>

      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="eyebrow emergency-eyebrow">{selectedReport.type}</div>
                <h2 className="section-title">{selectedReport.name}</h2>
              </div>
              <button className="icon-btn" onClick={() => setSelectedReport(null)}>
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="modal-preview">
              {selectedReport.fileData &&
              selectedReport.fileType?.startsWith("image/") ? (
                <img src={selectedReport.fileData} alt={selectedReport.name} />
              ) : (
                <div className="document-placeholder">
                  <Icon name="file" size={58} />
                  <strong>Document preview</strong>
                  <span>
                    {selectedReport.type} · {formatDate(selectedReport.date)}
                  </span>
                </div>
              )}
            </div>

            <div className="info-grid">
              <div className="info-box">
                <div className="info-label">Doctor</div>
                <div className="info-value">{selectedReport.doctor}</div>
              </div>
              <div className="info-box">
                <div className="info-label">Facility</div>
                <div className="info-value">{selectedReport.facility}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function styles() {
  return `
    * { box-sizing: border-box; }

    html, body, #root {
      margin: 0;
      min-height: 100%;
    }

    body {
      background: #f6f9fb;
      color: #172033;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    button, input, select, textarea { font: inherit; }
    button { -webkit-tap-highlight-color: transparent; }

    .arovia-app {
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(18,169,153,.07), transparent 30%),
        #f6f9fb;
    }

    .page-container {
      width: 100%;
      max-width: 1180px;
      margin: 0 auto;
      padding: 24px 18px 100px;
    }

    .page-container.narrow { max-width: 620px; }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(255,255,255,.94);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid #e6ebf0;
    }

    .topbar-inner {
      height: 68px;
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }

    .brand-stack {
      display: flex;
      align-items: center;
      gap: 11px;
      min-width: 0;
    }

    .brand-mark, .emergency-brand {
      width: 40px;
      height: 40px;
      border-radius: 13px;
      display: grid;
      place-items: center;
      color: white;
      background: #0c9f91;
      box-shadow: 0 8px 18px rgba(12,159,145,.20);
      flex: 0 0 auto;
    }

    .emergency-brand {
      background: #be123c;
      box-shadow: 0 8px 18px rgba(190,18,60,.18);
    }

    .doctor-mini {
      width: 40px;
      height: 40px;
      border-radius: 13px;
      display: grid;
      place-items: center;
      color: #0c9f91;
      background: #e9f8f5;
    }

    .title-wrap { min-width: 0; }
    .eyebrow {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .15em;
      font-weight: 900;
      color: #0c9f91;
    }

    .eyebrow.light { color: rgba(255,255,255,.75); }
    .top-title {
      font-size: 19px;
      font-weight: 900;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon-btn {
      border: 0;
      background: transparent;
      color: #59687a;
      width: 42px;
      height: 42px;
      border-radius: 13px;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: .18s ease;
    }

    .icon-btn:hover { background: #eef4f6; color: #0c9f91; }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      gap: 22px;
      align-items: stretch;
    }

    .hero {
      background: linear-gradient(135deg, #0a9e90, #0b8f83);
      color: #fff;
      border-radius: 28px;
      padding: 28px;
      box-shadow: 0 18px 40px rgba(12,159,145,.17);
      overflow: hidden;
      position: relative;
    }

    .hero:after {
      content: "";
      position: absolute;
      width: 230px;
      height: 230px;
      border-radius: 50%;
      right: -80px;
      top: -80px;
      background: rgba(255,255,255,.07);
    }

    .hero h2 {
      font-size: 31px;
      line-height: 1.08;
      letter-spacing: -.8px;
      margin: 12px 0 10px;
    }

    .hero p {
      max-width: 570px;
      color: rgba(255,255,255,.84);
      line-height: 1.7;
      margin: 0;
    }

    .hero-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 22px;
    }

    .white-btn {
      border: 0;
      background: white;
      color: #087f74;
      padding: 12px 16px;
      border-radius: 14px;
      font-weight: 900;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .white-btn:hover { background: #effcf9; }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap: 12px;
      margin-top: 24px;
    }

    .hero-stat {
      padding: 15px;
      border-radius: 18px;
      background: rgba(255,255,255,.10);
    }

    .hero-stat-label {
      font-size: 12px;
      color: rgba(255,255,255,.78);
      font-weight: 700;
    }

    .hero-stat-value {
      font-size: 23px;
      font-weight: 900;
      margin-top: 4px;
    }

    .overview-card, .card {
      background: #fff;
      border: 1px solid #e3e9ee;
      border-radius: 25px;
      padding: 21px;
      box-shadow: 0 8px 22px rgba(15,23,42,.045);
    }

    .overview-card { border-radius: 28px; padding: 25px; }

    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -.35px;
      margin: 0;
    }

    .section-sub {
      color: #748298;
      font-size: 13px;
      margin: 6px 0 0;
      line-height: 1.55;
    }

    .metric {
      margin-top: 14px;
      padding: 15px;
      border-radius: 18px;
      background: #f7fafb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .metric-label {
      color: #738197;
      font-size: 12px;
      font-weight: 700;
    }

    .metric-value {
      font-size: 21px;
      font-weight: 900;
      margin-top: 3px;
    }

    .metric-value.small { font-size: 14px; }
    .danger-text { color: #be123c; }

    .dashboard-section { margin-top: 26px; }

    .search-card {
      background: #fff;
      border: 1px solid #e5ebf0;
      border-radius: 24px;
      padding: 19px;
      box-shadow: 0 8px 22px rgba(15,23,42,.045);
    }

    .search-row {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    .field-wrap { position: relative; flex: 1; }
    .field-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #98a5b5;
      pointer-events: none;
    }

    .input {
      width: 100%;
      border: 1px solid #dfe6ec;
      background: #f9fbfc;
      color: #182336;
      border-radius: 16px;
      padding: 13px 14px;
      outline: none;
      transition: .18s ease;
    }

    .input:focus {
      border-color: #0c9f91;
      background: #fff;
      box-shadow: 0 0 0 4px rgba(12,159,145,.08);
    }

    .input.with-icon { padding-left: 44px; }

    .primary-btn, .secondary-btn, .dark-btn, .danger-btn, .emergency-btn {
      border-radius: 16px;
      padding: 13px 17px;
      font-weight: 900;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: .18s ease;
    }

    .primary-btn {
      border: 0;
      background: #0c9f91;
      color: #fff;
      box-shadow: 0 7px 18px rgba(12,159,145,.16);
    }

    .primary-btn:hover { background: #078f83; transform: translateY(-1px); }

    .secondary-btn {
      border: 1px solid #dfe7ea;
      background: #fff;
      color: #0c766d;
    }

    .secondary-btn:hover { background: #effaf8; }

    .dark-btn {
      border: 0;
      background: #172033;
      color: #fff;
    }

    .dark-btn:hover { transform: translateY(-1px); }

    .danger-btn {
      border: 1px solid #fecaca;
      background: #fff1f2;
      color: #be123c;
    }

    .full { width: 100%; }

    .patients-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 14px;
      margin-top: 16px;
    }

    .patient-card {
      border: 1px solid #e3e9ee;
      background: #fff;
      border-radius: 23px;
      padding: 18px;
      text-align: left;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(15,23,42,.04);
      transition: .18s ease;
    }

    .patient-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(15,23,42,.075);
      border-color: #d5e7e4;
    }

    .patient-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }

    .patient-identity {
      display: flex;
      gap: 11px;
      align-items: center;
      min-width: 0;
    }

    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 15px;
      background: #e9f8f5;
      color: #0c8e82;
      display: grid;
      place-items: center;
      font-weight: 900;
      flex: 0 0 auto;
    }

    .patient-name {
      font-size: 16px;
      font-weight: 900;
      margin: 0;
    }

    .patient-id {
      color: #8a98aa;
      font-size: 11px;
      font-weight: 800;
      margin-top: 3px;
    }

    .visit-line {
      display: flex;
      align-items: center;
      gap: 7px;
      color: #66768b;
      font-size: 13px;
      margin-top: 16px;
    }

    .condition {
      margin-top: 9px;
      color: #7d8b9e;
      font-size: 12px;
      font-weight: 700;
    }

    .appointment-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .appointment-open {
      margin-top: 13px;
      padding-top: 11px;
      border-top: 1px solid #edf1f3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      color: #0c8f83;
      font-size: 12px;
      font-weight: 900;
    }

    .appointment-open svg {
      flex: 0 0 auto;
    }

    .appointment-time {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 16px;
      color: #0c7f74;
      font-size: 13px;
    }

    .appointment-time strong {
      font-size: 14px;
      font-weight: 900;
    }


    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      padding: 6px 9px;
      font-size: 11px;
      font-weight: 900;
      white-space: nowrap;
    }

    .badge-high { background: #fff0f1; color: #be123c; border: 1px solid #ffd2d8; }
    .badge-medium { background: #fff8df; color: #9a6900; border: 1px solid #f8e6a7; }
    .badge-routine { background: #ebfaf3; color: #0c7a55; border: 1px solid #cbeedc; }

    .bottom-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 60;
      background: rgba(255,255,255,.96);
      backdrop-filter: blur(14px);
      border-top: 1px solid #e2e8ed;
    }

    .bottom-nav-inner {
      max-width: 760px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4,1fr);
    }

    .nav-item {
      border: 0;
      background: transparent;
      padding: 11px 6px 10px;
      min-height: 65px;
      color: #95a3b3;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 900;
    }

    .nav-item:hover, .nav-item.active { color: #0c9f91; }

    .record-grid {
      display: grid;
      grid-template-columns: 1.35fr .65fr;
      gap: 18px;
      margin-top: 18px;
    }

    .stack { display: grid; gap: 18px; }

    .patient-banner {
      background: linear-gradient(135deg,#0c9f91,#0b8f83);
      color: #fff;
      border-radius: 27px;
      padding: 22px;
      box-shadow: 0 15px 30px rgba(12,159,145,.14);
    }

    .patient-banner-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }

    .patient-banner-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .avatar-xl {
      width: 64px;
      height: 64px;
      border-radius: 20px;
      background: rgba(255,255,255,.16);
      display: grid;
      place-items: center;
      font-weight: 900;
      font-size: 20px;
      flex: 0 0 auto;
    }

    .banner-label {
      font-size: 11px;
      font-weight: 800;
      color: rgba(255,255,255,.72);
    }

    .banner-name {
      margin: 4px 0 0;
      font-size: 25px;
      font-weight: 900;
    }

    .banner-meta {
      margin-top: 4px;
      font-size: 13px;
      color: rgba(255,255,255,.8);
    }

    .banner-info-row {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 10px;
      margin-top: 18px;
    }

    .banner-info-row > div {
      padding: 12px;
      border-radius: 17px;
      background: rgba(255,255,255,.10);
    }

    .banner-info-row span {
      display: block;
      font-size: 10px;
      color: rgba(255,255,255,.70);
      font-weight: 800;
    }

    
    .banner-urgency {
      min-height: 66px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 7px;
    }

    .banner-urgency > span {
      display: block;
      font-size: 10px;
      color: rgba(255,255,255,.70);
      font-weight: 800;
    }

    .banner-urgency-value {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex-wrap: wrap;
    }

    .banner-urgency-value strong {
      display: block;
      margin: 0;
      font-size: 12px;
      color: rgba(255,255,255,.92);
      font-weight: 800;
      white-space: normal;
    }

    .banner-urgency .urgency-text {
      display: inline-flex;
      align-items: center;
      color: #ffffff;
      font-size: 15px;
      line-height: 1;
      font-weight: 900;
      letter-spacing: .01em;
    }

    .banner-urgency .condition-text {
      display: inline;
      color: rgba(255,255,255,.92);
      font-size: 12px;
      line-height: 1.35;
      font-weight: 800;
    }

.banner-info-row strong {
      display: block;
      margin-top: 4px;
      font-size: 14px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap: 12px;
      margin-top: 16px;
    }

    .info-box {
      background: #f8fafb;
      border-radius: 17px;
      padding: 14px;
    }

    .info-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: #91a0b1;
      font-weight: 900;
    }

    .info-value {
      margin-top: 4px;
      font-size: 14px;
      font-weight: 800;
      color: #283449;
      line-height: 1.5;
    }

    .allergy-box {
      background: #fff5f6;
      border: 1px solid #ffe0e4;
    }

    .allergy-item {
      display: flex;
      align-items: center;
      gap: 7px;
      color: #be123c;
      font-weight: 900;
      margin-top: 8px;
      font-size: 13px;
    }

    .med-item {
      display: flex;
      align-items: center;
      gap: 7px;
      color: #334155;
      font-weight: 800;
      margin-top: 8px;
      font-size: 13px;
    }

    .timeline {
      margin-top: 18px;
      position: relative;
      padding-left: 20px;
    }

    .timeline:before {
      content: "";
      position: absolute;
      left: 5px;
      top: 5px;
      bottom: 5px;
      width: 2px;
      background: #d9ece9;
    }

    .timeline-item {
      position: relative;
      display: flex;
      gap: 14px;
      padding-bottom: 20px;
    }

    .timeline-dot {
      position: absolute;
      left: -20px;
      top: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #0c9f91;
      box-shadow: 0 0 0 4px #e7f7f4;
    }

    .date-chip {
      font-size: 10px;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: #8a98aa;
      font-weight: 900;
    }

    .history-title { font-weight: 900; margin-top: 5px; }
    .muted { color: #738197; line-height: 1.6; font-size: 13px; }

    .report-scroll {
      margin-top: 17px;
      display: flex;
      gap: 13px;
      overflow-x: auto;
      padding-bottom: 6px;
    }

    .report-card {
      flex: 0 0 195px;
      border: 1px solid #e2e8ed;
      border-radius: 18px;
      background: #f8fafb;
      padding: 11px;
      cursor: pointer;
      text-align: left;
      transition: .18s ease;
    }

    .report-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(15,23,42,.07);
    }

    .report-thumb {
      height: 112px;
      border-radius: 13px;
      background: #fff;
      display: grid;
      place-items: center;
      overflow: hidden;
      color: #0c9f91;
    }

    .report-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .report-name {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 900;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .report-type { margin-top: 3px; font-size: 11px; font-weight: 800; color: #64748b; }
    .report-date { margin-top: 2px; font-size: 10px; color: #94a3b8; font-weight: 700; }
    .doctor-tag { margin-top: 7px; color: #0a8176; font-size: 10px; font-weight: 900; }
    .facility-tag { margin-top: 2px; color: #94a3b8; font-size: 9px; font-weight: 700; }

    .textarea { min-height: 150px; resize: vertical; margin-top: 16px; }
    .textarea + .primary-btn { margin-top: 10px; }

    .sync-card {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: #eefaf8;
      border-color: #cfece7;
    }

    .sync-icon {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: #d9f3ef;
      color: #0c8e82;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
    }

    .sync-card h3 { margin: 0; font-size: 14px; }
    .sync-card p { margin: 5px 0; color: #64748b; font-size: 11px; }
    .sync-card span { color: #0c7a55; font-size: 10px; font-weight: 900; }

    .login-page {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 26px 18px;
      background: radial-gradient(circle at top,#eaf9f6,#f6f9fb 55%);
    }

    .login-card {
      width: 100%;
      max-width: 450px;
      background: #fff;
      border: 1px solid #e2e9ee;
      border-radius: 29px;
      padding: 28px;
      box-shadow: 0 18px 50px rgba(15,23,42,.09);
    }

    .login-icon {
      width: 58px;
      height: 58px;
      border-radius: 18px;
      background: #e8f8f5;
      color: #0c9f91;
      display: grid;
      place-items: center;
    }

    .login-icon.centered { margin: 0 auto; }

    .login-title {
      margin: 20px 0 0;
      font-size: 30px;
      line-height: 1.1;
      font-weight: 950;
      letter-spacing: -.8px;
    }

    .login-title.compact { font-size: 26px; }
    .login-title.center { text-align: center; }
    .login-sub { margin-top: 8px; color: #768498; font-size: 13px; line-height: 1.6; }
    .login-sub.center { text-align: center; }

    .personnel-badge {
      margin-top: 15px;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 10px;
      border-radius: 999px;
      background: #f0f5f7;
      color: #5f6e80;
      font-size: 11px;
      font-weight: 900;
    }

    form { margin-top: 20px; }
    .form-label {
      display: block;
      color: #273449;
      font-size: 12px;
      font-weight: 900;
      margin: 15px 0 7px;
    }

    .error {
      margin-top: 13px;
      padding: 11px 12px;
      border-radius: 13px;
      background: #fff1f2;
      color: #be123c;
      font-size: 12px;
      font-weight: 800;
    }

    .demo-hint {
      margin: 12px 0 0;
      text-align: center;
      color: #9aa4b2;
      font-size: 11px;
      font-weight: 800;
    }

    .upload-doctor { margin-top: 16px; }
    .doctor-upload-info { display: flex; gap: 10px; align-items: center; }
    .doctor-upload-info strong { display: block; margin-top: 3px; }
    .doctor-upload-info span { display: block; color: #7a8797; font-size: 11px; margin-top: 2px; }

    .file-input-label {
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      border-radius: 14px;
      background: #eaf8f5;
      color: #087f74;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
    }

    .hidden-file { display: none; }

    .video-wrap {
      margin-top: 18px;
      overflow: hidden;
      border-radius: 23px;
      background: #07101f;
      box-shadow: 0 12px 28px rgba(15,23,42,.12);
    }

    .video-frame {
      width: 100%;
      aspect-ratio: 16/9;
      border: 0;
      display: block;
    }

    .scan-card { text-align: center; }

    .scanner-box {
      margin: 23px auto 0;
      max-width: 360px;
      height: 270px;
      border-radius: 22px;
      border: 2px dashed #bfe2dd;
      background: #effaf8;
      display: grid;
      place-items: center;
      color: #0c9f91;
    }

    .scanner-active {
      display: grid;
      place-items: center;
      gap: 8px;
      padding: 20px;
    }

    .scanner-active span {
      font-size: 12px;
      color: #52817d;
    }

    .real-scanner {
      position: relative;
      overflow: hidden;
      height: 300px;
      border-style: solid;
      border-color: #cfe8e3;
      background: #f2faf8;
    }

    .qr-reader {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: none;
      border: 0;
      background: #07101f;
    }

    .qr-reader-visible {
      display: block;
    }

    .qr-reader video {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      border-radius: 20px;
    }

    .browser-camera-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;
      background: #07101f;
    }

    .browser-camera-video.visible {
      display: block;
    }

    .demo-qr-panel {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 16px;
      color: #172033;
      background:
        radial-gradient(circle at 50% 22%, rgba(12,159,145,.08), transparent 38%),
        #f7fbfa;
    }

    .demo-qr-label {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #0c7f74;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .11em;
    }

    .demo-qr-frame {
      width: 168px;
      height: 168px;
      padding: 9px;
      border-radius: 16px;
      background: #fff;
      border: 1px solid #d7e8e4;
      box-shadow: 0 8px 18px rgba(15,23,42,.08);
      display: grid;
      place-items: center;
    }

    .demo-qr-image {
      width: 100%;
      height: 100%;
      display: block;
      image-rendering: pixelated;
    }

    .demo-qr-panel strong {
      font-size: 14px;
      font-weight: 900;
    }

    .demo-qr-panel > span {
      font-size: 11px;
      color: #728096;
      text-align: center;
    }

    .scanner-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 11px;
      color: white;
      pointer-events: none;
      text-shadow: 0 1px 2px rgba(0,0,0,.35);
    }

    .scan-corners {
      width: 220px;
      height: 220px;
      border: 3px solid rgba(255,255,255,.96);
      border-radius: 22px;
      box-shadow: 0 0 0 999px rgba(7,16,31,.17);
    }

    .scanner-overlay span {
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(7,16,31,.58);
      font-size: 11px;
      font-weight: 800;
    }

    .demo-qr-open-btn {
      margin-top: 10px;
    }

    .profile-head {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .profile-avatar {
      width: 60px;
      height: 60px;
      border-radius: 19px;
    }

    .profile-feature {
      margin-top: 17px;
      padding: 12px;
      border-radius: 15px;
      background: #eefaf8;
      color: #0c7a55;
      font-size: 12px;
      font-weight: 900;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
      background: rgba(15,23,42,.58);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
    }

    .modal {
      width: 100%;
      max-width: 760px;
      max-height: 90vh;
      overflow: auto;
      border-radius: 25px;
      background: #fff;
      padding: 19px;
      box-shadow: 0 28px 65px rgba(15,23,42,.28);
    }

    .modal-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 14px;
    }

    .modal-preview {
      margin-top: 16px;
      min-height: 280px;
      border-radius: 18px;
      background: #f6f8fa;
      display: grid;
      place-items: center;
      overflow: hidden;
      padding: 15px;
    }

    .modal-preview img {
      max-width: 100%;
      max-height: 52vh;
      object-fit: contain;
      border-radius: 12px;
    }

    .document-placeholder {
      display: grid;
      place-items: center;
      gap: 8px;
      color: #64748b;
    }

    .document-placeholder strong { color: #172033; }

    /* Emergency */
    .emergency-page {
      min-height: 100vh;
      background: #fff7f7;
      color: #172033;
    }

    .emergency-bar {
      border-bottom: 1px solid #fecaca;
      background: #fff;
    }

    .emergency-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .emergency-eyebrow { color: #be123c; }
    .emergency-main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 26px 18px 50px;
    }

    .emergency-main.narrow { max-width: 620px; }

    .login-required-card {
      width: 100%;
      max-width: 620px;
      background: #fff;
      border: 1px solid #fecdd3;
      border-radius: 27px;
      padding: 25px;
      box-shadow: 0 15px 35px rgba(190,18,60,.08);
    }

    .emergency-login-icon {
      width: 58px;
      height: 58px;
      border-radius: 18px;
      background: #fff1f2;
      color: #be123c;
      display: grid;
      place-items: center;
    }

    .emergency-title { color: #9f1239; font-size: 27px; }

    .emergency-btn {
      border: 0;
      background: #be123c;
      color: #fff;
      box-shadow: 0 7px 18px rgba(190,18,60,.14);
    }

    .emergency-btn:hover { background: #a90f36; }

    .emergency-pin {
      text-align: center;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: .55em;
      border-color: #fecdd3;
      background: #fff7f7;
    }

    .emergency-header {
      background: linear-gradient(135deg,#be123c,#9f1239);
      color: #fff;
      border-radius: 27px;
      padding: 23px;
      box-shadow: 0 15px 34px rgba(190,18,60,.15);
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }

    .emergency-header h1 {
      margin: 7px 0 0;
      font-size: 30px;
      font-weight: 950;
    }

    .emergency-label {
      font-size: 11px;
      color: rgba(255,255,255,.72);
      font-weight: 800;
    }

    .emergency-meta {
      margin-top: 5px;
      font-size: 12px;
      color: rgba(255,255,255,.78);
    }

    .emergency-grid {
      display: grid;
      grid-template-columns: .7fr 1.3fr;
      gap: 14px;
      margin-top: 15px;
    }

    .danger-card {
      background: #fff;
      border: 1px solid #fecdd3;
      border-radius: 22px;
      padding: 18px;
    }

    .danger-card.red { background: #fff1f2; }

    .danger-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: #9f1239;
      font-weight: 900;
    }

    .danger-value {
      margin-top: 7px;
      font-size: 34px;
      font-weight: 950;
      color: #172033;
    }

    .allergy-large {
      color: #be123c;
      font-size: 21px;
    }

    .emergency-med-card { margin-top: 15px; }

    .emergency-med-list {
      display: grid;
      gap: 9px;
      margin-top: 14px;
    }

    .emergency-med-list div {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      color: #334155;
    }

    .emergency-report-list {
      display: grid;
      gap: 10px;
      margin-top: 16px;
    }

    .emergency-report {
      width: 100%;
      border: 1px solid #e3e9ee;
      background: #f8fafb;
      border-radius: 17px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 11px;
      text-align: left;
      cursor: pointer;
    }

    .emergency-report:hover { background: #fff; border-color: #d5e7e4; }

    .mini-report-icon {
      width: 45px;
      height: 45px;
      border-radius: 13px;
      background: #fff;
      color: #be123c;
      display: grid;
      place-items: center;
      flex: 0 0 auto;
    }

    .emergency-report > div:nth-child(2) {
      flex: 1;
      min-width: 0;
    }

    .emergency-report strong {
      display: block;
      font-size: 13px;
    }

    .emergency-report span,
    .emergency-report small {
      display: block;
      margin-top: 3px;
      color: #64748b;
      font-size: 10px;
    }

    .access-logged {
      margin-top: 16px;
      padding: 13px 15px;
      border-radius: 15px;
      background: #fff;
      border: 1px solid #fecdd3;
      color: #9f1239;
      font-size: 11px;
      font-weight: 900;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #16a36e;
      display: inline-block;
    }

    @media (max-width: 900px) {
      .hero-grid, .record-grid { grid-template-columns: 1fr; }
      .patients-grid { grid-template-columns: repeat(2,1fr); }
    }

    @media (max-width: 640px) {
      .page-container { padding: 18px 14px 92px; }
      .topbar-inner { height: 62px; padding: 0 14px; }
      .hero { padding: 22px; border-radius: 24px; }
      .hero h2 { font-size: 27px; }
      .overview-card { padding: 20px; }
      .patients-grid { grid-template-columns: 1fr; }
      .search-row { flex-direction: column; }
      .search-row .dark-btn { width: 100%; }
      .patient-banner { border-radius: 23px; padding: 18px; }
      .patient-banner-inner { align-items: flex-start; flex-direction: column; }
      .patient-banner-inner .white-btn { width: 100%; }
      .banner-name { font-size: 22px; }
      .banner-info-row { grid-template-columns: 1fr 1fr; }
      .banner-info-row > div:last-child { grid-column: span 2; }
      .info-grid { grid-template-columns: 1fr; }
      .hero-actions .white-btn { width: 100%; }
      .hero-actions { display: grid; }
      .emergency-grid { grid-template-columns: 1fr; }
      .danger-value { font-size: 30px; }
      .emergency-header h1 { font-size: 25px; }
      .login-card { padding: 23px; }
    }
  `;
}




const clinicalWorkspaceStyles = `
  .clinical-workspace{margin-top:22px;background:linear-gradient(180deg,#ffffff,#f9fcfc);border:1px solid #dce8e7;border-radius:20px;padding:20px;box-shadow:0 10px 28px rgba(24,64,74,.06)}
  .workspace-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}
  .workspace-tabs{display:flex;gap:8px;overflow:auto;padding-bottom:10px;margin-bottom:16px;border-bottom:1px solid #e7eeee}
  .workspace-tab{border:1px solid #dce6e8;background:#fff;border-radius:999px;padding:9px 12px;font-size:10px;font-weight:800;color:#596976;white-space:nowrap;cursor:pointer}
  .workspace-tab.active{background:#087f74;color:#fff;border-color:#087f74}
  .workspace-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
  .workspace-card{background:#fff;border:1px solid #e0e9ea;border-radius:16px;padding:16px;margin-top:12px}
  .workspace-grid .workspace-card{margin-top:0}.workspace-wide{grid-column:1/-1}
  .workspace-card-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:13px}.workspace-card-head h3{margin:4px 0 0;font-size:16px;color:#18303d}.workspace-card-head p,.workspace-card>p{font-size:10px;color:#6d7b86;line-height:1.5;margin:5px 0 0}
  .workspace-data-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:9px}.workspace-data,.workspace-list>div,.emergency-mini-grid>div,.consent-grid>div,.integration-grid>div{padding:11px;border:1px solid #e5ecee;border-radius:12px;background:#fbfdfd}.workspace-data span,.workspace-list span,.emergency-mini-grid span,.consent-grid span,.integration-grid span{display:block;font-size:8px;text-transform:uppercase;letter-spacing:.07em;color:#7b8891;font-weight:800}.workspace-data strong,.workspace-list strong,.emergency-mini-grid strong,.consent-grid strong,.integration-grid strong{display:block;font-size:11px;color:#203442;margin-top:5px;line-height:1.4}.workspace-list{display:grid;gap:8px}.workspace-list p{font-size:9px;color:#64737e;line-height:1.4;margin:4px 0 0}.workspace-muted{font-size:10px;color:#5f6f7b;line-height:1.55}.tag-list{display:flex;flex-wrap:wrap;gap:7px}.clinical-tag{display:flex;align-items:center;gap:6px;border:1px solid #d7ebe8;background:#eff9f7;color:#087f74;border-radius:999px;padding:8px 10px;font-size:10px;font-weight:800}.allergy-alert-list{display:grid;gap:8px}.allergy-alert-list>div{display:flex;align-items:center;gap:8px;padding:10px;border-radius:11px;background:#fff4f2;border:1px solid #f1d8d3;color:#a13d32;font-size:10px}.workspace-timeline{display:grid;gap:0;margin:4px 0 16px}.workspace-timeline-item{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid #edf1f2}.workspace-timeline-item>div{flex:1}.workspace-timeline-item strong{display:block;font-size:12px;color:#203442}.workspace-timeline-item span:not(.timeline-dot){display:block;font-size:9px;color:#8a97a0;margin-top:3px}.workspace-timeline-item p{font-size:10px;color:#62717c;line-height:1.45;margin:5px 0 0}.workspace-status{padding:7px 10px;border-radius:999px;background:#eef8f6;color:#087f74;font-size:9px;font-weight:900}.ai-draft-label{display:flex;align-items:center;gap:6px;padding:9px 11px;background:#f6f9fa;border-radius:10px;color:#667580;font-size:9px;margin-bottom:9px}.ai-review-text{min-height:130px}.investigation-table{border:1px solid #e2eaec;border-radius:12px;overflow:hidden}.investigation-row{display:grid;grid-template-columns:1.2fr .9fr 1.1fr .9fr;gap:8px;padding:11px;border:0;border-bottom:1px solid #edf1f2;background:#fff;font-size:9px;color:#52636e}.investigation-row:last-child{border-bottom:0}.investigation-head{background:#f7fafb;font-size:8px;text-transform:uppercase;font-weight:900;color:#7a8790}.investigation-row.abnormal{background:#fff9f7}.investigation-row.abnormal span:last-child{color:#a13d32;font-weight:900}.emergency-mini-grid,.consent-grid,.integration-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;margin-bottom:12px}.access-event{display:flex;gap:8px;align-items:center;margin-top:12px;padding:11px;border-radius:12px;background:#eef8f6;border:1px solid #d5ebe7;color:#087f74}.access-event strong,.access-event span{display:block}.access-event strong{font-size:10px}.access-event span{font-size:9px;color:#5d6e77;margin-top:2px}.success-banner{font-size:10px}
  @media(max-width:800px){.workspace-grid{grid-template-columns:1fr}.workspace-wide{grid-column:auto}.workspace-data-grid{grid-template-columns:repeat(2,1fr)}.workspace-head{flex-direction:column}.workspace-head .primary-btn{width:100%}.investigation-row{grid-template-columns:1fr 1fr}}
  @media(max-width:520px){.clinical-workspace{padding:14px}.workspace-data-grid,.emergency-mini-grid,.consent-grid,.integration-grid{grid-template-columns:1fr}.investigation-row{grid-template-columns:1fr;gap:3px}.investigation-head{display:none}}
`;

const featureStyles = `
  .clinical-snapshot {
    margin: 22px 0;
    padding: 22px;
    border-radius: 24px;
    background: #ffffff;
    border: 1px solid #dcebe8;
    box-shadow: 0 12px 28px rgba(15, 50, 55, .06);
  }
  .snapshot-head {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    align-items: flex-start;
  }
  .snapshot-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: #0c9f91;
    background: #e9f8f5;
    flex: 0 0 auto;
  }
  .snapshot-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-top: 18px;
  }
  .snapshot-stat {
    padding: 14px;
    border-radius: 16px;
    background: #f6fafb;
    border: 1px solid #e7eef0;
  }
  .snapshot-stat span, .offline-left span {
    display: block;
    color: #718096;
    font-size: 11px;
    margin-bottom: 5px;
  }
  .snapshot-stat strong {
    font-size: 14px;
    line-height: 1.35;
  }
  .risk-section {
    margin-top: 18px;
    padding-top: 17px;
    border-top: 1px solid #edf1f3;
  }
  .risk-section-title {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 13px;
    font-weight: 900;
    margin-bottom: 10px;
  }
  .risk-list {
    display: grid;
    gap: 8px;
  }
  .risk-flag {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 11px 13px;
    border-radius: 14px;
    border: 1px solid #e5ecee;
  }
  .risk-flag strong, .risk-flag span {
    display: block;
  }
  .risk-flag strong { font-size: 12px; }
  .risk-flag span {
    margin-top: 2px;
    font-size: 11px;
    color: #64748b;
  }
  .risk-high { color: #be123c; background: #fff5f6; border-color: #fecdd3; }
  .risk-medium { color: #9a6700; background: #fffaf0; border-color: #f3dfae; }
  .risk-routine { color: #087f74; background: #f1fbf8; border-color: #cdeee7; }

  .offline-bar {
    margin: 0 0 22px;
    padding: 13px 15px;
    border-radius: 17px;
    background: #ffffff;
    border: 1px solid #dce8eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }
  .offline-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .offline-left strong { display: block; font-size: 12px; margin-bottom: 2px; }
  .connectivity-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #16a36e;
    box-shadow: 0 0 0 5px #e7f8f1;
    flex: 0 0 auto;
  }
  .connectivity-dot.offline {
    background: #d97706;
    box-shadow: 0 0 0 5px #fff3dc;
  }
  .timeline-item.enhanced { align-items: flex-start; }
  .timeline-content { min-width: 0; flex: 1; }
  .timeline-meta { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
  .timeline-kind {
    padding: 4px 7px;
    border-radius: 999px;
    background: #eef7f6;
    color: #0c8278;
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: .06em;
  }
  .report-dot { background: #5677c8 !important; box-shadow: 0 0 0 5px #edf1fb; }

  @media (max-width: 760px) {
    .snapshot-grid { grid-template-columns: repeat(2, 1fr); }
    .offline-bar { align-items: stretch; flex-direction: column; }
    .offline-bar .secondary-btn { width: 100%; }
  }
  @media (max-width: 460px) {
    .snapshot-grid { grid-template-columns: 1fr 1fr; }
    .clinical-snapshot { padding: 17px; border-radius: 20px; }
  }

  .smart-assistance {
    margin-bottom: 22px;
  }
  .smart-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: #0c9f91;
    background: #e9f8f5;
    flex: 0 0 auto;
  }
  .support-notice {
    margin: 16px 0;
    padding: 10px 12px;
    border-radius: 12px;
    background: #f3f8ff;
    border: 1px solid #dbe8f8;
    color: #3f5874;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 11px;
    line-height: 1.5;
  }
  .smart-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  .smart-heading {
    font-size: 12px;
    font-weight: 900;
    margin-bottom: 9px;
  }
  .smart-list, .question-list {
    display: grid;
    gap: 8px;
  }
  .smart-item {
    display: flex;
    gap: 9px;
    padding: 10px;
    border-radius: 13px;
    background: #f8fbfc;
    border: 1px solid #e7eef0;
  }
  .smart-item-icon {
    width: 29px;
    height: 29px;
    border-radius: 9px;
    display: grid;
    place-items: center;
    color: #0c9f91;
    background: #e9f8f5;
    flex: 0 0 auto;
  }
  .smart-item strong, .smart-item span {
    display: block;
  }
  .smart-item strong {
    font-size: 11px;
    margin-bottom: 2px;
  }
  .smart-item span {
    font-size: 10px;
    color: #64748b;
    line-height: 1.4;
  }
  .question-item {
    display: flex;
    gap: 9px;
    align-items: flex-start;
    padding: 10px;
    border-radius: 13px;
    background: #f8fbfc;
    border: 1px solid #e7eef0;
  }
  .question-item > span {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #0c9f91;
    color: white;
    font-size: 10px;
    font-weight: 900;
    flex: 0 0 auto;
  }
  .question-item p {
    margin: 2px 0 0;
    font-size: 10px;
    color: #526174;
    line-height: 1.45;
  }
  @media (max-width: 760px) {
    .smart-columns { grid-template-columns: 1fr; }
  }


  .emergency-top-status {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .emergency-live {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #0b806f;
    font-size: 10px;
    font-weight: 900;
  }
  .emergency-intro {
    margin: 6px 0 18px;
    max-width: 760px;
  }
  .emergency-intro h1 {
    margin: 7px 0;
    font-size: 31px;
    line-height: 1.1;
    letter-spacing: -.7px;
    color: #172033;
  }
  .emergency-intro p {
    margin: 0;
    color: #64748b;
    line-height: 1.6;
    font-size: 13px;
  }
  .emergency-kicker {
    color: #be123c;
    font-size: 10px;
    font-weight: 950;
    letter-spacing: .14em;
  }
  .emergency-unlock-card {
    max-width: 560px;
    margin: 0 auto;
  }
  .secure-note {
    margin-top: 13px;
    padding: 9px 11px;
    border-radius: 11px;
    background: #f8fafc;
    color: #66758a;
    display: flex;
    gap: 7px;
    align-items: flex-start;
    font-size: 10px;
    line-height: 1.4;
  }
  .emergency-intro.unlocked {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    padding: 4px 0;
  }
  .emergency-intro.unlocked h1 { margin: 5px 0 3px; }
  .emergency-unlocked-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 12px;
    border-radius: 999px;
    background: #eaf9f3;
    color: #087f74;
    font-size: 11px;
    font-weight: 900;
    white-space: nowrap;
  }
  .emergency-connectivity {
    margin: 12px 0 18px;
    padding: 12px 14px;
    border: 1px solid #d7e9e5;
    background: #f7fcfb;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .emergency-connect-title {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #087f74;
    font-size: 11px;
    font-weight: 900;
  }
  .emergency-connectivity span {
    display: block;
    margin-top: 3px;
    color: #6b7a89;
    font-size: 10px;
  }
  .emergency-cache-btn {
    border: 1px solid #cfe5e1;
    background: white;
    color: #087f74;
    border-radius: 10px;
    padding: 8px 11px;
    font-size: 10px;
    font-weight: 900;
    cursor: pointer;
  }
  .emergency-critical-grid {
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 14px;
    margin-bottom: 18px;
  }
  .critical-card {
    padding: 20px;
    border-radius: 20px;
    border: 1px solid;
  }
  .critical-card.blood {
    background: #fffafa;
    border-color: #f3d7d7;
  }
  .critical-card.allergy {
    background: #fff3f4;
    border-color: #f7bcc4;
    color: #9f1239;
  }
  .critical-card-top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: .08em;
  }
  .critical-card strong {
    display: block;
    margin: 8px 0 3px;
    font-size: 42px;
    line-height: 1;
    letter-spacing: -1px;
  }
  .critical-card.allergy strong { font-size: 24px; line-height: 1.15; }
  .critical-card small {
    color: #7c8795;
    font-size: 10px;
  }
  .emergency-history-main strong,
  .emergency-history-main span,
  .emergency-history-main p {
    display: block;
  }
  .emergency-history-main strong { font-size: 14px; }
  .emergency-history-main span {
    margin-top: 4px;
    color: #0c9f91;
    font-size: 10px;
    font-weight: 900;
  }
  .emergency-history-main p {
    margin: 10px 0 0;
    color: #66758a;
    font-size: 11px;
    line-height: 1.55;
  }
  .document-count {
    padding: 7px 9px;
    border-radius: 999px;
    background: #eef6f6;
    color: #087f74;
    font-size: 10px;
    font-weight: 900;
    white-space: nowrap;
  }
  .report-view-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #087f74;
    font-size: 9px;
    font-weight: 900;
  }
  .empty-emergency {
    padding: 20px;
    border: 1px dashed #d9e1e6;
    border-radius: 14px;
    color: #718096;
    text-align: center;
    font-size: 11px;
  }
  .emergency-access-log {
    margin-top: 18px;
    padding: 13px 15px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid #e1e8ed;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .access-log-icon {
    width: 35px;
    height: 35px;
    border-radius: 11px;
    display: grid;
    place-items: center;
    background: #eef7f6;
    color: #0c9f91;
    flex: 0 0 auto;
  }
  .emergency-access-log > div:nth-child(2) {
    min-width: 0;
    flex: 1;
  }
  .emergency-access-log strong,
  .emergency-access-log span {
    display: block;
  }
  .emergency-access-log strong { font-size: 11px; }
  .emergency-access-log span {
    margin-top: 2px;
    color: #718096;
    font-size: 9px;
  }
  @media (max-width: 760px) {
    .emergency-critical-grid { grid-template-columns: 1fr; }
    .emergency-intro.unlocked { align-items: flex-start; flex-direction: column; }
    .emergency-top-status .emergency-live { display: none; }
  }
  @media (max-width: 520px) {
    .critical-card strong { font-size: 36px; }
    .critical-card.allergy strong { font-size: 21px; }
    .emergency-connectivity { align-items: stretch; flex-direction: column; }
    .emergency-cache-btn { width: 100%; }
  }

.back-btn{border:0;background:transparent;color:#087f74;font-size:10px;font-weight:900;cursor:pointer;padding:0;margin-bottom:8px;display:flex;gap:5px;align-items:center}.referral-flow{display:flex;justify-content:space-around;align-items:center;padding:15px;margin-bottom:16px;border:1px solid #e2e8ed;border-radius:16px;background:#fff;color:#087f74;font-size:10px}.referral-patient-strip{display:flex;align-items:center;gap:10px;padding:12px;margin-bottom:16px;background:#f7fbfb;border:1px solid #dcecea;border-radius:15px}.referral-patient-strip div:nth-child(2){flex:1}.referral-patient-strip strong,.referral-patient-strip span{display:block}.referral-patient-strip span{font-size:9px;color:#718096;margin-top:2px}.avatar.large{width:38px;height:38px}.referral-item{width:100%;border:1px solid #e4eaee;background:#fff;border-radius:13px;padding:12px;display:flex;align-items:center;gap:10px;text-align:left;cursor:pointer;margin-bottom:8px}.referral-status-icon{width:35px;height:35px;border-radius:10px;display:grid;place-items:center;background:#eef7f6;color:#0c9f91}.referral-main{flex:1}.referral-main strong,.referral-main span,.referral-main small{display:block}.referral-main strong{font-size:12px}.referral-main span{font-size:10px;color:#536275;margin-top:3px}.referral-main small{font-size:9px;color:#8a97a5;margin-top:3px}.referral-benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:15px}.referral-benefits div{padding:13px;border:1px solid #e2e8ed;border-radius:14px;background:#fff}.referral-benefits svg{color:#0c9f91}.referral-benefits strong,.referral-benefits span{display:block}.referral-benefits strong{font-size:10px;margin-top:7px}.referral-benefits span{font-size:9px;color:#718096;margin-top:3px;line-height:1.4}.empty-referrals{text-align:center;padding:28px}.empty-referrals svg{color:#0c9f91}.textarea{width:100%;box-sizing:border-box;border:1px solid #dce4e9;border-radius:11px;padding:10px;font:inherit;font-size:11px;resize:vertical}.referral-modal{max-width:560px}.referral-record-btn{width:100%;margin-top:8px}.attachment-preview{margin-top:8px;padding:10px;border-radius:11px;background:#f7fcfb;color:#087f74;font-size:10px;display:flex;gap:7px;align-items:center}.referral-detail-status{padding:11px;border-radius:12px;background:#eef7f6;color:#087f74}.referral-detail-status strong,.referral-detail-status span{display:block}.referral-detail-status span{font-size:9px;margin-top:2px}@media(max-width:650px){.referral-benefits{grid-template-columns:1fr}.referral-flow{overflow:auto;gap:12px;justify-content:flex-start;white-space:nowrap}}
.patient-brief-card{background:#fff;border:1px solid #dce8e7;border-radius:18px;padding:20px;margin-bottom:18px;box-shadow:0 8px 22px rgba(24,64,74,.06)}
.brief-header{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}
.brief-status{display:flex;align-items:center;gap:7px;padding:8px 11px;border-radius:999px;background:#eef8f6;color:#087f74;font-size:10px;font-weight:800;white-space:nowrap}
.brief-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.brief-item{padding:12px;border:1px solid #e5ecee;border-radius:13px;background:#fbfdfd;min-width:0}
.brief-item span,.brief-item strong{display:block}
.brief-item span{font-size:9px;text-transform:uppercase;letter-spacing:.07em;color:#7a8792;font-weight:800}
.brief-item strong{font-size:12px;color:#162b3a;margin-top:5px;line-height:1.4}
.brief-wide{grid-column:span 2}
.brief-safety-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.brief-alert,.brief-access{display:flex;gap:9px;padding:12px;border-radius:13px}
.brief-alert{background:#fff5f3;border:1px solid #f2d7d2;color:#a33d32}
.brief-access{background:#eef8f6;border:1px solid #d5ebe7;color:#087f74}
.brief-alert strong,.brief-alert span,.brief-access strong,.brief-access span{display:block}
.brief-alert strong,.brief-access strong{font-size:10px}
.brief-alert span,.brief-access span{font-size:9px;line-height:1.45;margin-top:3px;color:#596976}
.brief-footer{display:flex;gap:18px;flex-wrap:wrap;border-top:1px solid #e9eeee;margin-top:13px;padding-top:12px;font-size:10px;color:#687783}
.brief-footer strong{color:#203342}
.consultation-grid{display:grid;grid-template-columns:1.25fr .9fr;gap:18px;align-items:start}
.consultation-form-card{position:relative}
.success-banner{display:flex;align-items:center;gap:8px;margin-top:12px;padding:11px 12px;border-radius:12px;background:#edf9f5;border:1px solid #d2eee5;color:#087f74;font-size:10px;font-weight:700}
.prototype-note{margin-top:12px;padding:10px;border-radius:10px;background:#f7f9fa;color:#77838d;font-size:9px;line-height:1.45}
@media(max-width:850px){.brief-grid{grid-template-columns:repeat(2,1fr)}.brief-safety-row,.consultation-grid{grid-template-columns:1fr}}
@media(max-width:520px){.brief-header{flex-direction:column}.brief-grid{grid-template-columns:1fr}.brief-wide{grid-column:span 1}.brief-footer{display:block}.brief-footer span{display:block;margin-top:6px}}

`;

function ReferralCoordination({ doctor, patient, onBack }) {
  const [referrals, setReferrals] = useState(() => { try { return JSON.parse(localStorage.getItem("arovia_referrals") || "[]"); } catch { return []; } });
  const [showForm, setShowForm] = useState(false);
  const [specialist, setSpecialist] = useState("General Medicine");
  const [facility, setFacility] = useState("District Telemedicine Unit");
  const [priority, setPriority] = useState("Medium");
  const [reason, setReason] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [selected, setSelected] = useState(null);
  const patientRefs = referrals.filter(r => r.patientId === patient.id);
  function createReferral(){
    if(!reason.trim()){ alert("Please enter a referral reason."); return; }
    const r={id:"REF-"+Date.now().toString().slice(-6),patientId:patient.id,patientName:patient.name,specialist,facility,priority,reason:reason.trim(),followUp:followUp||"To be scheduled",createdAt:new Date().toISOString().slice(0,10),status:"Pending specialist review",doctor:doctor.name,attachedReports:getReports().slice(0,3).map(x=>x.id)};
    const next=[r,...referrals]; localStorage.setItem("arovia_referrals",JSON.stringify(next)); setReferrals(next); setShowForm(false); setSelected(r); setReason(""); setFollowUp("");
  }
  function status(id,status){ const next=referrals.map(r=>r.id===id?{...r,status}:r); localStorage.setItem("arovia_referrals",JSON.stringify(next)); setReferrals(next); setSelected(next.find(r=>r.id===id)); }
  return <div className="page"><div className="page-head"><div><button className="back-btn" onClick={onBack}><Icon name="arrowLeft" size={16}/> Back to Patient Record</button><div className="eyebrow">CARE COORDINATION</div><h1 className="page-title">Referral & Care Coordination</h1><p className="page-sub">Connect {patient.name} with a specialist and keep follow-up connected.</p></div><button className="primary-btn" onClick={()=>setShowForm(true)}><Icon name="hospital" size={17}/> New Referral</button></div>
    <div className="referral-flow"><b>1 · Rural Doctor</b><span>→</span><b>2 · Specialist Review</b><span>→</span><b>3 · Follow-up</b></div>
    <div className="referral-patient-strip"><div className="avatar large">{patient.name[0]}</div><div><strong>{patient.name}</strong><span>{patient.id} · {patient.age} years · {patient.gender}</span></div><Badge level={patient.urgency}/></div>
    <section className="card"><div className="section-head"><div><div className="eyebrow">REFERRAL HISTORY</div><h2 className="section-title">Active care pathways</h2></div></div>{patientRefs.length?patientRefs.map(r=><button className="referral-item" key={r.id} onClick={()=>setSelected(r)}><div className="referral-status-icon"><Icon name="hospital" size={19}/></div><div className="referral-main"><strong>{r.specialist}</strong><span>{r.facility} · {r.priority} priority</span><small>{r.status} · Follow-up {r.followUp}</small></div><Icon name="arrowRight" size={17}/></button>):<div className="empty-referrals"><Icon name="hospital" size={28}/><h2 className="section-title">No referrals yet</h2><p className="section-sub">Create a referral and keep the specialist response connected to this patient.</p></div>}</section>
    <div className="referral-benefits"><div><Icon name="file" size={19}/><strong>Reports travel with referral</strong><span>Recent reports are attached automatically.</span></div><div><Icon name="clock" size={19}/><strong>Follow-up stays visible</strong><span>Keep the original doctor in the loop.</span></div><div><Icon name="shield" size={19}/><strong>Care pathway stays together</strong><span>Referral status remains linked to the patient.</span></div></div>
    {showForm&&<div className="modal-overlay" onClick={()=>setShowForm(false)}><div className="modal referral-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><div className="eyebrow">NEW REFERRAL</div><h2 className="section-title">Refer {patient.name}</h2></div><button className="icon-btn" onClick={()=>setShowForm(false)}><Icon name="x" size={20}/></button></div><label className="form-label">Specialist</label><select className="input" value={specialist} onChange={e=>setSpecialist(e.target.value)}><option>General Medicine</option><option>Cardiology</option><option>Dermatology</option><option>Paediatrics</option><option>Gynaecology</option><option>Orthopaedics</option><option>ENT</option></select><label className="form-label">Facility</label><select className="input" value={facility} onChange={e=>setFacility(e.target.value)}><option>District Telemedicine Unit</option><option>District Hospital</option><option>Community Health Centre</option><option>Specialist Referral Centre</option></select><label className="form-label">Priority</label><select className="input" value={priority} onChange={e=>setPriority(e.target.value)}><option>High</option><option>Medium</option><option>Routine</option></select><label className="form-label">Suggested Follow-up</label><input className="input" type="date" value={followUp} onChange={e=>setFollowUp(e.target.value)}/><label className="form-label">Reason for Referral</label><textarea className="textarea" rows="4" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Why is specialist review needed?"/><div className="attachment-preview"><Icon name="checkCircle" size={18}/><span>Up to 3 recent reports will be attached automatically.</span></div><div className="modal-actions"><button className="secondary-btn" onClick={()=>setShowForm(false)}>Cancel</button><button className="primary-btn" onClick={createReferral}>Create Referral</button></div></div></div>}
    {selected&&<div className="modal-overlay" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><div className="eyebrow">{selected.id}</div><h2 className="section-title">{selected.specialist}</h2></div><button className="icon-btn" onClick={()=>setSelected(null)}><Icon name="x" size={20}/></button></div><div className="referral-detail-status"><strong>{selected.status}</strong><span>{selected.facility}</span></div><div className="detail-block"><div className="info-label">Reason</div><p>{selected.reason}</p></div><div className="info-grid"><div className="info-box"><div className="info-label">Priority</div><div className="info-value">{selected.priority}</div></div><div className="info-box"><div className="info-label">Follow-up</div><div className="info-value">{selected.followUp}</div></div><div className="info-box"><div className="info-label">Reports attached</div><div className="info-value">{selected.attachedReports?.length||0}</div></div></div><div className="modal-actions"><button className="secondary-btn" onClick={()=>status(selected.id,"Accepted")}>Mark Accepted</button><button className="primary-btn" onClick={()=>status(selected.id,"Completed")}>Mark Completed</button></div></div></div>}
  </div>;
};


export default function App() {
  const [doctor, setDoctor] = useState(getDoctor);
  const [screen, setScreen] = useState(
    window.location.pathname === "/emergency"
      ? "emergency"
      : getDoctor()
        ? "dashboard"
        : "login"
  );
  const [selectedPatient, setSelectedPatient] = useState(demoPatients[0]);
  const [referralPatient, setReferralPatient] = useState(null);

  useEffect(() => {
    function handlePopState() {
      if (window.location.pathname === "/emergency") {
        setScreen("emergency");
      } else {
        setScreen(getDoctor() ? "dashboard" : "login");
      }
      setDoctor(getDoctor());
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(next) {
    if (next === "emergency") {
      window.history.pushState({}, "", "/emergency");
      setScreen("emergency");
      return;
    }

    if (window.location.pathname === "/emergency") {
      window.history.pushState({}, "", "/");
    }

    setScreen(next);
  }

  function openPatient(patient) {
    setSelectedPatient(patient || demoPatients[0]);
    setScreen("patient");
  }

  function handleLogin(nextDoctor) {
    setDoctor(nextDoctor);
    setScreen("dashboard");
  }

  function logout() {
    localStorage.removeItem(DOCTOR_STORAGE);
    setDoctor(null);
    window.history.pushState({}, "", "/");
    setScreen("login");
  }

  if (referralPatient) return <ReferralCoordination doctor={doctor} patient={referralPatient} onBack={()=>setReferralPatient(null)} />;

  return (
    <>
      <style>{styles()}</style>
      <style>{featureStyles}</style>
      <style>{clinicalWorkspaceStyles}</style>

      {screen === "emergency" ? (
        <EmergencyPage
          doctor={doctor}
          goToLogin={() => {
            window.history.pushState({}, "", "/");
            setScreen("login");
          }}
        />
      ) : !doctor ? (
        <DoctorLogin onLogin={handleLogin} />
      ) : screen === "dashboard" ? (
        <DoctorDashboard
          doctor={doctor}
          navigate={navigate}
          openPatient={openPatient}
        />
      ) : screen === "patient" ? (
        <PatientRecord
          doctor={doctor}
          patient={selectedPatient}
          navigate={navigate}
          openReferral={(p) => setReferralPatient(p)}
        />
      ) : screen === "upload" ? (
        <UploadReport doctor={doctor} navigate={navigate} />
      ) : screen === "consultation" ? (
        <Consultation
          doctor={doctor}
          patient={selectedPatient}
          navigate={navigate}
        />
      ) : screen === "share" ? (
        <ShareScan navigate={navigate} openPatient={openPatient} />
      ) : screen === "profile" ? (
        <DoctorProfile doctor={doctor} logout={logout} navigate={navigate} />
      ) : (
        <DoctorDashboard
          doctor={doctor}
          navigate={navigate}
          openPatient={openPatient}
        />
      )}
    </>
  );
};

