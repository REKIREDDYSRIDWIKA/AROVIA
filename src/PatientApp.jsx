import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { QRCodeCanvas } from "qrcode.react";
import "./PatientApp.css";


import {
  Mic,
  User,
  Stethoscope,
  HeartPulse,
  FileText,
  Pill,
  Plus,
  Activity,
  LogOut,
  ArrowLeft,
  QrCode,
  Hospital,
  ClipboardList,
  Search,
  AlertCircle,
  Volume2,
} from "lucide-react";
const translations = {
  en: {
    tagline: "Your health record, wherever you go",
    chooseLanguage: "Choose your language",
    searchPlaceholder: "Describe your symptoms or ask a question...",
    patient: "I'm a Patient",
    back: "Back",
    welcome: "Welcome back 👋",
    welcomeTo: "Welcome to AROVIA",
    patientLogin: "Patient Login",
    registrationTitle: "Create your AROVIA account",
registrationDescription: "Register once to start building your digital health record.",
fullName: "Full Name",
enterFullName: "Enter your full name",
abhaIdOptional: "ABHA ID",
optional: "optional",
enterAbhaNumber: "Enter 14-digit ABHA number",
abhaIntegrationNote:
  "ABHA linking is an integration step. This prototype records the entry point; live ABDM linking can be connected by the backend later.",
createAccount: "Create Account",
privateProtected: "Your health information is private and protected.",

aadhaarTitle: "Continue with Aadhaar",
aadhaarDescription:
  "Enter your 12-digit Aadhaar number to access your health records.",
aadhaarNumber: "Aadhaar Number",
aadhaarPlaceholder: "12-digit Aadhaar number",

abhaTitle: "Continue with ABHA",
abhaDescription:
  "Enter your 14-digit ABHA number to connect your health records.",
abhaNumber: "ABHA Number",
abhaPlaceholder: "14-digit ABHA number",

abdmFhirStatus: "ABDM / FHIR Integration Status",
abdmConnection: "ABDM Connection",
notConnected: "Not Connected",
fhirRecord: "FHIR Record",
readyForIntegration: "Ready for Integration",
submissionStatus: "Submission Status",
notSubmitted: "Not Submitted",
apiStatus: "API Status",
awaitingBackend: "Awaiting Backend",
continueButton: "Continue",
    accessRecords: "Access your health records",
    mobileNumber: "Mobile Number",
    enterMobile: "Enter 10-digit number",
    sendOTP: "Send OTP",
    demoMode: "Demo mode • No real SMS will be sent",
    privateInfo: "Your health information is private and protected.",
    verifyNumber: "Verify Your Number",
    otpSent: "Enter the 6-digit OTP sent to your mobile number",
    enterOTP: "Enter OTP",
    verifyOTP: "Verify OTP",
    demoOtp: "Demo OTP: 123456",
    invalidPhone: "Please enter a valid 10-digit mobile number.",
    incorrectOtp: "Incorrect OTP. Use 123456 for the demo.",
    
doctorNameLabel: "Doctor Name",
dateLabel: "Date",
diagnosisLabel: "Diagnosis",
notesLabel: "Notes",
hospitalPlaceholder: "Enter hospital or clinic name",
doctorPlaceholder: "Enter doctor's name",
diagnosisPlaceholder: "Enter diagnosis",
    medicalHistory: "Medical History",
    viewPreviousRecords: "View your previous medical records",
    diagnosis: "Diagnosis",
    notes: "Notes",
    noNotes: "No additional notes.",
    allergiesMedications: "Allergies & Medications",
    manageAllergies: "Keep track of your allergies and current medicines",
    allergies: "Allergies",
    noKnownAllergies: "No Known Allergies",
    noAllergiesAdded: "No allergies have been added",
    safe: "Safe",
    currentMedications: "Current Medications",
    add: "Add",
    addMedication: "Add Medication",
    medicineName: "Medicine Name",
    dosage: "Dosage",
    frequency: "Frequency",
    remove: "Remove",
    addedToRecord: "Added to your health record",
    requiredMedication: "Please fill all medication details.",
    addMedicationButton: "Add Medication",
    addRecord: "Add New Record",
    addRecordDescription: "Add your medical record using voice, camera, or manually",
    speakRecord: "Speak Record",
    tellVisit: "Tell us about your medical visit",
    listening: "Listening...",
    scanDocument: "Scan Document",
    scanDocumentDescription: "Take a photo of a prescription or report",
    voiceInput: "Voice Input",
    useThisInformation: "Use This Information",
    enterManually: "Enter Manually",
    recordType: "Record Type",
    hospitalClinic: "Hospital / Clinic",
    doctorName: "Doctor Name",
    date: "Date",
    enterHospital: "Enter hospital or clinic name",
    enterDoctor: "Enter doctor's name",
    enterDiagnosis: "Enter diagnosis",
    notesPlaceholder: "Add additional information...",
    saveMedicalRecord: "Save Medical Record",
    requiredRecord: "Please fill all required fields.",
    cameraTitle: "Scan Medical Document",
    documentInstruction: "Take a clear photo of a prescription, test report, or medical document.",
    medicalDocument: "Medical Document",
    extractAI: "Extract Information with AI",
    saveDocument: "Save Document",
    documentSaved: "Medical document uploaded",
    documentNote: "Document added using camera/file upload.",
    aiComing: "AI document extraction will be connected next.",
    healthID: "AROVIA Health ID",
    showHealthID: "Show this ID to a healthcare worker to access your record",
   
    aroviaHealthID: "AROVIA HEALTH ID",
    howItWorks: "How it works",
    healthIDDescription: "A healthcare worker can scan this code to identify the patient and access their authorized medical records.",
    demoQR: "Demo QR code for the hackathon prototype. A production version would connect this ID to a secure patient-record system.",
    symptomChecker: "Symptom Checker",
    healthJourney: "Health Journey",
    preConsultation: "Pre-Consultation",
    preConsultationDescription:
  "Tell us what you're experiencing before you meet a healthcare professional.",
  startSpeaking: "Start Speaking",
   continue: "Continue",
   typeYourResponse: "Type your response...",
   aroviaListening: "AROVIA is listening...",
  you: "You",
  done: "Done",
  recordGeneralConsultation: "General Consultation",
recordBloodTest: "Blood Test",
recordPrescription: "Prescription",
recordVaccination: "Vaccination",
recordOther: "Other",

hospitalClinicLabel: "Hospital / Clinic",
doctorNameLabel: "Doctor Name",
dateLabel: "Date",
diagnosisLabel: "Diagnosis",
notesLabel: "Notes",

hospitalPlaceholder: "Enter hospital or clinic name",
doctorPlaceholder: "Enter doctor's name",
diagnosisPlaceholder: "Enter diagnosis",

medicalDocument: "Medical Document",
remove: "Remove",
aiReadingDocument: "AI is reading your document...",
extractingMedicalInformation: "Extracting medical information",
aiExtractedInformation: "AI Extracted Information",
reviewBeforeSaving: "Please review the information before saving.",
saveMedicalRecord: "Save Medical Record",

voiceInput: "Voice Input",
useThisInformation: "Use This Information",
  preConsultationIntro:
  "Tell us what you're experiencing. You can speak or type your response.",

preConsultationDuration:
  "When did this problem start?",

preConsultationSeverity:
  "How severe is the problem from 1 to 10?",

preConsultationSymptoms:
  "Are you experiencing any other symptoms along with this?",

preConsultationHistory:
  "Do you have any relevant medical history related to this problem?",

preConsultationMedications:
  "Are you currently taking any medicines?",

preConsultationAllergies:
  "Do you have any known allergies?",
  preConsultationAssociatedSymptoms:
  "Are you experiencing any other symptoms along with your main problem?",

preConsultationFamilyHistory:
  "Is there any important family history of medical conditions such as diabetes, heart disease, high blood pressure, or other hereditary conditions?",
  preConsultationPersonalHistory:
  "Can you tell me about your personal history, such as smoking, alcohol use, occupation, lifestyle, or other relevant habits?",

preConsultationReviewOfSystems:
  "Are you experiencing any other symptoms involving your general health, heart, breathing, stomach, nervous system, or other body systems?",
  preConsultationRedFlags:
  "Safety check: Are you having severe breathing difficulty, severe chest pain, fainting, sudden weakness, seizures, or uncontrolled bleeding right now?",
  preConsultationHeadacheSymptoms:
  "Do you have nausea, vomiting, dizziness, vision changes, or weakness?",

preConsultationCoughSymptoms:
  "Do you have fever, breathing difficulty, chest pain, or blood in your cough?",

preConsultationFeverSymptoms:
  "Do you have chills, cough, sore throat, headache, body pain, vomiting, diarrhea, or difficulty breathing?",

preConsultationStomachSymptoms:
  "Do you have vomiting, diarrhea, fever, or blood in your stool or vomit?",

readAloud: "Read Aloud",


   yourHealthStory: "Your Health Story",
  latestHealthEvent: "Latest Health Event",
  viewDetails: "View Details",
  consultation: "Consultation",
  medication: "Medication",
  medicalReport: "Medical Report",
 diagnosisLabel: "Diagnosis",
 doctorLabel: "Doctor",
  hospitalClinicLabel: "Hospital / Clinic",
dateLabel: "Date",
notesLabel: "Notes",
relatedMedication: "Related Medication",
relatedReport: "Related Report",
closeDetails: "Close Details",

healthStoryText: (count) =>
  `Your health journey contains ${count} recorded healthcare events, including consultations, medications and medical reports.`,
    symptomDescription: "Describe your symptoms and get a basic health suggestion",
    whatFeeling: "What are you feeling?",
    symptomPlaceholder: "Example: I have fever, headache and body pain",
    checkSymptoms: "Check Symptoms",
    describeSymptoms: "Please describe your symptoms.",
    emergencyMessage: "Possible emergency symptoms detected. Please seek immediate medical attention.",
    feverMessage: "Your symptoms may need a medical consultation. Stay hydrated and consider speaking with a healthcare professional.",
    generalSymptomMessage: "Please consult a healthcare professional for a proper evaluation of your symptoms.",
    symptomWarning: "This is a demonstration feature and does not provide a medical diagnosis. For serious or worsening symptoms, contact a healthcare professional immediately.",
    profile: "Profile",
    privacyPermissions: "Privacy & Permissions",
    manageAccess: "Control what healthcare workers can access",
    medicalHistoryPermission: "Medical History",
    medicationsPermission: "Medications",
    allergiesPermission: "Allergies",
    labReportsPermission: "Lab Reports",
    prescriptionsPermission: "Prescriptions",
    emergencyAccessPermission: "Emergency Access",
    savePermissions: "Save Permissions",
    permissionSaved: "Your permissions have been saved.",
    manageAccount: "Manage your AROVIA account",
    patientName: "Patient Name",
    phoneNumber: "Phone Number",
    healthIdLabel: "Health ID",
    language: "Language",
    logout: "Logout",
    yourHealthRecord: "Your Health Record",
    allInOnePlace: "All in one place",
    records: "Records",
    lastVisit: "Last Visit",
    recent: "Recent",
    registeredMobile: "Registered mobile",
    yourHealth: "Your Health",
    previousRecordsShort: "View your previous records",
    manageMedicinesShort: "Manage your medicines",
    uploadReports: "Upload reports or prescriptions",
    checkYourSymptoms: "Check your symptoms",
    home: "Home",
    symptoms: "Symptoms",
    voiceUnsupported: "Voice input is not supported in this browser.",
    privateHealth: "AROVIA • Healthcare for everyone",
    symptomSelectSeverity: "Select severity",
symptomMild: "Mild",
symptomModerate: "Moderate",
symptomSevere: "Severe",
addSymptom: "Add Symptom",
summaryPatientDemographics: "Patient Demographics",
summaryPatientId: "Patient ID",
summaryNotAvailable: "Not available",
summaryAbhaId: "ABHA ID",
summaryNotLinked: "Not linked",
summaryMainConcern: "Main Concern",
summaryNotProvided: "Not provided",
summaryDuration: "Duration",
summarySeverity: "Severity",
summaryAssociatedSymptoms: "Associated Symptoms",

summaryAyushHistory: "AYUSH HISTORY",
summaryDashavidhaLifestyle: "Dashavidha Pariksha & Lifestyle",
summaryAyushAssessmentInfo: "Patient-provided AYUSH assessment information",

summaryPrakriti: "Prakriti",
summaryVikriti: "Vikriti",
summarySara: "Sara",
summarySamhanana: "Samhanana",
summaryPramana: "Pramana",
summarySatmya: "Satmya",
summarySattva: "Sattva",
summaryAharaShakti: "Ahara Shakti",
summaryVyayamaShakti: "Vyayama Shakti",
summaryVaya: "Vaya",
summaryAharaVihara: "Ahara & Vihara",

summaryAyushDisclaimer:
  "This information was provided by the patient during the optional AYUSH assessment. It should be reviewed by a qualified healthcare professional.",

summaryPastSurgicalHistory: "Past Surgical History",
summaryRelevantMedicalHistory: "Relevant Medical History",
summaryCurrentMedications: "Current Medications",
summaryKnownAllergies: "Known Allergies",
summaryFamilyHistory: "Family History",
summaryPersonalHistory: "Personal History",
summaryReviewOfSystems: "Review of Systems (ROS)",

summaryPatientDescription: "Patient's Description",
summaryHpi: "History of Present Illness (HPI)",
summaryChiefComplaint: "Chief Complaint",
summaryRelevantHistory: "Relevant History",
summarySafetyRedFlag: "Safety / Red-Flag Check",
summaryNotReported: "Not reported",

summaryEmergencyWarning:
  "Emergency symptoms reported — seek urgent medical attention and alert healthcare staff.",
  aiClinicalSummaryDraft: "AI-Generated Clinical Summary — Draft",
aiAssistedHistory: "AI-assisted history",
status: "Status",
draft: "Draft",
editing: "Editing",
confirmed: "Confirmed",
correctionRequested: "Correction Requested",
edit: "Edit",
acceptConfirm: "Accept / Confirm",
rejectCorrection: "Reject / Request Correction",
aiSummaryDisclaimer:
  "This is an AI-generated draft based on information provided by the patient. It is not a diagnosis and should be reviewed by a healthcare professional.",
  questionProgress: "Question",
ofText: "of",
answered: "Answered",
complete: "complete",
readAloud: "Read Aloud",
aroviaLabel: "AROVIA",

medicineNameUnknown: "Don't know the medicine name?",
medicinePhotoInstruction:
  "Take a photo of the medicine strip, package, or prescription.",
takePhotoUpload: "Take Photo / Upload",
emergencyBackDashboard: "Back to Dashboard",
emergencyAccessSettings: "Emergency Access Settings",
emergencyAccessDescription:
  "Manage access to your critical health information during emergencies.",
emergencyAccessLabel: "Emergency Access",
enabled: "Enabled",
emergencyCriticalInfo:
  "Critical health information can be accessed during an emergency.",
active: "Active",
criticalInfoAvailable: "Critical Information Available",
bloodGroup: "Blood Group",
notAvailable: "Not Available",
noKnownAllergies: "No known allergies",
medications: "Medications",
accessControl: "Access Control",
emergencyAccessIntended:
  "Emergency access is intended for urgent healthcare situations.",
disableEmergencyAccess: "Disable Emergency Access",
enableEmergencyAccess: "Enable Emergency Access",
currentStatus: "Current status",
recentAccessEvent: "Recent Access Event",
noEmergencyAccessEvent:
  "No emergency access event has been recorded.",
  ayushDashavidhaTitle: "AYUSH — Dashavidha Pariksha",
ayurvedicClinicalAssessment: "Ayurvedic clinical assessment",
question: "Question",

previous: "Previous",
next: "Next",

dontKnowMedicine: "Don't know the medicine name?",
medicinePhotoInstruction: "Take a photo of the medicine strip, package, or prescription.",
takePhotoUpload: "Take Photo / Upload",
investigationMedicalReport: "Investigation / Medical Report",
procedureSurgery: "Procedure / Surgery",
consultation: "Consultation",
editAyush: "Edit AYUSH",
    ayushHistory: "AYUSH History",
    ayushHistoryDescription: "Complete your AYUSH health assessment and Dashavidha Pariksha.",
    settings: "Settings",
    settingsDescription: "Manage your profile, health information, privacy and preferences.",
    personalMedicalInformation: "Personal & Medical Information",
    personalMedicalInformationDescription: "Manage your personal and medical information.",
    privacyConsent: "Privacy & Consent",
    privacyConsentDescription: "Manage your privacy, permissions and healthcare access.",
demographicsTitle: "Patient Demographics",
basicInformation: "Basic Information",
lifestyleSocialHistory: "Lifestyle & Social History",
personalBackground: "Personal Background",
menstrualHistoryTitle: "Menstrual History",
gynaecologicalHistoryTitle: "Gynaecological History",
obstetricHistoryTitle: "Obstetric History",
saveAndContinue: "Save & Continue",
fullNamePlaceholder: "Enter your full name",
agePlaceholder: "Age",
selectOption: "Select",
female: "Female",
male: "Male",
intersex: "Intersex",
preferNotToSay: "Prefer not to say",
occupationJob: "Occupation / Job",
occupationPlaceholder: "Student, teacher, farmer, engineer...",
dietLabel: "Diet",
selectDiet: "Select diet",
vegetarian: "Vegetarian",
nonVegetarian: "Non-vegetarian",
vegan: "Vegan",
other: "Other",
physicalActivityLabel: "Physical Activity",
selectActivityLevel: "Select activity level",
low: "Low",
moderate: "Moderate",
high: "High",
sleepLabel: "Sleep",
sleepPlaceholder: "Example: 7 hours, good quality",
alcoholUse: "Alcohol Use",
never: "Never",
occasional: "Occasional",
regular: "Regular",
tobaccoSmoking: "Tobacco / Smoking",
former: "Former",
otherSubstanceDrugUse: "Other Substance / Drug Use",
substanceUsePlaceholder: "Mention any relevant substance use, or write None.",
ethnicityLabel: "Ethnicity",
religionLabel: "Religion",
optional: "Optional",
menstrualStatus: "Menstrual Status",
notStarted: "Not started",
menopausal: "Menopausal",
notApplicable: "Not applicable",
ageAtMenarche: "Age at Menarche",
cycleDuration: "Cycle Duration",
cycleDurationPlaceholder: "Example: 28 days",
cycleRegularity: "Cycle Regularity",
cycleRegularityPlaceholder: "Example: Regular every 28 days",
lastMenstrualPeriod: "Last Menstrual Period",
menopauseStatus: "Menopause Status",
menopausePlaceholder: "Optional / Not applicable",
gynaecologicalHistory: "Gynaecological History",
gynaecologicalHistoryPlaceholder: "Mention relevant conditions, symptoms, or history.",
previousGynaecologicalProcedures: "Previous Gynaecological Procedures",
previousProceduresPlaceholder: "Mention previous procedures, if any.",
obstetricHistory: "OBSTETRIC HISTORY",
pregnancyDeliveryHistory: "Pregnancy & Delivery History",
pregnancyStatus: "Pregnancy Status",
notPregnant: "Not pregnant",
currentlyPregnant: "Currently pregnant",
possiblyPregnant: "Possibly pregnant",
postpartum: "Postpartum",
gravida: "Gravida (G)",
para: "Para (P)",
abortions: "Abortions (A)",
livingChildren: "Living Children (L)",
previousPregnancyComplications: "Previous Pregnancy Complications",
previousComplicationsPlaceholder: "Mention any previous complications, or write None.",
previousDeliveryDetails: "Previous Delivery Details",
currentPregnancyDetails: "Current Pregnancy Details",
currentPregnancyPlaceholder: "Only if currently pregnant or relevant.",
saveAndContinue: "Save & Continue →",
demographicsReviewNote: "You can review this information later. Sensitive fields are optional where appropriate.",
patientInformation: "PATIENT INFORMATION",
demographicsDescription: "Tell us about yourself so your healthcare professional has the right background information.",
abdmBackendNote: "Live ABDM/FHIR communication will be connected through the backend.",

    backToDashboard: "Back to Dashboard",
    yourAyushHealthHistory: "Your AYUSH Health History",
    whatAssessmentCovers: "What this assessment covers",
    reviewAndEdit: "Review & Edit",
    reviewEditDescription: "Move between questions and update your answers before completing the assessment.",
    optionalAssessment: "Optional assessment",
    optionalAssessmentDescription: "You can complete this assessment separately from your regular clinical consultation.",
    startAyushAssessment: "Start AYUSH Assessment",
    completeAyushAssessment: "Complete AYUSH Assessment",
    ayushAnswersSaved: "Your answers are saved automatically. Use Previous to review and edit earlier answers.",
    trackNewSymptoms: "Track new symptoms",
    trackNewSymptomsDescription: "Add symptoms that develop later so your healthcare professional can see how your condition changed over time.",
    symptomTimeline: "Symptom Timeline",
    symptomTimelineDescription: "See how your symptoms developed over time.",
    addNewSymptom: "Add New Symptom",
    addNewSymptomDescription: "Tell us about a new symptom that developed after your initial consultation.",
    newSymptomQuestion: "What new symptom did you develop?",
    newSymptomPlaceholder: "Example: Vomiting",
    symptomStartedQuestion: "When did this symptom actually start?",
    symptomStartedNote: "Enter when the symptom began, not when you are reporting it.",
    howSevere: "How severe is it?",
    tellUsMore: "Tell us more",
    symptomDetailsPlaceholder: "Describe anything else you noticed...",
    urgentSymptomsReported: "Urgent symptoms reported",
    noRedFlagSymptoms: "No red-flag symptoms reported",
    safetyScreenDisclaimer: "This is a safety screen, not a diagnosis. A healthcare professional should review the information.",
    aiClinicalInterview: "AI Clinical Interview",
    aiClinicalInterviewDescription: "Guided history with adaptive questions, voice/text input and safety screening.",
    shareMedicalReport: "Share This Medical Report",
    chooseWhatHealthcareWorkersSee: "Choose exactly what healthcare workers can see.",
    manageSharing: "Manage Sharing",
    sharingPreferencesSaved: "Sharing preferences saved.",
    saveSharingSettings: "Save Sharing Settings",
    shared: "Shared",
    private: "Private",
    consentStatus: "Consent Status",
    purpose: "Purpose",
    consentPurposeText: "Healthcare access, consultation, medical record review and emergency care.",
    accessState: "Access State",
    consentAccessStateText: "Patient-controlled access is currently active.",
    expiry: "Expiry",
    noConsentExpiry: "No expiry set for this consent.",
    revokeConsent: "Revoke Consent",
    dataSharingControls: "Data Sharing Controls",
    chooseHealthCategories: "Choose which categories of your health information can be accessed.",
    allowed: "Allowed",
    notAllowed: "Not allowed",
    recentAccessPatientControlled: "Patient-controlled access",
    consentActive: "Active",
    consentRevokeAlert: "Consent revocation request recorded. Healthcare access should be reviewed before revocation is finalized.",
    myDemographics: "My Demographics",
    myDemographicsDescription: "Manage your personal, lifestyle, menstrual and obstetric health information.",
    emergencyAccessCardDescription: "Control emergency access to your critical health information.",
    summaryNoneReported: "None reported",
    symptomSaveRequired: "Please enter the symptom and when it started.",
    patientSessionNotFound: "Patient session not found.",
    unableToSaveSymptom: "Unable to save symptom.",
    invalidAadhaar: "Please enter a valid 12-digit Aadhaar number.",
    aadhaarProductionMessage:
  "Aadhaar verification will be connected through a secure identity service in the production version.",
  aadhaarPrototypeWarning:
  "Aadhaar verification is not live in this prototype. Your Aadhaar number is not actually verified or stored.",
  irregular: "Irregular",
  ayushAssessmentSaved: "Your AYUSH assessment has been saved to your health record.",
  investigationDocumentDescription:
  "Investigation document associated with this health record.",
  keepInfoUpdated: "Keep this information updated so healthcare workers can quickly understand your medications and allergies.",
  dashavidhaPariksha: "Dashavidha Pariksha",
dashavidhaParikshaDescription:
  "Prakriti, Vikriti, Sara, Samhanana, Pramana, Satmya, Sattva, Ahara Shakti, Vyayama Shakti and Vaya.",
aharaVihara: "Ahara & Vihara",
aharaViharaDescription:
  "Diet, daily routine, sleep, physical activity and lifestyle information.",
  sex: "Sex",
  consentRevocationMessage:
  "Consent revocation request recorded. Healthcare access should be reviewed before revocation is finalized.",
  recentAccessEvent: "Recent Access Event",
currentSharingPreferences:
  "Your current sharing preferences are being applied to normal healthcare access.",
statusLabel: "Status",
normalAccessEmergencyNote:
  "Your permissions control normal healthcare access. Emergency access will follow a separate doctor verification process.",
  ayushPrakritiQuestion: "What is your natural body constitution or Prakriti?",
ayushPrakritiPlaceholder: "Describe your natural body type, habits, and tendencies...",

ayushVikritiQuestion: "What changes or imbalances are you currently experiencing?",
ayushVikritiPlaceholder: "Describe your current health changes or imbalances...",

ayushSaraQuestion: "How would you describe the quality or strength of your body tissues?",
ayushSaraPlaceholder: "Describe your general tissue quality and strength...",

ayushSamhananaQuestion: "How would you describe your body build and physical structure?",
ayushSamhananaPlaceholder: "Describe your body build and physical structure...",

ayushPramanaQuestion: "What are your height, weight, and general body proportions?",
ayushPramanaPlaceholder: "Enter your height, weight, and body proportions...",

ayushSatmyaQuestion: "What foods, routines, or habits suit your body well?",
ayushSatmyaPlaceholder: "Describe foods, routines, climate, or habits that suit you...",

ayushSattvaQuestion: "How would you describe your mental and emotional state?",
ayushSattvaPlaceholder: "Describe your mood, stress, emotional stability, and mental state...",

ayushAharaShaktiQuestion: "How would you describe your appetite and digestive capacity?",
ayushAharaShaktiPlaceholder: "Describe your appetite, digestion, and ability to eat...",

ayushVyayamaShaktiQuestion: "How would you describe your physical activity capacity?",
ayushVyayamaShaktiPlaceholder: "Describe your exercise tolerance and physical activity...",

ayushVayaQuestion: "What is your age and how would you describe your current stage of life?",
ayushVayaPlaceholder: "Enter your age and relevant life-stage information...",

ayushAharaViharaQuestion: "Tell us about your diet, daily routine, sleep, activity, and lifestyle.",
ayushAharaViharaPlaceholder: "Describe your food habits, sleep, exercise, daily routine, and lifestyle...",
ayushAnswersSaved: "Your answers are saved automatically. Use",
ayushReviewEdit: "to review and edit earlier answers.",
  },
  te: {
    tagline: "మీ ఆరోగ్య రికార్డు, మీరు ఎక్కడ ఉన్నా",
    chooseLanguage: "మీ భాషను ఎంచుకోండి",
    searchPlaceholder: "మీ లక్షణాలను వివరించండి లేదా ప్రశ్న అడగండి...",
  
    back: "వెనక్కి",
    welcome: "తిరిగి స్వాగతం 👋",
    welcomeTo: "AROVIA కి స్వాగతం",
    patientLogin: "రోగి లాగిన్",
    registrationTitle: "మీ AROVIA ఖాతాను సృష్టించండి",
registrationDescription: "మీ డిజిటల్ ఆరోగ్య రికార్డును ప్రారంభించడానికి ఒకసారి నమోదు చేసుకోండి.",
fullName: "పూర్తి పేరు",
enterFullName: "మీ పూర్తి పేరు నమోదు చేయండి",
abhaIdOptional: "ABHA ID",
optional: "ఐచ్ఛికం",
enterAbhaNumber: "14 అంకెల ABHA నంబర్ నమోదు చేయండి",
abhaIntegrationNote:
  "ABHA అనుసంధానం ఒక ఇంటిగ్రేషన్ దశ. ఈ ప్రోటోటైప్‌లో ప్రవేశం నమోదు చేయబడుతుంది; నిజమైన ABDM అనుసంధానాన్ని తరువాత బ్యాక్‌ఎండ్ ద్వారా కలుపవచ్చు.",
createAccount: "ఖాతాను సృష్టించండి",
privateProtected: "మీ ఆరోగ్య సమాచారం గోప్యంగా మరియు సురక్షితంగా ఉంటుంది.",

aadhaarTitle: "ఆధార్‌తో కొనసాగండి",
aadhaarDescription: "మీ ఆరోగ్య రికార్డులను యాక్సెస్ చేయడానికి 12 అంకెల ఆధార్ నంబర్ నమోదు చేయండి.",
aadhaarNumber: "ఆధార్ నంబర్",
aadhaarPlaceholder: "12 అంకెల ఆధార్ నంబర్",

abhaTitle: "ABHAతో కొనసాగండి",
abhaDescription: "మీ ఆరోగ్య రికార్డులను అనుసంధానించడానికి 14 అంకెల ABHA నంబర్ నమోదు చేయండి.",
abhaNumber: "ABHA నంబర్",
abhaPlaceholder: "14 అంకెల ABHA నంబర్",

abdmFhirStatus: "ABDM / FHIR ఇంటిగ్రేషన్ స్థితి",
abdmConnection: "ABDM కనెక్షన్",
notConnected: "అనుసంధానం కాలేదు",
fhirRecord: "FHIR రికార్డు",
readyForIntegration: "ఇంటిగ్రేషన్‌కు సిద్ధంగా ఉంది",
submissionStatus: "సమర్పణ స్థితి",
notSubmitted: "సమర్పించలేదు",
apiStatus: "API స్థితి",
awaitingBackend: "బ్యాక్‌ఎండ్ కోసం వేచి ఉంది",
continueButton: "కొనసాగించండి",
    accessRecords: "మీ ఆరోగ్య రికార్డులను చూడండి",
    mobileNumber: "మొబైల్ నంబర్",
    enterMobile: "10 అంకెల నంబర్ నమోదు చేయండి",
    sendOTP: "OTP పంపండి",
    demoMode: "డెమో మోడ్ • నిజమైన SMS పంపబడదు",
    privateInfo: "మీ ఆరోగ్య సమాచారం గోప్యంగా మరియు సురక్షితంగా ఉంటుంది.",
    verifyNumber: "మీ నంబర్‌ను ధృవీకరించండి",
    otpSent: "మీ మొబైల్ నంబర్‌కు పంపిన 6 అంకెల OTP నమోదు చేయండి",
    enterOTP: "OTP నమోదు చేయండి",
    verifyOTP: "OTP ధృవీకరించండి",
    demoOtp: "డెమో OTP: 123456",
    invalidPhone: "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.",
    incorrectOtp: "తప్పు OTP. డెమో కోసం 123456 ఉపయోగించండి.",
    hospitalClinicLabel: "ఆసుపత్రి / క్లినిక్",
doctorNameLabel: "వైద్యుని పేరు",
dateLabel: "తేదీ",
diagnosisLabel: "రోగ నిర్ధారణ",
notesLabel: "గమనికలు",
hospitalPlaceholder: "ఆసుపత్రి లేదా క్లినిక్ పేరు నమోదు చేయండి",
doctorPlaceholder: "వైద్యుని పేరు నమోదు చేయండి",
diagnosisPlaceholder: "రోగ నిర్ధారణ నమోదు చేయండి",
    medicalHistory: "వైద్య చరిత్ర",
    viewPreviousRecords: "మీ పాత వైద్య రికార్డులను చూడండి",
    diagnosis: "నిర్ధారణ",
    notes: "గమనికలు",
    noNotes: "అదనపు గమనికలు లేవు.",
    allergiesMedications: "అలెర్జీలు & మందులు",
    manageAllergies: "మీ అలెర్జీలు మరియు ప్రస్తుత మందులను నిర్వహించండి",
    allergies: "అలెర్జీలు",
    noKnownAllergies: "తెలిసిన అలెర్జీలు లేవు",
    noAllergiesAdded: "అలెర్జీలు నమోదు కాలేదు",
    safe: "సురక్షితం",
    currentMedications: "ప్రస్తుత మందులు",
    add: "జోడించండి",
    addMedication: "మందు జోడించండి",
    medicineName: "మందు పేరు",
    dosage: "మోతాదు",
    frequency: "ఎంత తరచుగా",
    remove: "తొలగించండి",
    addedToRecord: "మీ ఆరోగ్య రికార్డులో జోడించబడింది",
    requiredMedication: "దయచేసి అన్ని మందుల వివరాలను నమోదు చేయండి.",
    addMedicationButton: "మందు జోడించండి",
    addRecord: "కొత్త రికార్డు జోడించండి",
    addRecordDescription: "వాయిస్, కెమెరా లేదా మాన్యువల్‌గా మీ వైద్య రికార్డును జోడించండి",
    speakRecord: "వాయిస్‌తో రికార్డు",
    tellVisit: "మీ వైద్య సందర్శన గురించి చెప్పండి",
    listening: "వింటోంది...",
    scanDocument: "పత్రాన్ని స్కాన్ చేయండి",
    scanDocumentDescription: "ప్రిస్క్రిప్షన్ లేదా రిపోర్ట్ యొక్క ఫోటో తీయండి",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    useThisInformation: "ఈ సమాచారాన్ని ఉపయోగించండి",
    enterManually: "మాన్యువల్‌గా నమోదు చేయండి",
    recordType: "రికార్డు రకం",
    hospitalClinic: "ఆసుపత్రి / క్లినిక్",
    doctorName: "డాక్టర్ పేరు",
    date: "తేదీ",
    enterHospital: "ఆసుపత్రి లేదా క్లినిక్ పేరు నమోదు చేయండి",
    enterDoctor: "డాక్టర్ పేరు నమోదు చేయండి",
    enterDiagnosis: "నిర్ధారణ నమోదు చేయండి",
    notesPlaceholder: "అదనపు సమాచారం నమోదు చేయండి...",
    saveMedicalRecord: "వైద్య రికార్డును సేవ్ చేయండి",
    requiredRecord: "దయచేసి అవసరమైన అన్ని వివరాలను నమోదు చేయండి.",
    cameraTitle: "వైద్య పత్రాన్ని స్కాన్ చేయండి",
    documentInstruction: "ప్రిస్క్రిప్షన్, పరీక్షా రిపోర్ట్ లేదా వైద్య పత్రం యొక్క స్పష్టమైన ఫోటో తీయండి.",
    medicalDocument: "వైద్య పత్రం",
    extractAI: "AIతో సమాచారాన్ని తీసుకోండి",
    saveDocument: "పత్రాన్ని సేవ్ చేయండి",
    documentSaved: "వైద్య పత్రం అప్‌లోడ్ చేయబడింది",
    documentNote: "కెమెరా/ఫైల్ అప్‌లోడ్ ద్వారా పత్రం జోడించబడింది.",
    aiComing: "AI పత్ర సమాచారాన్ని తదుపరి దశలో అనుసంధానిస్తాం.",
    healthID: "AROVIA ఆరోగ్య ID",
    showHealthID: "మీ రికార్డును చూడటానికి ఈ IDని ఆరోగ్య కార్యకర్తకు చూపించండి",
    patient: "రోగి",
    aroviaHealthID: "AROVIA ఆరోగ్య ID",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    healthIDDescription: "ఆరోగ్య కార్యకర్త ఈ కోడ్‌ను స్కాన్ చేసి రోగిని గుర్తించి, అనుమతించబడిన ఆరోగ్య రికార్డులను చూడగలరు.",
    demoQR: "హ్యాకథాన్ డెమో QR కోడ్. నిజమైన వ్యవస్థలో ఈ ID సురక్షితమైన రోగి రికార్డు వ్యవస్థతో అనుసంధానించబడుతుంది.",
    symptomChecker: "లక్షణాల పరిశీలన",
    healthJourney: "ఆరోగ్య ప్రయాణం",
    preConsultation: "ప్రీ-కన్సల్టేషన్",
    preConsultationDescription:
    "ఆరోగ్య నిపుణుడిని కలవడానికి ముందు మీరు అనుభవిస్తున్న సమస్యను మాకు చెప్పండి.",
    preConsultationIntro:
  "మీరు అనుభవిస్తున్న సమస్య గురించి మాకు చెప్పండి. మీరు మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు.",

preConsultationDuration:
  "ఈ సమస్య ఎప్పుడు ప్రారంభమైంది?",

preConsultationSeverity:
  "ఈ సమస్య తీవ్రతను 1 నుండి 10 వరకు ఎంతగా భావిస్తున్నారు?",

preConsultationSymptoms:
  "దీనితో పాటు మీకు ఏవైనా ఇతర లక్షణాలు ఉన్నాయా?",

preConsultationHistory:
  "ఈ సమస్యకు సంబంధించిన ఏవైనా ముఖ్యమైన వైద్య చరిత్ర ఉందా?",

preConsultationMedications:
  "మీరు ప్రస్తుతం ఏవైనా మందులు తీసుకుంటున్నారా?",

preConsultationAllergies:
  "మీకు తెలిసిన ఏవైనా అలెర్జీలు ఉన్నాయా?",
  preConsultationAssociatedSymptoms:
  "మీ ప్రధాన సమస్యతో పాటు మీకు ఏవైనా ఇతర లక్షణాలు ఉన్నాయా?",

preConsultationFamilyHistory:
  "డయాబెటిస్, గుండె జబ్బులు, అధిక రక్తపోటు లేదా ఇతర వంశపారంపర్య వ్యాధులు వంటి ముఖ్యమైన కుటుంబ వైద్య చరిత్ర ఏదైనా ఉందా?",

preConsultationPersonalHistory:
  "ధూమపానం, మద్యం వినియోగం, వృత్తి, జీవనశైలి లేదా ఇతర సంబంధిత అలవాట్ల గురించి మీ వ్యక్తిగత చరిత్రను చెప్పగలరా?",

preConsultationReviewOfSystems:
  "మీ సాధారణ ఆరోగ్యం, గుండె, శ్వాస, కడుపు, నాడీ వ్యవస్థ లేదా ఇతర శరీర భాగాలకు సంబంధించిన ఏవైనా ఇతర లక్షణాలు మీకు ఉన్నాయా?",

preConsultationRedFlags:
  "భద్రతా తనిఖీ: ప్రస్తుతం మీకు తీవ్రమైన శ్వాస తీసుకోవడంలో ఇబ్బంది, తీవ్రమైన ఛాతీ నొప్పి, మూర్ఛ, అకస్మాత్తు బలహీనత, మూర్ఛలు లేదా నియంత్రించలేని రక్తస్రావం ఏదైనా ఉందా?",
  readAloud: "బిగ్గరగా చదవండి",
startSpeaking: "మాట్లాడటం ప్రారంభించండి",

    preConsultationSummary: "ప్రీ-కన్సల్టేషన్ సారాంశం",

   reviewBeforeDoctor:
  "ఆరోగ్య నిపుణుడితో పంచుకునే ముందు సమాచారాన్ని సమీక్షించండి.",

   preConsultationDisclaimer:
  "ఈ సారాంశం మీరు అందించిన సమాచారాన్ని క్రమబద్ధీకరిస్తుంది. ఇది ఎలాంటి వ్యాధి నిర్ధారణను ఇవ్వదు.",

   done: "పూర్తయింది",

  you: "మీరు",
  recordGeneralConsultation: "సాధారణ వైద్య సంప్రదింపు",
recordBloodTest: "రక్త పరీక్ష",
recordPrescription: "ప్రిస్క్రిప్షన్",
recordVaccination: "టీకా",
recordOther: "ఇతర",

hospitalClinicLabel: "ఆసుపత్రి / క్లినిక్",
doctorNameLabel: "వైద్యుని పేరు",
dateLabel: "తేదీ",
diagnosisLabel: "రోగ నిర్ధారణ",
notesLabel: "గమనికలు",

hospitalPlaceholder: "ఆసుపత్రి లేదా క్లినిక్ పేరు నమోదు చేయండి",
doctorPlaceholder: "వైద్యుని పేరు నమోదు చేయండి",
diagnosisPlaceholder: "రోగ నిర్ధారణ నమోదు చేయండి",

medicalDocument: "వైద్య పత్రం",
remove: "తొలగించు",
aiReadingDocument: "AI మీ పత్రాన్ని చదువుతోంది...",
extractingMedicalInformation: "వైద్య సమాచారాన్ని వెలికితీస్తోంది",
aiExtractedInformation: "AI ద్వారా వెలికితీసిన సమాచారం",
reviewBeforeSaving: "సేవ్ చేయడానికి ముందు సమాచారాన్ని సమీక్షించండి.",
saveMedicalRecord: "వైద్య రికార్డును సేవ్ చేయండి",

voiceInput: "వాయిస్ ఇన్‌పుట్",
useThisInformation: "ఈ సమాచారాన్ని ఉపయోగించండి",

  aroviaListening: "AROVIA వింటోంది...",

  typeYourResponse: "మీ సమాధానాన్ని టైప్ చేయండి...",

  startSpeaking: "మాట్లాడటం ప్రారంభించండి",

    continue: "కొనసాగించండి", 
    yourHealthStory: "మీ ఆరోగ్య కథ",
    latestHealthEvent: "తాజా ఆరోగ్య సంఘటన",
    viewDetails: "వివరాలు చూడండి",
    consultation: "వైద్య సంప్రదింపు",
    medication: "మందు",
    medicalReport: "వైద్య రిపోర్ట్",
    diagnosisLabel: "నిర్ధారణ",
    doctorLabel: "డాక్టర్",
    dateLabel: "తేదీ",
    notesLabel: "గమనికలు",
    relatedMedication: "సంబంధిత మందు",
    relatedReport: "సంబంధిత రిపోర్ట్",
    closeDetails: "వివరాలను మూసివేయండి",
    healthStoryText: (count) =>
    `మీ ఆరోగ్య ప్రయాణంలో సంప్రదింపులు, మందులు మరియు వైద్య రిపోర్టులతో కలిపి ${count} ఆరోగ్య సంఘటనలు ఉన్నాయి.`,
    symptomDescription: "మీ లక్షణాలను వివరించి ప్రాథమిక ఆరోగ్య సూచన పొందండి",
    whatFeeling: "మీకు ఏమి అనిపిస్తోంది?",
    symptomPlaceholder: "ఉదాహరణ: నాకు జ్వరం, తలనొప్పి మరియు శరీర నొప్పి ఉంది",
    checkSymptoms: "లక్షణాలను పరిశీలించండి",
    describeSymptoms: "దయచేసి మీ లక్షణాలను వివరించండి.",
    emergencyMessage: "అత్యవసర లక్షణాలు కనిపించాయి. వెంటనే వైద్య సహాయం పొందండి.",
    feverMessage: "మీ లక్షణాలకు వైద్య సంప్రదింపు అవసరం కావచ్చు. నీరు తాగుతూ ఉండండి మరియు ఆరోగ్య నిపుణుడిని సంప్రదించండి.",
    generalSymptomMessage: "మీ లక్షణాల సరైన మూల్యాంకనం కోసం ఆరోగ్య నిపుణుడిని సంప్రదించండి.",
    symptomWarning: "ఇది డెమో ఫీచర్ మాత్రమే మరియు వైద్య నిర్ధారణ ఇవ్వదు. తీవ్రమైన లేదా పెరుగుతున్న లక్షణాలు ఉంటే వెంటనే వైద్య నిపుణుడిని సంప్రదించండి.",
    profile: "ప్రొఫైల్",
    privacyPermissions: "గోప్యత & అనుమతులు",
    manageAccess: "ఆరోగ్య కార్యకర్తలు ఏ సమాచారాన్ని చూడాలో నియంత్రించండి",
    medicalHistoryPermission: "వైద్య చరిత్ర",
    medicationsPermission: "మందులు",
    allergiesPermission: "అలెర్జీలు",
    labReportsPermission: "ల్యాబ్ రిపోర్టులు",
    prescriptionsPermission: "ప్రిస్క్రిప్షన్లు",
    emergencyAccessPermission: "అత్యవసర ప్రాప్యత",
    savePermissions: "అనుమతులను సేవ్ చేయండి",
    permissionSaved: "మీ అనుమతులు సేవ్ చేయబడ్డాయి.",
    manageAccount: "మీ AROVIA ఖాతాను నిర్వహించండి",
    patientName: "రోగి పేరు",
    phoneNumber: "ఫోన్ నంబర్",
    healthIdLabel: "ఆరోగ్య ID",
    language: "భాష",
    logout: "లాగ్ అవుట్",
    yourHealthRecord: "మీ ఆరోగ్య రికార్డు",
    allInOnePlace: "అన్నీ ఒకే చోట",
    records: "రికార్డులు",
    lastVisit: "చివరి సందర్శన",
    recent: "ఇటీవల",
    registeredMobile: "నమోదైన మొబైల్",
    yourHealth: "మీ ఆరోగ్యం",
    previousRecordsShort: "మీ పాత రికార్డులను చూడండి",
    manageMedicinesShort: "మీ మందులను నిర్వహించండి",
    uploadReports: "రిపోర్టులు లేదా ప్రిస్క్రిప్షన్లు అప్‌లోడ్ చేయండి",
    checkYourSymptoms: "మీ లక్షణాలను పరిశీలించండి",
    home: "హోమ్",
    symptoms: "లక్షణాలు",
    voiceUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు.",
    privateHealth: "AROVIA • అందరికీ ఆరోగ్య సేవలు",
    symptomSelectSeverity: "తీవ్రతను ఎంచుకోండి",
symptomMild: "తేలికపాటి",
symptomModerate: "మధ్యస్థం",
symptomSevere: "తీవ్రమైన",
addSymptom: "లక్షణాన్ని జోడించండి",
summaryPatientDemographics: "రోగి వివరాలు",
summaryPatientId: "రోగి ID",
summaryNotAvailable: "అందుబాటులో లేదు",
summaryAbhaId: "ABHA ID",
summaryNotLinked: "లింక్ చేయలేదు",
summaryMainConcern: "ప్రధాన సమస్య",
summaryNotProvided: "అందించలేదు",
summaryDuration: "వ్యవధి",
summarySeverity: "తీవ్రత",
summaryAssociatedSymptoms: "సంబంధిత లక్షణాలు",

summaryAyushHistory: "ఆయుష్ చరిత్ర",
summaryDashavidhaLifestyle: "దశవిధ పరీక్ష & జీవనశైలి",
summaryAyushAssessmentInfo: "రోగి అందించిన ఆయుష్ అంచనా సమాచారం",

summaryPrakriti: "ప్రకృతి",
summaryVikriti: "వికృతి",
summarySara: "సారం",
summarySamhanana: "సంహననం",
summaryPramana: "ప్రమాణం",
summarySatmya: "సాత్మ్యం",
summarySattva: "సత్త్వం",
summaryAharaShakti: "ఆహార శక్తి",
summaryVyayamaShakti: "వ్యాయామ శక్తి",
summaryVaya: "వయస్సు",
summaryAharaVihara: "ఆహారం & విహారం",

summaryAyushDisclaimer:
  "ఈ సమాచారం రోగి ఐచ్ఛిక ఆయుష్ అంచనా సమయంలో అందించారు. దీనిని అర్హత కలిగిన ఆరోగ్య నిపుణుడు సమీక్షించాలి.",

summaryPastSurgicalHistory: "గత శస్త్రచికిత్స చరిత్ర",
summaryRelevantMedicalHistory: "సంబంధిత వైద్య చరిత్ర",
summaryCurrentMedications: "ప్రస్తుత మందులు",
summaryKnownAllergies: "తెలిసిన అలర్జీలు",
summaryFamilyHistory: "కుటుంబ చరిత్ర",
summaryPersonalHistory: "వ్యక్తిగత చరిత్ర",
summaryReviewOfSystems: "వ్యవస్థల సమీక్ష (ROS)",

summaryPatientDescription: "రోగి వివరణ",
summaryHpi: "ప్రస్తుత అనారోగ్య చరిత్ర (HPI)",
summaryChiefComplaint: "ప్రధాన ఫిర్యాదు",
summaryRelevantHistory: "సంబంధిత చరిత్ర",
summarySafetyRedFlag: "భద్రత / ప్రమాద సూచనల తనిఖీ",
summaryNotReported: "నివేదించలేదు",

summaryEmergencyWarning:
  "అత్యవసర లక్షణాలు నివేదించబడ్డాయి — వెంటనే వైద్య సహాయం పొందండి మరియు ఆరోగ్య సిబ్బందికి తెలియజేయండి.",
  aiClinicalSummaryDraft: "AI ద్వారా రూపొందించిన క్లినికల్ సారాంశం — డ్రాఫ్ట్",
aiAssistedHistory: "AI సహాయంతో రూపొందించిన చరిత్ర",
status: "స్థితి",
draft: "డ్రాఫ్ట్",
editing: "సవరిస్తున్నారు",
confirmed: "ధృవీకరించబడింది",
correctionRequested: "సవరణ కోరబడింది",
edit: "సవరించు",
acceptConfirm: "ఆమోదించు / ధృవీకరించు",
rejectCorrection: "తిరస్కరించు / సవరణ కోరండి",
aiSummaryDisclaimer:
  "ఇది రోగి అందించిన సమాచారం ఆధారంగా AI రూపొందించిన డ్రాఫ్ట్. ఇది రోగ నిర్ధారణ కాదు మరియు ఆరోగ్య నిపుణుడు సమీక్షించాలి.",
  questionProgress: "ప్రశ్న",
ofText: "లో",
answered: "సమాధానమిచ్చారు",
complete: "పూర్తయింది",
readAloud: "వినిపించు",
aroviaLabel: "AROVIA",

medicineNameUnknown: "మందు పేరు తెలియదా?",
medicinePhotoInstruction:
  "మందు స్ట్రిప్, ప్యాకేజీ లేదా ప్రిస్క్రిప్షన్ ఫోటో తీయండి.",
takePhotoUpload: "ఫోటో తీయండి / అప్‌లోడ్ చేయండి",
emergencyBackDashboard: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
emergencyAccessSettings: "అత్యవసర యాక్సెస్ సెట్టింగ్‌లు",
emergencyAccessDescription:
  "అత్యవసర పరిస్థితుల్లో మీ ముఖ్యమైన ఆరోగ్య సమాచారానికి యాక్సెస్‌ను నిర్వహించండి.",
emergencyAccessLabel: "అత్యవసర యాక్సెస్",
enabled: "ప్రారంభించబడింది",
emergencyCriticalInfo:
  "అత్యవసర సమయంలో ముఖ్యమైన ఆరోగ్య సమాచారాన్ని యాక్సెస్ చేయవచ్చు.",
active: "క్రియాశీలం",
criticalInfoAvailable: "అందుబాటులో ఉన్న ముఖ్యమైన సమాచారం",
bloodGroup: "రక్త వర్గం",
notAvailable: "అందుబాటులో లేదు",
noKnownAllergies: "తెలిసిన అలర్జీలు లేవు",
medications: "మందులు",
accessControl: "యాక్సెస్ నియంత్రణ",
emergencyAccessIntended:
  "అత్యవసర యాక్సెస్ అత్యవసర ఆరోగ్య పరిస్థితుల కోసం ఉద్దేశించబడింది.",
disableEmergencyAccess: "అత్యవసర యాక్సెస్‌ను నిలిపివేయండి",
enableEmergencyAccess: "అత్యవసర యాక్సెస్‌ను ప్రారంభించండి",
currentStatus: "ప్రస్తుత స్థితి",
recentAccessEvent: "ఇటీవలి యాక్సెస్ ఈవెంట్",
noEmergencyAccessEvent:
  "ఎటువంటి అత్యవసర యాక్సెస్ ఈవెంట్ నమోదు కాలేదు.",
  ayushDashavidhaTitle: "ఆయుష్ — దశవిధ పరీక్ష",
ayurvedicClinicalAssessment: "ఆయుర్వేద క్లినికల్ అంచనా",
question: "ప్రశ్న",
ofText: "లో",
answered: "సమాధానమిచ్చారు",
complete: "పూర్తయింది",
previous: "మునుపటి",
next: "తదుపరి",

dontKnowMedicine: "మందు పేరు తెలియదా?",
medicinePhotoInstruction: "మందు స్ట్రిప్, ప్యాకేజీ లేదా ప్రిస్క్రిప్షన్ ఫోటో తీయండి.",
takePhotoUpload: "ఫోటో తీయండి / అప్‌లోడ్ చేయండి",
investigationMedicalReport: "పరీక్ష / వైద్య నివేదిక",
procedureSurgery: "ప్రక్రియ / శస్త్రచికిత్స",
consultation: "వైద్య సంప్రదింపు",
editAyush: "ఆయుష్‌ను సవరించండి",
    ayushHistory: "ఆయుష్ చరిత్ర",
    ayushHistoryDescription: "మీ ఆయుష్ ఆరోగ్య అంచనా మరియు దశవిధ పరీక్షను పూర్తి చేయండి.",
    settings: "సెట్టింగ్‌లు",
    settingsDescription: "మీ ప్రొఫైల్, ఆరోగ్య సమాచారం, గోప్యత మరియు ప్రాధాన్యతలను నిర్వహించండి.",
    personalMedicalInformation: "వ్యక్తిగత & వైద్య సమాచారం",
    personalMedicalInformationDescription: "మీ వ్యక్తిగత మరియు వైద్య సమాచారాన్ని నిర్వహించండి.",
    privacyConsent: "గోప్యత & సమ్మతి",
    privacyConsentDescription: "మీ గోప్యత, అనుమతులు మరియు ఆరోగ్య సేవల యాక్సెస్‌ను నిర్వహించండి.",
demographicsTitle: "రోగి వివరాలు",
basicInformation: "ప్రాథమిక సమాచారం",
lifestyleSocialHistory: "జీవనశైలి & సామాజిక చరిత్ర",
personalBackground: "వ్యక్తిగత నేపథ్యం",
menstrualHistoryTitle: "మాసిక ధర్మ చరిత్ర",
gynaecologicalHistoryTitle: "స్త్రీ జననేంద్రియ చరిత్ర",
obstetricHistoryTitle: "ప్రసూతి చరిత్ర",
saveAndContinue: "సేవ్ చేసి కొనసాగించండి",
fullNamePlaceholder: "మీ పూర్తి పేరును నమోదు చేయండి",
agePlaceholder: "వయస్సు",
selectOption: "ఎంచుకోండి",
female: "స్త్రీ",
male: "పురుషుడు",
intersex: "ఇంటర్‌సెక్స్",
preferNotToSay: "చెప్పడానికి ఇష్టపడటం లేదు",
occupationJob: "వృత్తి / ఉద్యోగం",
occupationPlaceholder: "విద్యార్థి, ఉపాధ్యాయుడు, రైతు, ఇంజనీర్...",
dietLabel: "ఆహారం",
selectDiet: "ఆహారాన్ని ఎంచుకోండి",
vegetarian: "శాకాహారం",
nonVegetarian: "మాంసాహారం",
vegan: "వీగన్",
other: "ఇతర",
physicalActivityLabel: "శారీరక కార్యకలాపాలు",
selectActivityLevel: "కార్యకలాప స్థాయిని ఎంచుకోండి",
low: "తక్కువ",
moderate: "మధ్యస్థం",
high: "అధికం",
sleepLabel: "నిద్ర",
sleepPlaceholder: "ఉదాహరణ: 7 గంటలు, మంచి నాణ్యత",
alcoholUse: "మద్యం వినియోగం",
never: "ఎప్పుడూ కాదు",
occasional: "అప్పుడప్పుడు",
regular: "క్రమం తప్పకుండా",
tobaccoSmoking: "పొగాకు / ధూమపానం",
former: "గతంలో",
otherSubstanceDrugUse: "ఇతర పదార్థం / మాదకద్రవ్య వినియోగం",
substanceUsePlaceholder: "సంబంధిత పదార్థ వినియోగాన్ని పేర్కొనండి లేదా లేదు అని రాయండి.",
ethnicityLabel: "జాతి నేపథ్యం",
religionLabel: "మతం",
optional: "ఐచ్ఛికం",
menstrualStatus: "మాసిక ధర్మ స్థితి",
notStarted: "ఇంకా ప్రారంభం కాలేదు",
menopausal: "రజోనివృత్తి",
notApplicable: "వర్తించదు",
ageAtMenarche: "మొదటి మాసిక ధర్మం వచ్చిన వయస్సు",
cycleDuration: "చక్ర వ్యవధి",
cycleDurationPlaceholder: "ఉదాహరణ: 28 రోజులు",
cycleRegularity: "చక్ర క్రమబద్ధత",
cycleRegularityPlaceholder: "ఉదాహరణ: ప్రతి 28 రోజులకు క్రమం తప్పకుండా",
lastMenstrualPeriod: "చివరి మాసిక ధర్మం",
menopauseStatus: "రజోనివృత్తి స్థితి",
menopausePlaceholder: "ఐచ్ఛికం / వర్తించదు",
gynaecologicalHistory: "స్త్రీ జననేంద్రియ చరిత్ర",
gynaecologicalHistoryPlaceholder: "సంబంధిత పరిస్థితులు, లక్షణాలు లేదా చరిత్రను పేర్కొనండి.",
previousGynaecologicalProcedures: "మునుపటి స్త్రీ జననేంద్రియ ప్రక్రియలు",
previousProceduresPlaceholder: "మునుపటి ప్రక్రియలు ఉంటే పేర్కొనండి.",
obstetricHistory: "ప్రసూతి చరిత్ర",
pregnancyDeliveryHistory: "గర్భధారణ & ప్రసవ చరిత్ర",
pregnancyStatus: "గర్భధారణ స్థితి",
notPregnant: "గర్భవతి కాదు",
currentlyPregnant: "ప్రస్తుతం గర్భవతి",
possiblyPregnant: "గర్భవతి అయ్యే అవకాశం ఉంది",
postpartum: "ప్రసవానంతర కాలం",
gravida: "గ్రావిడా (G)",
para: "పారా (P)",
abortions: "గర్భస్రావాలు (A)",
livingChildren: "జీవించి ఉన్న పిల్లలు (L)",
previousPregnancyComplications: "మునుపటి గర్భధారణ సమస్యలు",
previousComplicationsPlaceholder: "మునుపటి సమస్యలను పేర్కొనండి లేదా లేదు అని రాయండి.",
previousDeliveryDetails: "మునుపటి ప్రసవ వివరాలు",
currentPregnancyDetails: "ప్రస్తుత గర్భధారణ వివరాలు",
currentPregnancyPlaceholder: "ప్రస్తుతం గర్భవతిగా ఉన్నప్పుడు లేదా సంబంధితమైనప్పుడు మాత్రమే.",
saveAndContinue: "సేవ్ చేసి కొనసాగించండి →",
demographicsReviewNote: "మీరు ఈ సమాచారాన్ని తర్వాత సమీక్షించవచ్చు. అవసరమైన చోట సున్నితమైన వివరాలు ఐచ్ఛికం.",
patientInformation: "రోగి సమాచారం",
demographicsDescription: "మీ గురించి వివరాలను అందించండి, తద్వారా మీ ఆరోగ్య నిపుణుడికి అవసరమైన నేపథ్య సమాచారం అందుతుంది.",
abdmBackendNote: "లైవ్ ABDM/FHIR కమ్యూనికేషన్ బ్యాకెండ్ ద్వారా అనుసంధానించబడుతుంది.",

    backToDashboard: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
    yourAyushHealthHistory: "మీ ఆయుష్ ఆరోగ్య చరిత్ర",
    whatAssessmentCovers: "ఈ అంచనాలో ఏమి ఉంటుంది",
    reviewAndEdit: "సమీక్ష & సవరణ",
    reviewEditDescription: "అంచనాను పూర్తి చేయడానికి ముందు ప్రశ్నల మధ్య వెళ్లి మీ సమాధానాలను సవరించండి.",
    optionalAssessment: "ఐచ్ఛిక అంచనా",
    optionalAssessmentDescription: "మీ సాధారణ వైద్య సంప్రదింపుతో విడిగా ఈ అంచనాను పూర్తి చేయవచ్చు.",
    startAyushAssessment: "ఆయుష్ అంచనాను ప్రారంభించండి",
    completeAyushAssessment: "ఆయుష్ అంచనాను పూర్తి చేయండి",
    ayushAnswersSaved: "మీ సమాధానాలు స్వయంచాలకంగా సేవ్ చేయబడతాయి. మునుపటి ప్రశ్నలను సమీక్షించి సవరించడానికి Previous ఉపయోగించండి.",
    trackNewSymptoms: "కొత్త లక్షణాలను నమోదు చేయండి",
    trackNewSymptomsDescription: "తర్వాత అభివృద్ధి చెందిన లక్షణాలను జోడించండి, తద్వారా మీ ఆరోగ్య నిపుణుడు మీ పరిస్థితి ఎలా మారిందో చూడగలరు.",
    symptomTimeline: "లక్షణాల కాలక్రమం",
    symptomTimelineDescription: "మీ లక్షణాలు కాలక్రమేణా ఎలా అభివృద్ధి చెందాయో చూడండి.",
    addNewSymptom: "కొత్త లక్షణాన్ని జోడించండి",
    addNewSymptomDescription: "ప్రాథమిక సంప్రదింపుల తర్వాత అభివృద్ధి చెందిన కొత్త లక్షణం గురించి చెప్పండి.",
    newSymptomQuestion: "మీకు ఏ కొత్త లక్షణం వచ్చింది?",
    newSymptomPlaceholder: "ఉదాహరణ: వాంతులు",
    symptomStartedQuestion: "ఈ లక్షణం నిజంగా ఎప్పుడు ప్రారంభమైంది?",
    symptomStartedNote: "మీరు నివేదిస్తున్న సమయాన్ని కాదు, లక్షణం ప్రారంభమైన సమయాన్ని నమోదు చేయండి.",
    howSevere: "ఇది ఎంత తీవ్రంగా ఉంది?",
    tellUsMore: "మరింత వివరించండి",
    symptomDetailsPlaceholder: "మీరు గమనించిన ఇతర విషయాలను వివరించండి...",
    urgentSymptomsReported: "అత్యవసర లక్షణాలు నివేదించబడ్డాయి",
    noRedFlagSymptoms: "ప్రమాద సూచించే లక్షణాలు నివేదించబడలేదు",
    safetyScreenDisclaimer: "ఇది భద్రతా తనిఖీ మాత్రమే, నిర్ధారణ కాదు. ఆరోగ్య నిపుణుడు సమాచారాన్ని సమీక్షించాలి.",
    aiClinicalInterview: "AI క్లినికల్ ఇంటర్వ్యూ",
    aiClinicalInterviewDescription: "అనుకూల ప్రశ్నలు, వాయిస్/టెక్స్ట్ ఇన్‌పుట్ మరియు భద్రతా తనిఖీతో మార్గదర్శక వైద్య చరిత్ర.",
    shareMedicalReport: "ఈ వైద్య నివేదికను పంచుకోండి",
    chooseWhatHealthcareWorkersSee: "ఆరోగ్య కార్యకర్తలు ఏమి చూడాలో ఖచ్చితంగా ఎంచుకోండి.",
    manageSharing: "షేరింగ్‌ను నిర్వహించండి",
    sharingPreferencesSaved: "షేరింగ్ ప్రాధాన్యతలు సేవ్ చేయబడ్డాయి.",
    saveSharingSettings: "షేరింగ్ సెట్టింగ్‌లను సేవ్ చేయండి",
    shared: "పంపబడింది",
    private: "ప్రైవేట్",
    consentStatus: "సమ్మతి స్థితి",
    purpose: "ఉద్దేశ్యం",
    consentPurposeText: "ఆరోగ్య సేవలు, సంప్రదింపులు, వైద్య రికార్డు సమీక్ష మరియు అత్యవసర సంరక్షణ.",
    accessState: "యాక్సెస్ స్థితి",
    consentAccessStateText: "రోగి నియంత్రిత యాక్సెస్ ప్రస్తుతం క్రియాశీలంగా ఉంది.",
    expiry: "గడువు",
    noConsentExpiry: "ఈ సమ్మతికి గడువు సెట్ చేయలేదు.",
    revokeConsent: "సమ్మతిని ఉపసంహరించండి",
    dataSharingControls: "డేటా షేరింగ్ నియంత్రణలు",
    chooseHealthCategories: "మీ ఆరోగ్య సమాచారంలో ఏ వర్గాలను యాక్సెస్ చేయవచ్చో ఎంచుకోండి.",
    allowed: "అనుమతించబడింది",
    notAllowed: "అనుమతించబడలేదు",
    recentAccessPatientControlled: "రోగి నియంత్రిత యాక్సెస్",
    consentActive: "క్రియాశీలం",
    consentRevokeAlert: "సమ్మతి ఉపసంహరణ అభ్యర్థన నమోదు చేయబడింది. ఉపసంహరణను ఖరారు చేసే ముందు ఆరోగ్య సేవల యాక్సెస్‌ను సమీక్షించాలి.",
    myDemographics: "నా రోగి వివరాలు",
    myDemographicsDescription: "మీ వ్యక్తిగత, జీవనశైలి, మాసిక ధర్మ మరియు ప్రసూతి ఆరోగ్య సమాచారాన్ని నిర్వహించండి.",
    emergencyAccessCardDescription: "మీ ముఖ్యమైన ఆరోగ్య సమాచారానికి అత్యవసర యాక్సెస్‌ను నియంత్రించండి.",
    summaryNoneReported: "ఏవీ నివేదించలేదు",
    symptomSaveRequired: "దయచేసి లక్షణం మరియు అది ప్రారంభమైన సమయాన్ని నమోదు చేయండి.",
    patientSessionNotFound: "రోగి సెషన్ కనుగొనబడలేదు.",
    unableToSaveSymptom: "లక్షణాన్ని సేవ్ చేయడం సాధ్యపడలేదు.",
    invalidAadhaar: "దయచేసి చెల్లుబాటు అయ్యే 12 అంకెల ఆధార్ నంబర్‌ను నమోదు చేయండి.",
    aadhaarProductionMessage:
  "ఉత్పత్తి వెర్షన్‌లో ఆధార్ ధృవీకరణ సురక్షిత గుర్తింపు సేవ ద్వారా అనుసంధానించబడుతుంది.",
  aadhaarPrototypeWarning:
  "ఈ ప్రోటోటైప్‌లో ఆధార్ ధృవీకరణ అందుబాటులో లేదు. మీ ఆధార్ నంబర్ వాస్తవంగా ధృవీకరించబడదు లేదా నిల్వ చేయబడదు.",
  irregular: "అసమానమైన",
  ayushAssessmentSaved: "మీ ఆయుష్ అంచనా మీ ఆరోగ్య రికార్డులో సేవ్ చేయబడింది.",
  investigationDocumentDescription:
  "ఈ ఆరోగ్య రికార్డుకు సంబంధించిన వైద్య పరిశీలన పత్రం.",
  keepInfoUpdated: "మీ మందులు మరియు అలర్జీలను ఆరోగ్య కార్యకర్తలు త్వరగా అర్థం చేసుకునేలా ఈ సమాచారాన్ని ఎప్పటికప్పుడు నవీకరించండి.",
  dashavidhaPariksha: "దశవిధ పరీక్ష",
dashavidhaParikshaDescription:
  "ప్రకృతి, వికృతి, సార, సంహనన, ప్రమాణ, సాత్మ్య, సత్త్వ, ఆహార శక్తి, వ్యాయామ శక్తి మరియు వయస్సు.",
aharaVihara: "ఆహార & విహార",
aharaViharaDescription:
  "ఆహారం, రోజువారీ దినచర్య, నిద్ర, శారీరక శ్రమ మరియు జీవనశైలి సమాచారం.",
  sex: "లింగం",
  consentRevocationMessage:
  "సమ్మతి రద్దు అభ్యర్థన నమోదు చేయబడింది. రద్దు ఖరారు చేయడానికి ముందు ఆరోగ్య సంరక్షణ ప్రాప్యతను సమీక్షించాలి.",
  recentAccessEvent: "ఇటీవలి ప్రాప్యత ఈవెంట్",
currentSharingPreferences:
  "మీ ప్రస్తుత భాగస్వామ్య ప్రాధాన్యతలు సాధారణ ఆరోగ్య సంరక్షణ ప్రాప్యతకు వర్తింపజేయబడుతున్నాయి.",
statusLabel: "స్థితి",
normalAccessEmergencyNote:
  "మీ అనుమతులు సాధారణ ఆరోగ్య సంరక్షణ ప్రాప్యతను నియంత్రిస్తాయి. అత్యవసర ప్రాప్యత ప్రత్యేక వైద్యుల ధృవీకరణ ప్రక్రియను అనుసరిస్తుంది.",
  ayushPrakritiQuestion: "మీ సహజ శరీర స్వభావం లేదా ప్రకృతి ఏమిటి?",
ayushPrakritiPlaceholder: "మీ సహజ శరీర నిర్మాణం, అలవాట్లు మరియు స్వభావ లక్షణాలను వివరించండి...",

ayushVikritiQuestion: "మీరు ప్రస్తుతం ఎలాంటి మార్పులు లేదా అసమతుల్యతలను అనుభవిస్తున్నారు?",
ayushVikritiPlaceholder: "మీ ప్రస్తుత ఆరోగ్య మార్పులు లేదా అసమతుల్యతలను వివరించండి...",

ayushSaraQuestion: "మీ శరీర ధాతువుల నాణ్యత లేదా బలాన్ని ఎలా వివరిస్తారు?",
ayushSaraPlaceholder: "మీ శరీర ధాతువుల సాధారణ నాణ్యత మరియు బలాన్ని వివరించండి...",

ayushSamhananaQuestion: "మీ శరీర నిర్మాణం మరియు భౌతిక ఆకృతిని ఎలా వివరిస్తారు?",
ayushSamhananaPlaceholder: "మీ శరీర నిర్మాణం మరియు భౌతిక ఆకృతిని వివరించండి...",

ayushPramanaQuestion: "మీ ఎత్తు, బరువు మరియు సాధారణ శరీర నిష్పత్తులు ఏమిటి?",
ayushPramanaPlaceholder: "మీ ఎత్తు, బరువు మరియు శరీర నిష్పత్తులను నమోదు చేయండి...",

ayushSatmyaQuestion: "ఏ ఆహారాలు, దినచర్యలు లేదా అలవాట్లు మీ శరీరానికి బాగా సరిపోతాయి?",
ayushSatmyaPlaceholder: "మీకు అనుకూలమైన ఆహారాలు, దినచర్యలు, వాతావరణం లేదా అలవాట్లను వివరించండి...",

ayushSattvaQuestion: "మీ మానసిక మరియు భావోద్వేగ స్థితిని ఎలా వివరిస్తారు?",
ayushSattvaPlaceholder: "మీ మానసిక స్థితి, ఒత్తిడి, భావోద్వేగ స్థిరత్వం మరియు మనోభావాలను వివరించండి...",

ayushAharaShaktiQuestion: "మీ ఆకలి మరియు జీర్ణశక్తిని ఎలా వివరిస్తారు?",
ayushAharaShaktiPlaceholder: "మీ ఆకలి, జీర్ణక్రియ మరియు ఆహారం తీసుకునే సామర్థ్యాన్ని వివరించండి...",

ayushVyayamaShaktiQuestion: "మీ శారీరక కార్యకలాపాల సామర్థ్యాన్ని ఎలా వివరిస్తారు?",
ayushVyayamaShaktiPlaceholder: "మీ వ్యాయామ సామర్థ్యం మరియు శారీరక కార్యకలాపాలను వివరించండి...",

ayushVayaQuestion: "మీ వయస్సు ఎంత మరియు మీ ప్రస్తుత జీవిత దశను ఎలా వివరిస్తారు?",
ayushVayaPlaceholder: "మీ వయస్సు మరియు సంబంధిత జీవిత దశ సమాచారాన్ని నమోదు చేయండి...",

ayushAharaViharaQuestion: "మీ ఆహారం, రోజువారీ దినచర్య, నిద్ర, కార్యకలాపాలు మరియు జీవనశైలి గురించి చెప్పండి.",
ayushAharaViharaPlaceholder: "మీ ఆహారపు అలవాట్లు, నిద్ర, వ్యాయామం, రోజువారీ దినచర్య మరియు జీవనశైలిని వివరించండి...",
ayushAnswersSaved: "మీ సమాధానాలు స్వయంచాలకంగా సేవ్ చేయబడతాయి. ముందుగా ఇచ్చిన సమాధానాలను సమీక్షించి సవరించడానికి",
ayushReviewEdit: "ను ఉపయోగించండి.",
  },
  hi: {
    tagline: "आपका स्वास्थ्य रिकॉर्ड, जहां भी आप हों",
    chooseLanguage: "अपनी भाषा चुनें",
    searchPlaceholder: "अपने लक्षण बताएं या कोई प्रश्न पूछें...",
  

    back: "वापस",
    welcome: "वापसी पर स्वागत है 👋",
    welcomeTo: "AROVIA में आपका स्वागत है",
    patientLogin: "मरीज़ लॉगिन",
    registrationTitle: "अपना AROVIA खाता बनाएं",
registrationDescription: "अपना डिजिटल स्वास्थ्य रिकॉर्ड शुरू करने के लिए एक बार पंजीकरण करें।",
fullName: "पूरा नाम",
enterFullName: "अपना पूरा नाम दर्ज करें",
abhaIdOptional: "ABHA ID",
optional: "वैकल्पिक",
enterAbhaNumber: "14 अंकों का ABHA नंबर दर्ज करें",
abhaIntegrationNote:
  "ABHA लिंकिंग एक इंटीग्रेशन चरण है। यह प्रोटोटाइप प्रवेश बिंदु को रिकॉर्ड करता है; वास्तविक ABDM लिंकिंग को बाद में बैकएंड से जोड़ा जा सकता है।",
createAccount: "खाता बनाएं",
privateProtected: "आपकी स्वास्थ्य जानकारी निजी और सुरक्षित है।",

aadhaarTitle: "आधार के साथ जारी रखें",
aadhaarDescription: "अपने स्वास्थ्य रिकॉर्ड तक पहुंचने के लिए 12 अंकों का आधार नंबर दर्ज करें।",
aadhaarNumber: "आधार नंबर",
aadhaarPlaceholder: "12 अंकों का आधार नंबर",

abhaTitle: "ABHA के साथ जारी रखें",
abhaDescription: "अपने स्वास्थ्य रिकॉर्ड को जोड़ने के लिए 14 अंकों का ABHA नंबर दर्ज करें।",
abhaNumber: "ABHA नंबर",
abhaPlaceholder: "14 अंकों का ABHA नंबर",

abdmFhirStatus: "ABDM / FHIR इंटीग्रेशन स्थिति",
abdmConnection: "ABDM कनेक्शन",
notConnected: "कनेक्ट नहीं है",
fhirRecord: "FHIR रिकॉर्ड",
readyForIntegration: "इंटीग्रेशन के लिए तैयार",
submissionStatus: "सबमिशन स्थिति",
notSubmitted: "सबमिट नहीं किया गया",
apiStatus: "API स्थिति",
awaitingBackend: "बैकएंड की प्रतीक्षा है",
continueButton: "जारी रखें",
    accessRecords: "अपने स्वास्थ्य रिकॉर्ड देखें",
    mobileNumber: "मोबाइल नंबर",
    enterMobile: "10 अंकों का नंबर दर्ज करें",
    sendOTP: "OTP भेजें",
    demoMode: "डेमो मोड • वास्तविक SMS नहीं भेजा जाएगा",
    privateInfo: "आपकी स्वास्थ्य जानकारी निजी और सुरक्षित है।",
    verifyNumber: "अपने नंबर की पुष्टि करें",
    otpSent: "अपने मोबाइल नंबर पर भेजा गया 6 अंकों का OTP दर्ज करें",
    enterOTP: "OTP दर्ज करें",
    verifyOTP: "OTP सत्यापित करें",
    demoOtp: "डेमो OTP: 123456",
    invalidPhone: "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
    incorrectOtp: "गलत OTP। डेमो के लिए 123456 का उपयोग करें।",
    hospitalClinicLabel: "अस्पताल / क्लिनिक",
doctorNameLabel: "डॉक्टर का नाम",
dateLabel: "तारीख",
diagnosisLabel: "निदान",
notesLabel: "नोट्स",
hospitalPlaceholder: "अस्पताल या क्लिनिक का नाम दर्ज करें",
doctorPlaceholder: "डॉक्टर का नाम दर्ज करें",
diagnosisPlaceholder: "निदान दर्ज करें",
    medicalHistory: "चिकित्सा इतिहास",
    viewPreviousRecords: "अपने पिछले चिकित्सा रिकॉर्ड देखें",
    diagnosis: "निदान",
    notes: "नोट्स",
    noNotes: "कोई अतिरिक्त नोट्स नहीं।",
    allergiesMedications: "एलर्जी और दवाएं",
    manageAllergies: "अपनी एलर्जी और वर्तमान दवाओं को प्रबंधित करें",
    allergies: "एलर्जी",
    noKnownAllergies: "कोई ज्ञात एलर्जी नहीं",
    noAllergiesAdded: "कोई एलर्जी नहीं जोड़ी गई",
    safe: "सुरक्षित",
    currentMedications: "वर्तमान दवाएं",
    add: "जोड़ें",
    addMedication: "दवा जोड़ें",
    medicineName: "दवा का नाम",
    dosage: "खुराक",
    frequency: "कितनी बार",
    remove: "हटाएं",
    addedToRecord: "आपके स्वास्थ्य रिकॉर्ड में जोड़ा गया",
    requiredMedication: "कृपया सभी दवा विवरण भरें।",
    addMedicationButton: "दवा जोड़ें",
    addRecord: "नया रिकॉर्ड जोड़ें",
    addRecordDescription: "वॉइस, कैमरा या मैन्युअल तरीके से अपना चिकित्सा रिकॉर्ड जोड़ें",
    speakRecord: "रिकॉर्ड बोलें",
    tellVisit: "अपनी चिकित्सा यात्रा के बारे में बताएं",
    listening: "सुन रहा है...",
    scanDocument: "दस्तावेज़ स्कैन करें",
    scanDocumentDescription: "प्रिस्क्रिप्शन या रिपोर्ट की फोटो लें",
    voiceInput: "वॉइस इनपुट",
    useThisInformation: "इस जानकारी का उपयोग करें",
    enterManually: "मैन्युअल रूप से दर्ज करें",
    recordType: "रिकॉर्ड प्रकार",
    hospitalClinic: "अस्पताल / क्लिनिक",
    doctorName: "डॉक्टर का नाम",
    date: "तारीख",
    enterHospital: "अस्पताल या क्लिनिक का नाम दर्ज करें",
    enterDoctor: "डॉक्टर का नाम दर्ज करें",
    enterDiagnosis: "निदान दर्ज करें",
    notesPlaceholder: "अतिरिक्त जानकारी दर्ज करें...",
    saveMedicalRecord: "चिकित्सा रिकॉर्ड सहेजें",
    requiredRecord: "कृपया सभी आवश्यक विवरण भरें।",
    cameraTitle: "चिकित्सा दस्तावेज़ स्कैन करें",
    documentInstruction: "प्रिस्क्रिप्शन, टेस्ट रिपोर्ट या चिकित्सा दस्तावेज़ की साफ़ फोटो लें।",
    medicalDocument: "चिकित्सा दस्तावेज़",
    extractAI: "AI से जानकारी निकालें",
    saveDocument: "दस्तावेज़ सहेजें",
    documentSaved: "चिकित्सा दस्तावेज़ अपलोड किया गया",
    documentNote: "कैमरा/फाइल अपलोड के माध्यम से दस्तावेज़ जोड़ा गया।",
    aiComing: "AI दस्तावेज़ एक्सट्रैक्शन अगली चरण में जोड़ा जाएगा।",
    healthID: "AROVIA स्वास्थ्य ID",
    showHealthID: "अपने रिकॉर्ड तक पहुंचने के लिए यह ID स्वास्थ्य कार्यकर्ता को दिखाएं",
    patient: "मरीज़",
    aroviaHealthID: "AROVIA स्वास्थ्य ID",
    howItWorks: "यह कैसे काम करता है",
    healthIDDescription: "स्वास्थ्य कार्यकर्ता इस कोड को स्कैन करके मरीज की पहचान कर सकते हैं और अधिकृत स्वास्थ्य रिकॉर्ड देख सकते हैं।",
    demoQR: "हैकाथॉन डेमो QR कोड। वास्तविक सिस्टम में यह ID एक सुरक्षित मरीज रिकॉर्ड प्रणाली से जुड़ी होगी।",
    symptomChecker: "लक्षण जांच",
    healthJourney: "स्वास्थ्य यात्रा",
    preConsultation: "प्री-कंसल्टेशन",
    preConsultationDescription:
    "स्वास्थ्य विशेषज्ञ से मिलने से पहले आप जो समस्या महसूस कर रहे हैं, उसके बारे में हमें बताएं।",
    preConsultationIntro:
  "आप जो समस्या महसूस कर रहे हैं, उसके बारे में हमें बताएं। आप बोल सकते हैं या टाइप कर सकते हैं।",

preConsultationDuration:
  "यह समस्या कब शुरू हुई?",

preConsultationSeverity:
  "1 से 10 के पैमाने पर यह समस्या कितनी गंभीर है?",

preConsultationSymptoms:
  "क्या इसके साथ आपको कोई अन्य लक्षण भी हो रहे हैं?",

preConsultationHistory:
  "क्या इस समस्या से संबंधित कोई महत्वपूर्ण चिकित्सा इतिहास है?",

preConsultationMedications:
  "क्या आप वर्तमान में कोई दवाएं ले रहे हैं?",

preConsultationAllergies:
  "क्या आपको कोई ज्ञात एलर्जी है?",
  preConsultationAssociatedSymptoms:
  "क्या आपको अपनी मुख्य समस्या के साथ कोई अन्य लक्षण भी महसूस हो रहे हैं?",

preConsultationFamilyHistory:
  "क्या आपके परिवार में मधुमेह, हृदय रोग, उच्च रक्तचाप या अन्य वंशानुगत बीमारियों का कोई महत्वपूर्ण चिकित्सा इतिहास है?",

preConsultationPersonalHistory:
  "क्या आप अपने व्यक्तिगत इतिहास के बारे में बता सकते हैं, जैसे धूम्रपान, शराब का सेवन, व्यवसाय, जीवनशैली या अन्य संबंधित आदतें?",

preConsultationReviewOfSystems:
  "क्या आपको अपने सामान्य स्वास्थ्य, हृदय, सांस लेने, पेट, तंत्रिका तंत्र या शरीर के अन्य हिस्सों से संबंधित कोई अन्य लक्षण हो रहे हैं?",

preConsultationRedFlags:
  "सुरक्षा जांच: क्या आपको अभी गंभीर सांस लेने में कठिनाई, तेज सीने में दर्द, बेहोशी, अचानक कमजोरी, दौरे या अनियंत्रित रक्तस्राव हो रहा है?",

readAloud: "ज़ोर से पढ़ें",
startSpeaking: "बोलना शुरू करें",
    preConsultationSummary: "प्री-कंसल्टेशन सारांश",

    reviewBeforeDoctor:
    "स्वास्थ्य विशेषज्ञ के साथ साझा करने से पहले जानकारी की समीक्षा करें।",

    preConsultationDisclaimer:
    "यह सारांश आपके द्वारा दी गई जानकारी को व्यवस्थित करता है। यह किसी बीमारी का निदान नहीं करता है।",

    done: "हो गया",

    you: "आप",
    recordGeneralConsultation: "सामान्य परामर्श",
recordBloodTest: "रक्त परीक्षण",
recordPrescription: "प्रिस्क्रिप्शन",
recordVaccination: "टीकाकरण",
recordOther: "अन्य",

hospitalClinicLabel: "अस्पताल / क्लिनिक",
doctorNameLabel: "डॉक्टर का नाम",
dateLabel: "तारीख",
diagnosisLabel: "निदान",
notesLabel: "नोट्स",

hospitalPlaceholder: "अस्पताल या क्लिनिक का नाम दर्ज करें",
doctorPlaceholder: "डॉक्टर का नाम दर्ज करें",
diagnosisPlaceholder: "निदान दर्ज करें",

medicalDocument: "चिकित्सा दस्तावेज़",
remove: "हटाएं",
aiReadingDocument: "AI आपका दस्तावेज़ पढ़ रहा है...",
extractingMedicalInformation: "चिकित्सा जानकारी निकाली जा रही है",
aiExtractedInformation: "AI द्वारा निकाली गई जानकारी",
reviewBeforeSaving: "सेव करने से पहले जानकारी की समीक्षा करें।",
saveMedicalRecord: "चिकित्सा रिकॉर्ड सेव करें",

voiceInput: "वॉइस इनपुट",
useThisInformation: "इस जानकारी का उपयोग करें",

    aroviaListening: "AROVIA सुन रहा है...",

    typeYourResponse: "अपना उत्तर टाइप करें...",
 
    startSpeaking: "बोलना शुरू करें",

    continue: "जारी रखें",
    yourHealthStory: "आपकी स्वास्थ्य कहानी",
    latestHealthEvent: "नवीनतम स्वास्थ्य घटना",
    viewDetails: "विवरण देखें",
    consultation: "चिकित्सा परामर्श",
    medication: "दवा",
    medicalReport: "चिकित्सा रिपोर्ट",
    diagnosisLabel: "निदान",
    doctorLabel: "डॉक्टर",
    dateLabel: "तारीख",
    notesLabel: "नोट्स",
    relatedMedication: "संबंधित दवा",
    relatedReport: "संबंधित रिपोर्ट",
    closeDetails: "विवरण बंद करें",
    healthStoryText: (count) =>
  `आपकी स्वास्थ्य यात्रा में परामर्श, दवाओं और चिकित्सा रिपोर्ट सहित ${count} स्वास्थ्य घटनाएं दर्ज हैं।`,
    symptomDescription: "अपने लक्षण बताएं और एक बुनियादी स्वास्थ्य सुझाव प्राप्त करें",
    whatFeeling: "आपको क्या महसूस हो रहा है?",
    symptomPlaceholder: "उदाहरण: मुझे बुखार, सिरदर्द और शरीर में दर्द है",
    checkSymptoms: "लक्षण जांचें",
    describeSymptoms: "कृपया अपने लक्षण बताएं।",
    emergencyMessage: "संभावित आपातकालीन लक्षण पाए गए हैं। तुरंत चिकित्सा सहायता लें।",
    feverMessage: "आपके लक्षणों के लिए चिकित्सा परामर्श आवश्यक हो सकता है। पानी पीते रहें और स्वास्थ्य विशेषज्ञ से बात करें।",
    generalSymptomMessage: "अपने लक्षणों के उचित मूल्यांकन के लिए स्वास्थ्य विशेषज्ञ से परामर्श करें।",
    symptomWarning: "यह एक डेमो सुविधा है और चिकित्सा निदान प्रदान नहीं करती। गंभीर या बिगड़ते लक्षणों के लिए तुरंत स्वास्थ्य विशेषज्ञ से संपर्क करें।",
    profile: "प्रोफ़ाइल",
    privacyPermissions: "गोपनीयता और अनुमतियां",
    manageAccess: "नियंत्रित करें कि स्वास्थ्य कार्यकर्ता क्या देख सकते हैं",
    medicalHistoryPermission: "चिकित्सा इतिहास",
    medicationsPermission: "दवाएं",
    allergiesPermission: "एलर्जी",
    labReportsPermission: "लैब रिपोर्ट",
    prescriptionsPermission: "प्रिस्क्रिप्शन",
    emergencyAccessPermission: "आपातकालीन पहुंच",
    savePermissions: "अनुमतियां सहेजें",
    permissionSaved: "आपकी अनुमतियां सहेज दी गई हैं.",
    manageAccount: "अपना AROVIA खाता प्रबंधित करें",
    patientName: "मरीज का नाम",
    phoneNumber: "फोन नंबर",
    healthIdLabel: "स्वास्थ्य ID",
    language: "भाषा",
    logout: "लॉग आउट",
    yourHealthRecord: "आपका स्वास्थ्य रिकॉर्ड",
    allInOnePlace: "सब कुछ एक ही जगह",
    records: "रिकॉर्ड",
    lastVisit: "अंतिम यात्रा",
    recent: "हाल का",
    registeredMobile: "पंजीकृत मोबाइल",
    yourHealth: "आपका स्वास्थ्य",
    previousRecordsShort: "अपने पिछले रिकॉर्ड देखें",
    manageMedicinesShort: "अपनी दवाएं प्रबंधित करें",
    uploadReports: "रिपोर्ट या प्रिस्क्रिप्शन अपलोड करें",
    checkYourSymptoms: "अपने लक्षण जांचें",
    home: "होम",
    symptoms: "लक्षण",
    voiceUnsupported: "इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है।",
    privateHealth: "AROVIA • सभी के लिए स्वास्थ्य सेवा",
    symptomSelectSeverity: "गंभीरता चुनें",
symptomMild: "हल्का",
symptomModerate: "मध्यम",
symptomSevere: "गंभीर",
addSymptom: "लक्षण जोड़ें",
summaryPatientDemographics: "रोगी का विवरण",
summaryPatientId: "रोगी ID",
summaryNotAvailable: "उपलब्ध नहीं",
summaryAbhaId: "ABHA ID",
summaryNotLinked: "लिंक नहीं किया गया",
summaryMainConcern: "मुख्य समस्या",
summaryNotProvided: "प्रदान नहीं किया गया",
summaryDuration: "अवधि",
summarySeverity: "गंभीरता",
summaryAssociatedSymptoms: "संबंधित लक्षण",

summaryAyushHistory: "आयुष इतिहास",
summaryDashavidhaLifestyle: "दशविध परीक्षा और जीवनशैली",
summaryAyushAssessmentInfo: "रोगी द्वारा प्रदान की गई आयुष मूल्यांकन जानकारी",

summaryPrakriti: "प्रकृति",
summaryVikriti: "विकृति",
summarySara: "सार",
summarySamhanana: "संहनन",
summaryPramana: "प्रमाण",
summarySatmya: "सात्म्य",
summarySattva: "सत्त्व",
summaryAharaShakti: "आहार शक्ति",
summaryVyayamaShakti: "व्यायाम शक्ति",
summaryVaya: "आयु",
summaryAharaVihara: "आहार और विहार",

summaryAyushDisclaimer:
  "यह जानकारी रोगी द्वारा वैकल्पिक आयुष मूल्यांकन के दौरान प्रदान की गई थी। इसकी समीक्षा योग्य स्वास्थ्य विशेषज्ञ द्वारा की जानी चाहिए।",

summaryPastSurgicalHistory: "पिछला शल्य चिकित्सा इतिहास",
summaryRelevantMedicalHistory: "प्रासंगिक चिकित्सा इतिहास",
summaryCurrentMedications: "वर्तमान दवाएँ",
summaryKnownAllergies: "ज्ञात एलर्जी",
summaryFamilyHistory: "पारिवारिक इतिहास",
summaryPersonalHistory: "व्यक्तिगत इतिहास",
summaryReviewOfSystems: "प्रणाली समीक्षा (ROS)",

summaryPatientDescription: "रोगी का विवरण",
summaryHpi: "वर्तमान बीमारी का इतिहास (HPI)",
summaryChiefComplaint: "मुख्य शिकायत",
summaryRelevantHistory: "प्रासंगिक इतिहास",
summarySafetyRedFlag: "सुरक्षा / रेड-फ्लैग जाँच",
summaryNotReported: "रिपोर्ट नहीं किया गया",

summaryEmergencyWarning:
  "आपातकालीन लक्षण बताए गए हैं — तुरंत चिकित्सा सहायता लें और स्वास्थ्य कर्मचारियों को सूचित करें।",
  aiClinicalSummaryDraft: "AI द्वारा तैयार क्लिनिकल सारांश — ड्राफ्ट",
aiAssistedHistory: "AI-सहायित इतिहास",
status: "स्थिति",
draft: "ड्राफ्ट",
editing: "संपादन",
confirmed: "पुष्टि की गई",
correctionRequested: "सुधार का अनुरोध किया गया",
edit: "संपादित करें",
acceptConfirm: "स्वीकार / पुष्टि करें",
rejectCorrection: "अस्वीकार / सुधार का अनुरोध करें",
aiSummaryDisclaimer:
  "यह रोगी द्वारा प्रदान की गई जानकारी के आधार पर AI द्वारा तैयार किया गया ड्राफ्ट है। यह निदान नहीं है और स्वास्थ्य विशेषज्ञ द्वारा इसकी समीक्षा की जानी चाहिए।",
  questionProgress: "प्रश्न",
ofText: "में से",
answered: "उत्तर दिए गए",
complete: "पूर्ण",
readAloud: "ज़ोर से पढ़ें",
aroviaLabel: "AROVIA",

medicineNameUnknown: "दवा का नाम नहीं पता?",
medicinePhotoInstruction:
  "दवा की स्ट्रिप, पैकेज या प्रिस्क्रिप्शन की फोटो लें।",
takePhotoUpload: "फोटो लें / अपलोड करें",
emergencyBackDashboard: "डैशबोर्ड पर वापस जाएँ",
emergencyAccessSettings: "आपातकालीन एक्सेस सेटिंग्स",
emergencyAccessDescription:
  "आपातकाल के दौरान अपनी महत्वपूर्ण स्वास्थ्य जानकारी तक पहुँच प्रबंधित करें।",
emergencyAccessLabel: "आपातकालीन एक्सेस",
enabled: "सक्षम",
emergencyCriticalInfo:
  "आपातकाल के दौरान महत्वपूर्ण स्वास्थ्य जानकारी तक पहुँच प्राप्त की जा सकती है।",
active: "सक्रिय",
criticalInfoAvailable: "उपलब्ध महत्वपूर्ण जानकारी",
bloodGroup: "ब्लड ग्रुप",
notAvailable: "उपलब्ध नहीं",
noKnownAllergies: "कोई ज्ञात एलर्जी नहीं",
medications: "दवाएँ",
accessControl: "एक्सेस नियंत्रण",
emergencyAccessIntended:
  "आपातकालीन एक्सेस तत्काल स्वास्थ्य स्थितियों के लिए है।",
disableEmergencyAccess: "आपातकालीन एक्सेस बंद करें",
enableEmergencyAccess: "आपातकालीन एक्सेस सक्षम करें",
currentStatus: "वर्तमान स्थिति",
recentAccessEvent: "हाल की एक्सेस घटना",
noEmergencyAccessEvent:
  "कोई आपातकालीन एक्सेस घटना दर्ज नहीं की गई है।",
  ayushDashavidhaTitle: "आयुष — दशविध परीक्षा",
ayurvedicClinicalAssessment: "आयुर्वेदिक क्लिनिकल मूल्यांकन",
question: "प्रश्न",
ofText: "में से",
answered: "उत्तर दिए गए",
complete: "पूर्ण",
previous: "पिछला",
next: "अगला",

takePhotoUpload: "फोटो लें / अपलोड करें",
dontKnowMedicine: "दवा का नाम नहीं पता?",
medicinePhotoInstruction: "दवा की स्ट्रिप, पैकेज या प्रिस्क्रिप्शन की फोटो लें।",
takePhotoUpload: "फोटो लें / अपलोड करें",
investigationMedicalReport: "जाँच / चिकित्सा रिपोर्ट",
procedureSurgery: "प्रक्रिया / सर्जरी",
consultation: "परामर्श",
editAyush: "आयुष संपादित करें",
    ayushHistory: "आयुष इतिहास",
    ayushHistoryDescription: "अपना आयुष स्वास्थ्य आकलन और दशविध परीक्षा पूरा करें।",
    settings: "सेटिंग्स",
    settingsDescription: "अपनी प्रोफ़ाइल, स्वास्थ्य जानकारी, गोपनीयता और प्राथमिकताओं को प्रबंधित करें।",
    personalMedicalInformation: "व्यक्तिगत और चिकित्सा जानकारी",
    personalMedicalInformationDescription: "अपनी व्यक्तिगत और चिकित्सा जानकारी प्रबंधित करें।",
    privacyConsent: "गोपनीयता और सहमति",
    privacyConsentDescription: "अपनी गोपनीयता, अनुमतियां और स्वास्थ्य सेवा एक्सेस प्रबंधित करें।",
demographicsTitle: "रोगी विवरण",
basicInformation: "मूल जानकारी",
lifestyleSocialHistory: "जीवनशैली और सामाजिक इतिहास",
personalBackground: "व्यक्तिगत पृष्ठभूमि",
menstrualHistoryTitle: "मासिक धर्म इतिहास",
gynaecologicalHistoryTitle: "स्त्री रोग संबंधी इतिहास",
obstetricHistoryTitle: "प्रसूति इतिहास",
saveAndContinue: "सेव करें और जारी रखें",
fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
agePlaceholder: "आयु",
selectOption: "चुनें",
female: "महिला",
male: "पुरुष",
intersex: "इंटरसेक्स",
preferNotToSay: "बताना पसंद नहीं करेंगे",
occupationJob: "व्यवसाय / नौकरी",
occupationPlaceholder: "छात्र, शिक्षक, किसान, इंजीनियर...",
dietLabel: "आहार",
selectDiet: "आहार चुनें",
vegetarian: "शाकाहारी",
nonVegetarian: "मांसाहारी",
vegan: "वीगन",
other: "अन्य",
physicalActivityLabel: "शारीरिक गतिविधि",
selectActivityLevel: "गतिविधि स्तर चुनें",
low: "कम",
moderate: "मध्यम",
high: "उच्च",
sleepLabel: "नींद",
sleepPlaceholder: "उदाहरण: 7 घंटे, अच्छी गुणवत्ता",
alcoholUse: "शराब का सेवन",
never: "कभी नहीं",
occasional: "कभी-कभी",
regular: "नियमित",
tobaccoSmoking: "तंबाकू / धूम्रपान",
former: "पहले करते थे",
otherSubstanceDrugUse: "अन्य पदार्थ / नशीली दवाओं का उपयोग",
substanceUsePlaceholder: "संबंधित पदार्थ के उपयोग का उल्लेख करें या 'नहीं' लिखें।",
ethnicityLabel: "जातीय पृष्ठभूमि",
religionLabel: "धर्म",
optional: "वैकल्पिक",
menstrualStatus: "मासिक धर्म की स्थिति",
notStarted: "अभी शुरू नहीं हुआ",
menopausal: "रजोनिवृत्त",
notApplicable: "लागू नहीं",
ageAtMenarche: "पहली माहवारी की आयु",
cycleDuration: "चक्र की अवधि",
cycleDurationPlaceholder: "उदाहरण: 28 दिन",
cycleRegularity: "चक्र की नियमितता",
cycleRegularityPlaceholder: "उदाहरण: हर 28 दिन में नियमित",
lastMenstrualPeriod: "अंतिम मासिक धर्म",
menopauseStatus: "रजोनिवृत्ति की स्थिति",
menopausePlaceholder: "वैकल्पिक / लागू नहीं",
gynaecologicalHistory: "स्त्री रोग संबंधी इतिहास",
gynaecologicalHistoryPlaceholder: "संबंधित स्थितियों, लक्षणों या इतिहास का उल्लेख करें।",
previousGynaecologicalProcedures: "पिछली स्त्री रोग संबंधी प्रक्रियाएं",
previousProceduresPlaceholder: "यदि कोई पिछली प्रक्रिया हुई हो तो उसका उल्लेख करें।",
obstetricHistory: "प्रसूति इतिहास",
pregnancyDeliveryHistory: "गर्भावस्था और प्रसव का इतिहास",
pregnancyStatus: "गर्भावस्था की स्थिति",
notPregnant: "गर्भवती नहीं",
currentlyPregnant: "वर्तमान में गर्भवती",
possiblyPregnant: "गर्भवती होने की संभावना",
postpartum: "प्रसवोत्तर",
gravida: "ग्रेविडा (G)",
para: "पैरा (P)",
abortions: "गर्भपात (A)",
livingChildren: "जीवित बच्चे (L)",
previousPregnancyComplications: "पिछली गर्भावस्था की जटिलताएं",
previousComplicationsPlaceholder: "पिछली जटिलताओं का उल्लेख करें या 'नहीं' लिखें।",
previousDeliveryDetails: "पिछले प्रसव का विवरण",
currentPregnancyDetails: "वर्तमान गर्भावस्था का विवरण",
currentPregnancyPlaceholder: "केवल वर्तमान गर्भावस्था या प्रासंगिक स्थिति में।",
saveAndContinue: "सेव करें और जारी रखें →",
demographicsReviewNote: "आप बाद में इस जानकारी की समीक्षा कर सकते हैं। जहां उचित हो, संवेदनशील विवरण वैकल्पिक हैं।",
patientInformation: "रोगी की जानकारी",
demographicsDescription: "अपने बारे में जानकारी दें ताकि आपके स्वास्थ्य विशेषज्ञ को आवश्यक पृष्ठभूमि की जानकारी मिल सके।",
abdmBackendNote: "लाइव ABDM/FHIR संचार बैकएंड के माध्यम से जोड़ा जाएगा.",

    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    yourAyushHealthHistory: "आपका आयुष स्वास्थ्य इतिहास",
    whatAssessmentCovers: "इस आकलन में क्या शामिल है",
    reviewAndEdit: "समीक्षा और संपादन",
    reviewEditDescription: "आकलन पूरा करने से पहले प्रश्नों के बीच जाएं और अपने उत्तरों को अपडेट करें।",
    optionalAssessment: "वैकल्पिक आकलन",
    optionalAssessmentDescription: "आप यह आकलन अपनी नियमित चिकित्सा परामर्श प्रक्रिया से अलग पूरा कर सकते हैं।",
    startAyushAssessment: "आयुष आकलन शुरू करें",
    completeAyushAssessment: "आयुष आकलन पूरा करें",
    ayushAnswersSaved: "आपके उत्तर अपने आप सेव हो जाते हैं। पहले के उत्तरों की समीक्षा और संपादन के लिए Previous का उपयोग करें।",
    trackNewSymptoms: "नए लक्षण दर्ज करें",
    trackNewSymptomsDescription: "बाद में विकसित होने वाले लक्षण जोड़ें ताकि आपका स्वास्थ्य विशेषज्ञ समय के साथ आपकी स्थिति में हुए बदलाव देख सके।",
    symptomTimeline: "लक्षण समयरेखा",
    symptomTimelineDescription: "देखें कि आपके लक्षण समय के साथ कैसे विकसित हुए।",
    addNewSymptom: "नया लक्षण जोड़ें",
    addNewSymptomDescription: "प्रारंभिक परामर्श के बाद विकसित हुए नए लक्षण के बारे में बताएं।",
    newSymptomQuestion: "आपको कौन सा नया लक्षण हुआ?",
    newSymptomPlaceholder: "उदाहरण: उल्टी",
    symptomStartedQuestion: "यह लक्षण वास्तव में कब शुरू हुआ?",
    symptomStartedNote: "वह समय दर्ज करें जब लक्षण शुरू हुआ था, न कि जब आप इसकी रिपोर्ट कर रहे हैं।",
    howSevere: "यह कितना गंभीर है?",
    tellUsMore: "और बताएं",
    symptomDetailsPlaceholder: "आपने और क्या देखा, उसका विवरण दें...",
    urgentSymptomsReported: "तत्काल लक्षण रिपोर्ट किए गए",
    noRedFlagSymptoms: "कोई रेड-फ्लैग लक्षण रिपोर्ट नहीं किया गया",
    safetyScreenDisclaimer: "यह सुरक्षा जांच है, निदान नहीं। स्वास्थ्य विशेषज्ञ को जानकारी की समीक्षा करनी चाहिए।",
    aiClinicalInterview: "AI क्लिनिकल इंटरव्यू",
    aiClinicalInterviewDescription: "अनुकूल प्रश्नों, वॉइस/टेक्स्ट इनपुट और सुरक्षा जांच के साथ मार्गदर्शित चिकित्सा इतिहास।",
    shareMedicalReport: "यह चिकित्सा रिपोर्ट साझा करें",
    chooseWhatHealthcareWorkersSee: "ठीक चुनें कि स्वास्थ्यकर्मी क्या देख सकते हैं।",
    manageSharing: "शेयरिंग प्रबंधित करें",
    sharingPreferencesSaved: "शेयरिंग प्राथमिकताएं सेव हो गई हैं।",
    saveSharingSettings: "शेयरिंग सेटिंग्स सेव करें",
    shared: "साझा",
    private: "निजी",
    consentStatus: "सहमति स्थिति",
    purpose: "उद्देश्य",
    consentPurposeText: "स्वास्थ्य सेवा, परामर्श, चिकित्सा रिकॉर्ड समीक्षा और आपातकालीन देखभाल।",
    accessState: "एक्सेस स्थिति",
    consentAccessStateText: "मरीज द्वारा नियंत्रित एक्सेस वर्तमान में सक्रिय है।",
    expiry: "समाप्ति",
    noConsentExpiry: "इस सहमति के लिए कोई समाप्ति निर्धारित नहीं है।",
    revokeConsent: "सहमति वापस लें",
    dataSharingControls: "डेटा साझा करने के नियंत्रण",
    chooseHealthCategories: "चुनें कि आपकी स्वास्थ्य जानकारी की कौन-सी श्रेणियां एक्सेस की जा सकती हैं।",
    allowed: "अनुमत",
    notAllowed: "अनुमत नहीं",
    recentAccessPatientControlled: "मरीज द्वारा नियंत्रित एक्सेस",
    consentActive: "सक्रिय",
    consentRevokeAlert: "सहमति वापस लेने का अनुरोध दर्ज किया गया है। अंतिम रूप देने से पहले स्वास्थ्य सेवा एक्सेस की समीक्षा की जानी चाहिए।",
    myDemographics: "मेरी मरीज जानकारी",
    myDemographicsDescription: "अपनी व्यक्तिगत, जीवनशैली, मासिक धर्म और प्रसूति स्वास्थ्य जानकारी प्रबंधित करें।",
    emergencyAccessCardDescription: "आपकी महत्वपूर्ण स्वास्थ्य जानकारी के आपातकालीन एक्सेस को नियंत्रित करें।",
    summaryNoneReported: "कोई नहीं बताया गया",
    symptomSaveRequired: "कृपया लक्षण और उसके शुरू होने का समय दर्ज करें।",
    patientSessionNotFound: "मरीज का सत्र नहीं मिला।",
    unableToSaveSymptom: "लक्षण सेव नहीं किया जा सका।",
    invalidAadhaar: "कृपया एक मान्य 12 अंकों का आधार नंबर दर्ज करें।",
   aadhaarProductionMessage:
  "प्रोडक्शन संस्करण में आधार सत्यापन एक सुरक्षित पहचान सेवा के माध्यम से जोड़ा जाएगा।",
  aadhaarPrototypeWarning:
  "इस प्रोटोटाइप में आधार सत्यापन लाइव नहीं है। आपका आधार नंबर वास्तव में सत्यापित या संग्रहीत नहीं किया जाता है।",
  irregular: "अनियमित",
  ayushAssessmentSaved: "आपका आयुष मूल्यांकन आपके स्वास्थ्य रिकॉर्ड में सहेज लिया गया है।",
  investigationDocumentDescription:
  "इस स्वास्थ्य रिकॉर्ड से संबंधित जांच दस्तावेज़।",
  keepInfoUpdated: "यह जानकारी अपडेट रखें ताकि स्वास्थ्यकर्मी आपकी दवाओं और एलर्जी को जल्दी समझ सकें।",
  dashavidhaPariksha: "दशविध परीक्षा",
dashavidhaParikshaDescription:
  "प्रकृति, विकृति, सार, संहनन, प्रमाण, सात्म्य, सत्त्व, आहार शक्ति, व्यायाम शक्ति और वय।",
aharaVihara: "आहार एवं विहार",
aharaViharaDescription:
  "आहार, दैनिक दिनचर्या, नींद, शारीरिक गतिविधि और जीवनशैली की जानकारी।",
  sex: "लिंग",
  consentRevocationMessage:
  "सहमति रद्द करने का अनुरोध दर्ज किया गया है। रद्द करने को अंतिम रूप देने से पहले स्वास्थ्य सेवा की पहुंच की समीक्षा की जानी चाहिए।",
  recentAccessEvent: "हाल की पहुंच घटना",
currentSharingPreferences:
  "आपकी वर्तमान साझाकरण प्राथमिकताएं सामान्य स्वास्थ्य सेवा पहुंच पर लागू की जा रही हैं।",
statusLabel: "स्थिति",
normalAccessEmergencyNote:
  "आपकी अनुमतियां सामान्य स्वास्थ्य सेवा पहुंच को नियंत्रित करती हैं। आपातकालीन पहुंच एक अलग डॉक्टर सत्यापन प्रक्रिया का पालन करेगी।",
  ayushPrakritiQuestion: "आपकी प्राकृतिक शारीरिक प्रकृति या प्रकृति क्या है?",
ayushPrakritiPlaceholder: "अपने प्राकृतिक शरीर प्रकार, आदतों और प्रवृत्तियों का वर्णन करें...",

ayushVikritiQuestion: "आप वर्तमान में किन बदलावों या असंतुलनों का अनुभव कर रहे हैं?",
ayushVikritiPlaceholder: "अपने वर्तमान स्वास्थ्य परिवर्तनों या असंतुलनों का वर्णन करें...",

ayushSaraQuestion: "आप अपने शरीर के ऊतकों की गुणवत्ता या ताकत का वर्णन कैसे करेंगे?",
ayushSaraPlaceholder: "अपने शरीर के ऊतकों की सामान्य गुणवत्ता और ताकत का वर्णन करें...",

ayushSamhananaQuestion: "आप अपने शरीर की बनावट और शारीरिक संरचना का वर्णन कैसे करेंगे?",
ayushSamhananaPlaceholder: "अपने शरीर की बनावट और शारीरिक संरचना का वर्णन करें...",

ayushPramanaQuestion: "आपकी लंबाई, वजन और शरीर के सामान्य अनुपात क्या हैं?",
ayushPramanaPlaceholder: "अपनी लंबाई, वजन और शरीर के अनुपात दर्ज करें...",

ayushSatmyaQuestion: "कौन से खाद्य पदार्थ, दिनचर्या या आदतें आपके शरीर के लिए अनुकूल हैं?",
ayushSatmyaPlaceholder: "अपने लिए अनुकूल खाद्य पदार्थों, दिनचर्या, जलवायु या आदतों का वर्णन करें...",

ayushSattvaQuestion: "आप अपनी मानसिक और भावनात्मक स्थिति का वर्णन कैसे करेंगे?",
ayushSattvaPlaceholder: "अपने मूड, तनाव, भावनात्मक स्थिरता और मानसिक स्थिति का वर्णन करें...",

ayushAharaShaktiQuestion: "आप अपनी भूख और पाचन क्षमता का वर्णन कैसे करेंगे?",
ayushAharaShaktiPlaceholder: "अपनी भूख, पाचन और भोजन करने की क्षमता का वर्णन करें...",

ayushVyayamaShaktiQuestion: "आप अपनी शारीरिक गतिविधि की क्षमता का वर्णन कैसे करेंगे?",
ayushVyayamaShaktiPlaceholder: "अपनी व्यायाम सहनशीलता और शारीरिक गतिविधियों का वर्णन करें...",

ayushVayaQuestion: "आपकी उम्र क्या है और आप अपने वर्तमान जीवन चरण का वर्णन कैसे करेंगे?",
ayushVayaPlaceholder: "अपनी उम्र और संबंधित जीवन चरण की जानकारी दर्ज करें...",

ayushAharaViharaQuestion: "अपने आहार, दैनिक दिनचर्या, नींद, गतिविधियों और जीवनशैली के बारे में बताएं।",
ayushAharaViharaPlaceholder: "अपनी खान-पान की आदतों, नींद, व्यायाम, दैनिक दिनचर्या और जीवनशैली का वर्णन करें...",
ayushAnswersSaved: "आपके उत्तर स्वचालित रूप से सहेजे जाते हैं। पहले दिए गए उत्तरों की समीक्षा और उन्हें संपादित करने के लिए",
ayushReviewEdit: "का उपयोग करें।",
  },
};

function App() {
 
  
  const [language, setLanguage] = useState("en"); 
  const [page, setPage] = useState("home");
  const [aadhaarNumber, setAadhaarNumber] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [emergencyReason, setEmergencyReason] = useState("");
const [emergencyStatus, setEmergencyStatus] = useState("Not Requested");
const [emergencyAccessEvent, setEmergencyAccessEvent] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [patient, setPatient] = useState(null);
  const [allergiesMedications, setAllergiesMedications] = useState([]);
  const [medicalHistoryRecords, setMedicalHistoryRecords] = useState([]);
  // Clinical Interview
const [clinicalConcern, setClinicalConcern] = useState("");
const [clinicalAnswers, setClinicalAnswers] = useState({});
const [clinicalQuestionIndex, setClinicalQuestionIndex] = useState(0);
const [clinicalInterviewStarted, setClinicalInterviewStarted] = useState(false);

const speakQuestion = (text, language = "en-IN") => {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
};

// Symptom timeline
const [symptomTimeline, setSymptomTimeline] = useState([]);
const [editingSymptomIndex, setEditingSymptomIndex] = useState(null);

// New symptom
const [newSymptom, setNewSymptom] = useState({
  name: "",
  startedAt: "",
  severity: "",
  details: ""
});

// Interim guidance
const [interimGuidance, setInterimGuidance] = useState([]);
  const [abhaId, setAbhaId] = useState("");
  const [registrationName, setRegistrationName] = useState("");
  const [registrationPhone, setRegistrationPhone] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const healthId = phone
  ? `AROVIA-${phone.replace(/\D/g, "").slice(-4)}`
  : "AROVIA-0000";

  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const detectClinicalConcern = (text) => {
  const value = text.toLowerCase();

  if (
    value.includes("vomit") ||
    value.includes("throwing up")
  ) {
    return "vomiting";
  }

  if (
    value.includes("stomach") ||
    value.includes("abdomen") ||
    value.includes("abdominal") ||
    value.includes("belly")
  ) {
    return "stomach";
  }

  if (
    value.includes("chest") ||
    value.includes("chest pain")
  ) {
    return "chest";
  }

  if (
    value.includes("headache") ||
    value.includes("head pain")
  ) {
    return "headache";
  }

  if (
    value.includes("cough") ||
    value.includes("coughing")
  ) {
    return "cough";
  }

  if (
    value.includes("fever") ||
    value.includes("temperature")
  ) {
    return "fever";
  }

  return "general";
};
const [aiSummaryStatus, setAiSummaryStatus] = useState("draft");
    // ==================================================
  // PRE-CONSULTATION ASSISTANT
  // ==================================================

  const [preConsultationStep, setPreConsultationStep] =
    useState("intro");

  const [preConsultationInput, setPreConsultationInput] =
    useState("");
const [medicinePhoto, setMedicinePhoto] = useState(null);
  const [preConsultationAnswers, setPreConsultationAnswers] =
  useState({
    complaint: "",
    duration: "",
    severity: "",
    associatedSymptoms: "",
    relevantHistory: "",
    pastSurgicalHistory: "",
    medications: "",
    allergies: "",
    familyHistory: "",
    personalHistory: "",
    reviewOfSystems: "",
    redFlags: "",

    ayushHistory: {},
  });
const [ayushAnswers, setAyushAnswers] = useState({
  prakriti: "",
  vikriti: "",
  sara: "",
  samhanana: "",
  pramana: "",
  satmya: "",
  sattva: "",
  aharaShakti: "",
  vyayamaShakti: "",
  vaya: "",
  aharaVihara: "",
});
const [patientDemographics, setPatientDemographics] = useState({
  name: "",
  age: "",
  sex: "",
  occupation: "",
  diet: "",
  physicalActivity: "",
  sleep: "",
  alcohol: "",
  tobacco: "",
  substanceUse: "",
  ethnicity: "",
  religion: "",

  // Menstrual History
  menstrualStatus: "",
  menarcheAge: "",
  menstrualRegularity: "",
  cycleDuration: "",
  lastMenstrualPeriod: "",
  menopauseStatus: "",

  // Gynaecological History
  gynecologicalHistory: "",
  gynecologicalProcedures: "",

  // Obstetric History
  pregnancyStatus: "",
  gravida: "",
  para: "",
  abortions: "",
  livingChildren: "",
  previousPregnancyComplications: "",
  previousDeliveryDetails: "",
  currentPregnancyDetails: "",
});
const [ayushMode, setAyushMode] = useState(false);
const [ayushQuestionIndex, setAyushQuestionIndex] = useState(0);
const [ayushLanding, setAyushLanding] = useState(false);
  const [preConsultationMessages, setPreConsultationMessages] =
    useState([]);

  const [preConsultationSummary, setPreConsultationSummary] =
    useState("");

  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
 
  const [permissions, setPermissions] = useState({
  medicalHistory: true,
  medications: true,
  allergies: true,
  labReports: false,
  prescriptions: true,
  emergencyAccess: true,
  ayushHistory: true,
});
const clinicalQuestionBank = {
  fever: [
    "When did your fever start?",
    "What is the highest temperature you have measured?",
    "Do you have chills or sweating?",
    "Do you have headache or body aches?",
    "Do you have cough, sore throat, or difficulty breathing?",
    "Do you have nausea, vomiting, or diarrhea?",
    "Have you taken any medicine for the fever?"
  ],

  headache: [
    "When did the headache start?",
    "Where exactly do you feel the pain?",
    "How severe is the headache from 1 to 10?",
    "Is the pain continuous or does it come and go?",
    "Do you have nausea or vomiting?",
    "Do you have blurred vision or sensitivity to light?",
    "Have you experienced this type of headache before?"
  ],

  cough: [
    "When did your cough start?",
    "Is your cough dry or are you producing mucus?",
    "If you have mucus, what does it look like?",
    "Do you have fever?",
    "Do you have chest pain or difficulty breathing?",
    "Does anything make the cough better or worse?"
  ],

  stomach: [
    "Where exactly is the stomach pain?",
    "When did the pain start?",
    "How severe is the pain from 1 to 10?",
    "Is the pain continuous or does it come and go?",
    "Does eating make the pain better or worse?",
    "Do you have nausea or vomiting?",
    "Do you have diarrhea or constipation?",
    "Have you noticed blood in your vomit or stool?"
  ],

  vomiting: [
    "When did the vomiting start?",
    "How many times have you vomited?",
    "Are you able to keep water or other fluids down?",
    "Do you have stomach pain?",
    "Do you have fever or diarrhea?",
    "Have you noticed blood in the vomit?",
    "Do you feel dizzy or unusually weak?"
  ],

  chest: [
    "When did the chest pain start?",
    "Where exactly is the pain?",
    "How severe is it from 1 to 10?",
    "What does the pain feel like?",
    "Does physical activity make it worse?",
    "Are you having difficulty breathing?",
    "Do you have sweating, dizziness, or fainting?"
  ]
};

const getSpeechLanguage = () => {
  if (language === "Telugu") return "te-IN";
  if (language === "Hindi") return "hi-IN";
  return "en-IN";
};



  const [medicalHistoryPermissions, setMedicalHistoryPermissions] =
  useState({
    diagnoses: true,
    visitDates: true,
    hospitalClinic: true,
    doctorName: true,
    doctorNotes: false,
    previousReports: false,
    labResults: true,
  });

  const [documentProcessing, setDocumentProcessing] = useState(false);
  const [documentReady, setDocumentReady] = useState(false);

  // ==================================================
  // MEDICATIONS
  // ==================================================

  

  const [showAddMedication, setShowAddMedication] = useState(false);
  const [medications, setMedications] = useState([]);

  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });

  // ==================================================
  // MEDICAL RECORDS
  // ==================================================

  const [medicalRecords, setMedicalRecords] = useState([
    {
      type: "General Consultation",
      hospital: "City Health Centre",
      date: "12 Aug 2026",
      diagnosis: "Routine health consultation",
      notes: "Routine health consultation and examination.",
    },
    {
      type: "Blood Test",
      hospital: "District Hospital",
      date: "28 Jul 2026",
      diagnosis: "Blood test",
      notes: "Blood test report added to your health record.",
    },
  ]);

  const [newRecord, setNewRecord] = useState({
    type: "General Consultation",
    hospital: "",
    date: "",
    diagnosis: "",
    notes: "",
  });

  // Medical-record sharing controls
  const [expandedJourneyEvent, setExpandedJourneyEvent] = useState(null);
  const [savedConsultations, setSavedConsultations] = useState([]);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(null);
  const [showRecordSharing, setShowRecordSharing] = useState(false);
  const [recordSharing, setRecordSharing] = useState({});

  const t = translations[language];

  // Restore the patient session when the page is refreshed.
useEffect(() => {
  try {
   const savedSession = localStorage.getItem("arovia_patient_session") || sessionStorage.getItem("arovia_patient_session");

    if (savedSession) {
      const session = JSON.parse(savedSession);

     if (session?.patientId && session?.phone) {
  setPatientId(session.patientId);
  setPhone(session.phone);
  setAbhaId(session.abhaId || "");
  setPage("patient-dashboard");
}
    }
  } catch (error) {
    console.error("Unable to restore patient session:", error);
    localStorage.removeItem("arovia_patient_session");
    sessionStorage.removeItem("arovia_patient_session");
  } finally {
    setAuthLoading(false);
  }
}, []);
  useEffect(() => {
  if (!patientId) {
    return;
  }

  const loadMedicalRecords = async () => {
    const { data, error } = await supabase
      .from("medical_records")
      .select("*")
      .eq("patient_id", patientId);

    if (error) {
      console.error("Medical records error:", error);
      return;
    }

   setMedicalRecords(
  (data || []).map((record) => ({
    type: record.record_type || record.title || "Medical Record",
    hospital: "AROVIA Healthcare",
    date: record.record_date
      ? new Date(record.record_date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Date not available",
    diagnosis: record.diagnosis || record.title || "Not provided",
    notes:
      record.notes ||
      record.description ||
      "No notes available",
  }))
);
  };

  loadMedicalRecords();
}, [patientId]);
useEffect(() => {
  if (!patientId) {
    return;
  }

  const loadPatientProfile = async () => {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single();

    if (error) {
      console.error("Patient profile error:", error);
      return;
    }

  setPatient(data);
console.log("PATIENT PROFILE:", data);
  };

  loadPatientProfile();
}, [patientId]);
useEffect(() => {
  if (!patientId) {
    return;
  }

  const loadAllergiesMedications = async () => {
    const { data, error } = await supabase
      .from("allergies_medications")
      .select("*")
      .eq("patient_id", patientId);

    if (error) {
      console.error("Allergies & medications error:", error);
      return;
    }

    const records = data || [];

    setAllergiesMedications(records);

    setMedications(
      records
        .filter((item) => item.item_type === "medication")
        .map((item) => ({
          id: item.id,
          name: item.name || "",
          dosage: item.dosage || "",
          frequency: item.frequency || "",
        }))
    );

    console.log("ALLERGIES & MEDICATIONS:", records);
  };

  loadAllergiesMedications();
}, [patientId]);

useEffect(() => {
  if (!patientId) {
    return;
  }

  const loadMedicalHistory = async () => {
    const { data, error } = await supabase
      .from("medical_history")
      .select("*")
      .eq("patient_id", patientId)
      .order("diagnosis_date", { ascending: false });

    if (error) {
      console.error("Medical history error:", error);
      return;
    }

    setMedicalHistoryRecords(data || []);

    console.log("MEDICAL HISTORY:", data);
  };

  loadMedicalHistory();
}, [patientId]);
  // ==================================================
  // HEALTH JOURNEY
  // ==================================================

  const healthJourneyEvents = [
    {
      id: "history-2024",
      date: "15 Jun 2024",
      sortDate: "2024-06-15",
      year: "2024",
      type: "condition",
      title: "Fever Consultation",
      hospital: "City Health Centre",
      diagnosis: "Viral fever",
      notes: "Patient consulted for fever and weakness.",
      medication: "Paracetamol 500 mg",
      report: "",
    },

    {
      id: "history-2025",
      date: "10 Mar 2025",
      sortDate: "2025-03-10",
      year: "2025",
      type: "condition",
      title: "Hypertension Diagnosis",
      hospital: "District Hospital",
      diagnosis: "Hypertension",
      notes: "Blood pressure was elevated during consultation.",
      medication: "Amlodipine 5 mg once daily",
      report: "",
    },
...symptomTimeline.map((symptom, index) => ({
  id: `symptom-${index}`,
  date: new Date(symptom.startedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  sortDate: symptom.startedAt,
  year: new Date(symptom.startedAt).getFullYear().toString(),
  type: "condition",
  title: `Symptom: ${symptom.symptom}`,
  hospital: "Patient Reported",
  diagnosis: "",
  notes: symptom.details || "Symptom reported by patient.",
 medication: "",
  report: "",
})),
    ...medicalRecords.map((record, index) => {
      const lowerType = record.type.toLowerCase();

   
   let eventType = "consultation";

if (
  lowerType.includes("blood") ||
  lowerType.includes("test") ||
  lowerType.includes("report") ||
  lowerType.includes("document") ||
  lowerType.includes("investigation")
) {
  eventType = "medicalReport";
}

if (lowerType.includes("prescription")) {
  eventType = "prescription";
}

if (
  lowerType.includes("medication") ||
  lowerType.includes("medicine") ||
  lowerType.includes("drug")
) {
  eventType = "medication";
}

if (
  lowerType.includes("surgery") ||
  lowerType.includes("surgical") ||
  lowerType.includes("procedure") ||
  lowerType.includes("operation")
) {
  eventType = "procedure";
}
      return {
        id: `record-${index}`,
        date: record.date,
        sortDate: new Date(record.date).toISOString(),
        year: new Date(record.date).getFullYear().toString(),
        addedAt: record.addedAt || null,
        type: eventType,
        title: record.type,
        hospital: record.hospital,
        doctor: record.doctor,
        diagnosis: record.diagnosis,
        notes: record.notes,
       medication: record.medication || "",
        report: record.type,
      };
    }),
    ...(Object.values(preConsultationAnswers.ayushHistory || {}).some(
  (answer) => answer && answer.trim()
)
  ? [
      {
        id: "ayush-assessment",
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        sortDate: new Date().toISOString(),
        year: new Date().getFullYear().toString(),
        type: "ayush",
        title: "{t.ayushHistory}",
        hospital: "AROVIA AYUSH History",
        diagnosis: "",
        notes: "AYUSH Dashavidha Pariksha assessment completed.",
        medication: "",
        report: "",
        ayushHistory: preConsultationAnswers.ayushHistory,
      },
    ]
  : []),
    ...savedConsultations.map((consultation) => ({
      id: consultation.id,
      date: new Date(consultation.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      sortDate: consultation.date,
      year: new Date(consultation.date).getFullYear().toString(),
      type: "consultation",
      title: consultation.title,
      hospital: "AROVIA Pre-Consultation",
      diagnosis: "",
      notes: consultation.notes,
      medication: consultation.medication || "",
      report: "",
    })),
    
  ].sort(
    (a, b) =>
      new Date(b.sortDate).getTime() -
      new Date(a.sortDate).getTime()
  );

  const latestJourneyRecord =
    medicalRecords.length > 0
      ? medicalRecords[medicalRecords.length - 1]
      : null;
      

  const getJourneyIcon = (type) => {
    if (type === "medication") {
      return <Pill size={24} />;
    }

    if (type === "medicalReport") {
      return <FileText size={24} />;
    }

    if (type === "prescription") {
      return <ClipboardList size={24} />;
    }

    if (type === "condition") {
      return <Activity size={24} />;
    }

      if (type === "procedure") {
  return <Activity size={24} />;
}
    
if (type === "ayush") {
  return <span className="text-xl">🌿</span>;
}
    return <Stethoscope size={24} />;
  };

  const getJourneyIconStyle = (type) => {
    if (type === "medication") {
      return "bg-orange-50 text-orange-600";
    }

    if (type === "medicalReport") {
      return "bg-blue-50 text-blue-600";
    }

    if (type === "prescription") {
      return "bg-purple-50 text-purple-600";
    }

if (type === "condition") {
  return "bg-amber-50 text-amber-600";
}

if (type === "ayush") {
  return "bg-green-50 text-green-600";
}

return "bg-teal-50 text-teal-600";
  };
  // ==================================================
// VOICE INPUT
// ==================================================

const startVoiceInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(t.voiceUnsupported);
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

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onresult = (event) => {
    setQuery(event.results[0][0].transcript);
  };

  recognition.onerror = () => {
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.start();
};

// ==================================================
// PRE-CONSULTATION VOICE INPUT
// ==================================================

const startPreConsultationVoice = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(t.voiceUnsupported);
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

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onresult = (event) => {
    const transcript =
      event.results[0][0].transcript;

    setPreConsultationInput(transcript);
  };

  recognition.onerror = () => {
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.start();
};

  // ==================================================
  // PATIENT AUTH LOADING
  // ==================================================

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-md">A</div>
          <p className="mt-4 text-sm font-medium text-slate-500">Loading your secure session...</p>
        </div>
      </div>
    );
  }

  // ==================================================
  // PATIENT REGISTRATION
  // ==================================================

  if (page === "patient-register") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
          <button onClick={() => setPage("patient-login")} className="flex items-center gap-2 self-start text-sm font-semibold text-teal-700">
            <ArrowLeft size={18} /> {t.back}
          </button>

          <div className="mt-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-md">A</div>
           <h1 className="mt-5 text-3xl font-bold">{t.registrationTitle}</h1>
            <p className="mt-2 text-sm text-slate-500">{t.registrationDescription}</p>
          </div>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">{t.fullName}</label>
            <input value={registrationName} onChange={(e) => setRegistrationName(e.target.value)} placeholder={t.enterFullName} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600" />

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">{t.mobileNumber}</label>
            <div className="flex overflow-hidden rounded-xl border border-slate-200">
              <span className="flex items-center border-r border-slate-200 px-3 text-sm text-slate-500">+91</span>
              <input type="tel" value={registrationPhone} onChange={(e) => setRegistrationPhone(e.target.value.replace(/\D/g, ""))} maxLength="10" placeholder="Enter 10-digit number" className="min-w-0 flex-1 px-3 py-3 outline-none" />
            </div>

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
  {t.abhaIdOptional} <span className="font-normal text-slate-400">({t.optional})</span>
</label>
            <input value={abhaId} onChange={(e) => setAbhaId(e.target.value.replace(/\D/g, "").slice(0, 14))} inputMode="numeric" maxLength="14" placeholder={t.enterAbhaNumber} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600" />
            <p className="mt-2 text-xs leading-5 text-slate-400">ABHA linking is an integration step. This prototype records the entry point; live ABDM linking can be connected by the backend later.</p>

            <button
              onClick={async () => {
                if (!registrationName.trim()) { alert("Please enter your full name."); return; }
                if (registrationPhone.length !== 10) { alert(t.invalidPhone); return; }
                if (abhaId && abhaId.length !== 14) { alert("{t.summaryAbhaId} should contain 14 digits."); return; }

                const { data: existing, error: lookupError } = await supabase.from("patients").select("id, full_name, phone").eq("phone", registrationPhone).maybeSingle();
                if (lookupError) { console.error("Registration lookup error:", lookupError); alert("Unable to connect to patient records."); return; }

                if (existing) {
                  setPhone(registrationPhone);
                  setPatientId(existing.id);
                  localStorage.setItem("arovia_patient_session", JSON.stringify({ patientId: existing.id, phone: registrationPhone, abhaId }));
                  setPage("patient-demographics");
                  return;
                }

                const { data, error } = await supabase.from("patients").insert({ full_name: registrationName.trim(), phone: registrationPhone }).select("id, full_name, phone").single();
                if (error) { console.error("Registration error:", error); alert("Unable to create your patient account."); return; }

                setPhone(registrationPhone);
                setPatientId(data.id);
                localStorage.setItem("arovia_patient_session", JSON.stringify({ patientId: data.id, phone: registrationPhone, abhaId }));
                setPage("patient-demographics");
              }}
              className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-teal-700"
            >
              {t.createAccount}
            </button>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-slate-400">{t.privateProtected}</p>
        </main>
      </div>
    );
  }
// ==================================================
// AADHAAR ENTRY POINT
// ==================================================

if (page === "aadhaar-entry") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">

        <button
          onClick={() => setPage("patient-login")}
          className="flex items-center gap-2 self-start text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <div className="mt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-md">
            A
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {t.aadhaarTitle}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {t.aadhaarDescription}
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">

         <label className="mb-2 block text-sm font-semibold text-slate-700">
  {t.aadhaarNumber}
</label>

          <input
            type="password"
            value={aadhaarNumber}
            onChange={(e) =>
              setAadhaarNumber(
                e.target.value.replace(/\D/g, "").slice(0, 12)
              )
            }
            inputMode="numeric"
            maxLength="12"
           placeholder={t.aadhaarPlaceholder}
            className="w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-xl tracking-wider outline-none focus:border-teal-600"
          />

          <button
            onClick={() => {
              if (aadhaarNumber.length !== 12) {
                alert("Please enter a valid 12-digit Aadhaar number.");
                return;
              }

             alert(t.aadhaarProductionMessage);
            }}
            className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md hover:bg-teal-700"
          >
           {t.continueButton}
          </button>

          <div className="mt-5 rounded-xl bg-amber-50 p-3 text-center text-xs leading-5 text-amber-700">
            {t.aadhaarPrototypeWarning}
          </div>

        </div>
      </main>
    </div>
  );
}
  // ==================================================
  // ABHA ENTRY POINT
  // ==================================================

  if (page === "abha-entry") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
          <button onClick={() => setPage("patient-login")} className="flex items-center gap-2 self-start text-sm font-semibold text-teal-700"><ArrowLeft size={18} /> {t.back}</button>
          <div className="mt-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-md">A</div>
            <h1 className="mt-5 text-3xl font-bold">{t.abhaTitle}</h1>
<p className="mt-2 text-sm text-slate-500">{t.abhaDescription}</p>
          </div>
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
  {t.abhaNumber}
</label>
            <input value={abhaId} onChange={(e) => setAbhaId(e.target.value.replace(/\D/g, "").slice(0, 14))} inputMode="numeric" maxLength="14" placeholder={t.abhaPlaceholder}className="w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-xl tracking-wider outline-none focus:border-teal-600" />
            <button onClick={() => { if (abhaId.length !== 14) { alert("Please enter a valid 14-digit ABHA number."); return; } setPage("patient-register"); }} className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md hover:bg-teal-700">{t.continueButton}</button>
           <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
  <p className="text-sm font-bold text-slate-800">
   {t.abdmFhirStatus}
  </p>

  <div className="mt-3 space-y-2 text-xs">
    <div className="flex justify-between">
      <span className="text-slate-500">{t.abdmConnection}</span>
      <span className="font-semibold text-amber-600">
        {t.notConnected}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">{t.fhirRecord}</span>
      <span className="font-semibold text-teal-600">
        {t.readyForIntegration}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">{t.submissionStatus}</span>
      <span className="font-semibold text-slate-600">
       {t.notSubmitted}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">{t.apiStatus}</span>
      <span className="font-semibold text-amber-600">
      {t.awaitingBackend}
      </span>
    </div>
  </div>

  <p className="mt-3 rounded-xl bg-amber-50 p-3 text-center leading-5 text-amber-700">
    {t.abdmBackendNote}
  </p>
</div>
          </div>
        </main>
      </div>
    );
  }
// ==================================================
// PATIENT DEMOGRAPHICS
// ==================================================

if (page === "patient-demographics") {
  const updateDemographic = (field, value) => {
    setPatientDemographics((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFemale =
    patientDemographics.sex.toLowerCase() === "female";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-2xl px-5 py-8">

        {/* BACK */}
        <button
          onClick={() => setPage("patient-dashboard")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        {/* HEADER */}
        <div className="mt-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <User size={28} />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-teal-600">
  {t.patientInformation}
</p>

          <h1 className="mt-2 text-3xl font-bold">
            {t.summaryPatientDemographics}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
           {t.demographicsDescription}
          </p>
        </div>

        {/* BASIC INFORMATION */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">
            {t.basicInformation}
          </h2>

          <div className="mt-5 space-y-5">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
               {t.fullName}
              </label>

              <input
                type="text"
                value={patientDemographics.name}
                onChange={(e) =>
                  updateDemographic("name", e.target.value)
                }
                placeholder={t.fullNamePlaceholder}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* AGE + SEX */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {t.age}
                </label>

                <input
                  type="number"
                  min="0"
                  max="120"
                  value={patientDemographics.age}
                  onChange={(e) =>
                    updateDemographic("age", e.target.value)
                  }
                  placeholder={t.agePlaceholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                   {t.sex}
                </label>

                <select
                  value={patientDemographics.sex}
                  onChange={(e) =>
                    updateDemographic("sex", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">{t.selectOption}</option>
                  <option value="Female">{t.female}</option>
                  <option value="Male">{t.male}</option>
                  <option value="Intersex">{t.intersex}</option>
                  <option value="Prefer not to say">
                    {t.preferNotToSay}
                  </option>
                </select>
              </div>

            </div>

            {/* OCCUPATION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {t.occupationJob}
              </label>

              <input
                type="text"
                value={patientDemographics.occupation}
                onChange={(e) =>
                  updateDemographic(
                    "occupation",
                    e.target.value
                  )
                }
                placeholder={t.occupationPlaceholder}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

          </div>
        </div>

        {/* LIFESTYLE */}
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">
           {t.lifestyleSocialHistory}
          </h2>

          <div className="mt-5 space-y-5">

            {/* DIET */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {t.dietLabel}
              </label>

              <select
                value={patientDemographics.diet}
                onChange={(e) =>
                  updateDemographic("diet", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-500"
              >
               → <option value="">{t.selectDiet}</option>
                <option value="Vegetarian">{t.vegetarian}</option>
                <option value="Non-vegetarian">{t.nonVegetarian}</option>
                <option value="Vegan">{t.vegan}</option>
                <option value="Other">{t.other}</option>
              </select>
            </div>

            {/* ACTIVITY */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
              {t.physicalActivityLabel} 
              </label>

              <select
                value={patientDemographics.physicalActivity}
                onChange={(e) =>
                  updateDemographic(
                    "physicalActivity",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-500"
              >
                <option value="">{t.selectActivityLevel}</option>
              <option value="Low">{t.low}</option>
                <option value="Moderate">{t.moderate}</option>
                 <option value="High">{t.high}</option>
              </select>
            </div>

            {/* SLEEP */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
              {t.sleepLabel}
              </label>

              <input
                type="text"
                value={patientDemographics.sleep}
                onChange={(e) =>
                  updateDemographic("sleep", e.target.value)
                }
               placeholder={t.sleepPlaceholder}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* ALCOHOL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {t.alcoholUse}
              </label>

              <select
                value={patientDemographics.alcohol}
                onChange={(e) =>
                  updateDemographic("alcohol", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-500"
              >
                <option value="">{t.selectOption}</option>
               <option value="Never">{t.never}</option>
               <option value="Occasional">{t.occasional}</option>
               <option value="Regular">{t.regular}</option>
               <option value="Prefer not to say">
  {t.preferNotToSay}
</option>
              </select>
            </div>

            {/* TOBACCO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {t.tobaccoSmoking}
              </label>

              <select
                value={patientDemographics.tobacco}
                onChange={(e) =>
                  updateDemographic("tobacco", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-500"
              >
                <option value="">{t.selectOption}</option>
                <option value="Never">{t.never}</option>
                <option value="Former">{t.former}</option>
                <option value="Current">{t.current}</option>
                <option value="Prefer not to say">
                  {t.preferNotToSay}
                </option>
              </select>
            </div>

            {/* OTHER SUBSTANCE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {t.otherSubstanceDrugUse}
              </label>

              <textarea
                value={patientDemographics.substanceUse}
                onChange={(e) =>
                  updateDemographic(
                    "substanceUse",
                    e.target.value
                  )
                }
                placeholder={t.substanceUsePlaceholder}
                rows={3}
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

          </div>
        </div>

        {/* BACKGROUND */}
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">
            {t.personalBackground}
          </h2>

          <div className="mt-5 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {t.ethnicityLabel}
              </label>

              <input
                type="text"
                value={patientDemographics.ethnicity}
                onChange={(e) =>
                  updateDemographic(
                    "ethnicity",
                    e.target.value
                  )
                }
                placeholder={t.optional}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {t.religionLabel}
              </label>

              <input
                type="text"
                value={patientDemographics.religion}
                onChange={(e) =>
                  updateDemographic(
                    "religion",
                    e.target.value
                  )
                }
                placeholder={t.optional}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

          </div>
        </div>

        {/* FEMALE HEALTH */}
        {isFemale && (
          <>
            {/* MENSTRUAL */}
            <div className="mt-5 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold">
                {t.menstrualHistoryTitle}
              </h2>

              <div className="mt-5 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.menstrualStatus}
                  </label>

                  <select
                    value={patientDemographics.menstrualStatus}
                    onChange={(e) =>
                      updateDemographic(
                        "menstrualStatus",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                   <option value="Regular">{t.regular}</option>
<option value="Irregular">{t.irregular}</option>
<option value="Not started">{t.notStarted}</option>
<option value="Menopausal">{t.menopausal}</option>
<option value="Not applicable">{t.notApplicable}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                     {t.ageAtMenarche}
                    </label>

                    <input
                      type="number"
                      value={patientDemographics.menarcheAge}
                      onChange={(e) =>
                        updateDemographic(
                          "menarcheAge",
                          e.target.value
                        )
                      }
                     placeholder={t.agePlaceholder}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                     {t.cycleDuration}
                    </label>

                    <input
                      type="text"
                      value={patientDemographics.cycleDuration}
                      onChange={(e) =>
                        updateDemographic(
                          "cycleDuration",
                          e.target.value
                        )
                      }
                      placeholder={t.cycleDurationPlaceholder}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.cycleRegularity}
                  </label>

                  <input
                    type="text"
                    value={patientDemographics.menstrualRegularity}
                    onChange={(e) =>
                      updateDemographic(
                        "menstrualRegularity",
                        e.target.value
                      )
                    }
                    placeholder={t.cycleRegularityPlaceholder}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.lastMenstrualPeriod}
                  </label>

                  <input
                    type="date"
                    value={patientDemographics.lastMenstrualPeriod}
                    onChange={(e) =>
                      updateDemographic(
                        "lastMenstrualPeriod",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.menopauseStatus}
                  </label>

                  <input
                    type="text"
                    value={patientDemographics.menopauseStatus}
                    onChange={(e) =>
                      updateDemographic(
                        "menopauseStatus",
                        e.target.value
                      )
                    }
                    placeholder={t.menopausePlaceholder}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>

              </div>
            </div>

            {/* GYNAECOLOGICAL */}
            <div className="mt-5 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold">
               {t.gynaecologicalHistoryTitle}
              </h2>

              <div className="mt-5 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.gynaecologicalHistory}
                  </label>

                  <textarea
                    value={patientDemographics.gynecologicalHistory}
                    onChange={(e) =>
                      updateDemographic(
                        "gynecologicalHistory",
                        e.target.value
                      )
                    }
                    placeholder={t.gynaecologicalHistoryPlaceholder}
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 p-4"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.previousGynaecologicalProcedures}
                  </label>

                  <textarea
                    value={patientDemographics.gynecologicalProcedures}
                    onChange={(e) =>
                      updateDemographic(
                        "gynecologicalProcedures",
                        e.target.value
                      )
                    }
                    placeholder={t.previousProceduresPlaceholder}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 p-4"
                  />
                </div>

              </div>
            </div>

            {/* OBSTETRIC */}
            <div className="mt-5 rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-600">
               {t.obstetricHistoryLabel}
                </p>

                <h2 className="mt-1 text-lg font-bold">
                {t.pregnancyDeliveryHistory}
                </h2>
              </div>

              <div className="mt-5 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {t.pregnancyStatus}
                  </label>

                  <select
                    value={patientDemographics.pregnancyStatus}
                    onChange={(e) =>
                      updateDemographic(
                        "pregnancyStatus",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <option value="Not pregnant">
  {t.notPregnant}
</option>

<option value="Currently pregnant">
  {t.currentlyPregnant}
</option>

<option value="Possibly pregnant">
  {t.possiblyPregnant}
</option>

<option value="Postpartum">
  {t.postpartum}
</option>

<option value="Prefer not to say">
  {t.preferNotToSay}
</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.gravida}
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={patientDemographics.gravida}
                      onChange={(e) =>
                        updateDemographic(
                          "gravida",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.para}
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={patientDemographics.para}
                      onChange={(e) =>
                        updateDemographic(
                          "para",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.abortions}
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={patientDemographics.abortions}
                      onChange={(e) =>
                        updateDemographic(
                          "abortions",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {t.livingChildren}
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={patientDemographics.livingChildren}
                      onChange={(e) =>
                        updateDemographic(
                          "livingChildren",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.previousPregnancyComplications}
                  </label>

                  <textarea
                    value={
                      patientDemographics.previousPregnancyComplications
                    }
                    onChange={(e) =>
                      updateDemographic(
                        "previousPregnancyComplications",
                        e.target.value
                      )
                    }
                    placeholder={t.previousComplicationsPlaceholder}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 p-4"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.previousDeliveryDetails}
                  </label>

                  <textarea
                    value={
                      patientDemographics.previousDeliveryDetails
                    }
                    onChange={(e) =>
                      updateDemographic(
                        "previousDeliveryDetails",
                        e.target.value
                      )
                    }
                    placeholder={t.optional}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 p-4"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.currentPregnancyDetails}
                  </label>

                  <textarea
                    value={
                      patientDemographics.currentPregnancyDetails
                    }
                    onChange={(e) =>
                      updateDemographic(
                        "currentPregnancyDetails",
                        e.target.value
                      )
                    }
                    placeholder={t.currentPregnancyPlaceholder}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 p-4"
                  />
                </div>

              </div>
            </div>
          </>
        )}

        {/* CONTINUE */}
        <button
         onClick={() => {
  setPage("patient-dashboard");
}}
          className="mt-6 w-full rounded-2xl bg-teal-600 py-4 font-semibold text-white shadow-md transition hover:bg-teal-700"
        >
          {t.saveAndContinue}
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          {t.demographicsReviewNote}
        </p>

      </main>
    </div>
  );
}
// ==================================================
// SETTINGS
// ==================================================

if (page === "settings") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-md px-5 py-8">

        <button
          onClick={() => setPage("patient-dashboard")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.backToDashboard}
        </button>

        <div className="mt-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            ⚙️
          </div>

          <h1 className="mt-5 text-3xl font-bold">
          {t.settings}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
           {t.settingsDescription}
          </p>
        </div>

        <div className="mt-8 space-y-3">

          {/* PERSONAL INFORMATION */}
          <button
            onClick={() => setPage("patient-demographics")}
            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <User size={22} />
            </div>

            <div className="flex-1">
              <h2 className="font-bold">
               {t.personalMedicalInformation}
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
              {t.personalMedicalInformationDescription}
              </p>
            </div>

            <span className="text-slate-400">
              →
            </span>
          </button>

          {/* PRIVACY */}
          <button
            onClick={() => setPage("privacy-permissions")}
            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              🔒
            </div>

            <div className="flex-1">
              <h2 className="font-bold">
               {t.privacyConsent}
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {t.privacyConsentDescription}
              </p>
            </div>

            <span className="text-slate-400">
              →
            </span>
          </button>

          {/* EMERGENCY */}
          <button
            onClick={() => setPage("emergency-access")}
            className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-red-300 hover:bg-red-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              🚨
            </div>

            <div className="flex-1">
              <h2 className="font-bold">
              {t.emergencyAccessLabel}
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
              {t.emergencyAccessDescription}
              </p>
            </div>

            <span className="text-slate-400">
              →
            </span>
          </button>

        </div>

      </main>
    </div>
  );
}
  // ==================================================
// PATIENT LOGIN
// ==================================================

if (page === "patient-login") {
  const isValidPhone = phone.length === 10;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">

        {/* BACK */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 self-start text-sm font-semibold text-teal-700 transition hover:text-teal-900"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        {/* HEADER */}
        <div className="mt-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-md">
            A
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            {t.welcomeTo}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t.tagline}
          </p>

        </div>

        {/* LOGIN CARD */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <User size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {t.patientLogin}
              </h2>

              <p className="text-sm text-slate-500">
                 {t.privateInfo}
              </p>
            </div>

          </div>

          {/* MOBILE LOGIN */}
          <div className="mt-7">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {t.mobileNumber}
            </label>

            <div
              className={`flex overflow-hidden rounded-xl border bg-white transition ${
                phone.length > 0 && !isValidPhone
                  ? "border-red-300 focus-within:border-red-400"
                  : isValidPhone
                  ? "border-emerald-300 focus-within:border-emerald-500"
                  : "border-slate-200 focus-within:border-teal-600"
              }`}
            >

              <span className="flex items-center border-r border-slate-200 px-3 text-sm font-medium text-slate-500">
                +91
              </span>

              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter 10-digit number"
                maxLength="10"
                className="min-w-0 flex-1 px-3 py-3 outline-none"
              />

              {isValidPhone && (
                <div className="flex items-center px-3 text-emerald-600">
                  ✓
                </div>
              )}

            </div>

            {phone.length > 0 && phone.length < 10 && (
              <p className="mt-2 text-xs text-red-500">
                {t.invalidPhone}
              </p>
            )}

          </div>

          {/* OTP BUTTON */}
          <button
            disabled={!isValidPhone}
            onClick={() => {
              if (!isValidPhone) return;
              setPage("otp");
            }}
            className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {t.sendOTP}
          </button>

          {/* DEMO NOTICE */}
          <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-3 text-center">

            <p className="text-xs font-semibold text-teal-800">
              {t.demoMode}
            </p>

            <p className="mt-1 text-xs text-teal-700">
             {t.demoSmsNotice}
            </p>

          </div>

          {/* ALTERNATIVE ACCESS */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
             {t.otherAccessOptions}
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-3">

            {/* AADHAAR */}
            <button
              onClick={() => setPage("aadhaar-entry")}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-lg">
                🪪
              </span>

              <div className="flex-1">
               <p className="text-sm font-bold text-slate-800">
  {t.aadhaarTitle}
</p>
                <p className="text-xs text-slate-500">
                   {t.aadhaarAccessDescription}
                </p>
              </div>

              <span className="text-slate-400">
                →
              </span>
            </button>

            {/* ABHA */}
            <button
              onClick={() => setPage("abha-entry")}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-lg">
                🏥
              </span>

              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">
                 {t.abhaTitle}
                </p>
                <p className="text-xs text-slate-500">
                  {t.abhaDescription}
                </p>
              </div>

              <span className="text-slate-400">
                →
              </span>
            </button>

          </div>

          {/* REGISTER */}
          <button
            onClick={() => setPage("patient-register")}
            className="mt-4 w-full rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
          >
           {t.newPatientRegister}
          </button>

        </div>

        {/* PRIVACY */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center">
          <span className="text-sm">🔒</span>
          <p className="text-xs leading-5 text-slate-400">
            {t.healthInformation}{t.private}
          </p>
        </div>

      </main>
    </div>
  );
}
  // ==================================================
  // OTP PAGE
  // ==================================================

  if (page === "otp") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">

        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">

          <button
            onClick={() => setPage("patient-login")}
            className="flex items-center gap-2 self-start text-sm font-semibold text-teal-700"
          >
            <ArrowLeft size={18} />
            {t.back}
          </button>

          <div className="mt-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-md">
              A
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              {t.verifyNumber}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {t.otpSent}
            </p>

          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">

            <label className="mb-2 block text-sm font-semibold">
              {t.enterOTP}
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(/\D/g, "")
                )
              }
              maxLength="6"
              placeholder="000000"
              className="w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-teal-600"
            />

            <button
              onClick={async () => {
               if (otp !== "123456") {
  alert(t.incorrectOtp);
  return;
}

    const { data, error } = await supabase
     .from("patients")
    .select("id, full_name, phone")
    .eq("phone", phone)
    .maybeSingle();

   if (error) {
    console.error("Patient lookup error:", error);
    alert("Unable to connect to patient records.");
    return;
    }

    if (!data) {
  alert("Patient not found.");
  return;
}

setPatientId(data.id);
setOtp("");

localStorage.setItem(
  "arovia_patient_session",
  JSON.stringify({
    patientId: data.id,
    phone,
    abhaId,
  })
);

setPage("patient-dashboard");            }}
              className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md hover:bg-teal-700"
            >
              {t.verifyOTP}
            </button>

            <p className="mt-5 text-center text-xs text-slate-400">
              {t.demoOtp.split(": ")[0]}: <strong>123456</strong>
            </p>

          </div>

        </main>

      </div>
    );
  }
  
  // ==================================================
  // HEALTH JOURNEY
  // ==================================================

  if (page === "health-journey") {
   const groupedJourney = healthJourneyEvents.reduce(
  (groups, event) => {
    if (!groups[event.year]) {
      groups[event.year] = [];
    }

    groups[event.year].push(event);
    return groups;
  },
  {}
);

Object.keys(groupedJourney).forEach((year) => {
  groupedJourney[year].sort(
    (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
  );
});
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">

        <main className="mx-auto w-full max-w-3xl px-5 py-8">

          {/* BACK */}
          <button
            onClick={() => setPage("patient-dashboard")}
            className="flex min-h-11 items-center gap-2 text-base font-semibold text-teal-700"
          >
            <ArrowLeft size={20} />
            {t.back}
          </button>

          {/* HEADER */}
          <div className="mt-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <HeartPulse size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              {t.healthJourney}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {t.yourHealthStory}
            </p>

          </div>

          {/* HEALTH STORY */}
          <div className="mt-6 rounded-3xl border border-teal-100 bg-white p-5 shadow-sm">

            <div className="flex items-start gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <HeartPulse size={24} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  {t.yourHealthStory}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t.healthStoryText(
                    healthJourneyEvents.length
                  )}
                </p>
              </div>

            </div>

          </div>

          {/* LATEST EVENT */}
          {latestJourneyRecord && (
            <div className="mt-5 rounded-3xl bg-teal-600 p-5 text-white shadow-md">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                    <Stethoscope size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-teal-100">
                      {t.latestHealthEvent}
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      {latestJourneyRecord.type}
                    </h2>

                    <p className="mt-1 text-sm text-teal-50">
                      {latestJourneyRecord.date}
                    </p>
                  </div>

                </div>

              </div>

              <button
                onClick={() => {
                  const latestEventIndex = healthJourneyEvents.reduce(
  (latestIndex, event, index, events) => {
    if (!events[latestIndex]) return index;

    return new Date(event.sortDate) >
      new Date(events[latestIndex].sortDate)
      ? index
      : latestIndex;
  },
  0
);
                  setExpandedJourneyEvent(
                    latestEventIndex
                  );
                }}
                className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-bold text-teal-700 shadow-sm"
              >
                {t.viewDetails}
              </button>

            </div>
          )}

          {/* TIMELINE */}
          <div className="mt-10">

            {Object.entries(groupedJourney)
              .sort(([yearA], [yearB]) =>
                Number(yearB) - Number(yearA)
              )
              .map(([year, events]) => (

                <section key={year} className="mb-10">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
                      {year}
                    </div>

                    <div className="h-px flex-1 bg-slate-200" />

                  </div>

                  <div className="relative">

                    <div className="absolute bottom-4 left-5 top-4 w-0.5 bg-slate-200" />

                    <div className="space-y-6">

                      {events.map((event) => {

                        const eventIndex =
                          healthJourneyEvents.findIndex(
                            (item) =>
                              item.id === event.id
                          );

                        const isExpanded =
                          expandedJourneyEvent ===
                          eventIndex;

                        return (
                          <div
                            key={event.id}
                            className="relative pl-14"
                          >

                            {/* TIMELINE DOT */}
                            <div className="absolute left-0 top-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-50 bg-white shadow-sm">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${getJourneyIconStyle(
                                  event.type
                                )}`}
                              >
                                {getJourneyIcon(event.type)}
                              </div>
                            </div>

                            {/* EVENT CARD */}
                            <button
                              onClick={() =>
                                setExpandedJourneyEvent(
                                  isExpanded
                                    ? null
                                    : eventIndex
                                )
                              }
                              className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-300 hover:shadow-md"
                            >

                              <div className="flex items-start justify-between gap-4">

                                <div className="min-w-0">

                                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    {event.date}
                                  </p>

                                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                                    {event.title}
                                  </h3>
                                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-teal-600">
  {event.type === "medicalReport"
  ? t.investigationMedicalReport
  : event.type === "prescription"
  ? t.prescription
  : event.type === "medication"
  ? t.medication
  : event.type === "procedure"
  ? t.procedureSurgery
  : t.consultation}
</p>

                                  {event.hospital && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                      <Hospital size={17} />
                                      {event.hospital}
                                    </div>
                                  )}
                                  {event.addedAt && (
  <p className="mt-1 text-xs text-slate-500">
    Added to AROVIA:{" "}
    {new Date(event.addedAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
  </p>
)}

                                  {event.doctor && (
                                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                      <Stethoscope size={17} />
                                      {event.doctor}
                                    </div>
                                  )}
{event.diagnosis && (
  <p className="mt-2 text-sm font-medium text-slate-700">
    {event.diagnosis}
  </p>
)}
                                </div>

                                <span className="shrink-0 text-sm font-semibold text-teal-600">
                                  {isExpanded
                                    ? "−"
                                    : "+"}
                                </span>

                              </div>

                              {/* EXPANDED DETAILS */}
                              {isExpanded && (
                                <div
                                  className="mt-5 space-y-4 border-t border-slate-100 pt-5"
                                  onClick={(e) =>
                                    e.stopPropagation()
                                  }
                                      >
                                  
                               {event.type === "ayush" && (
  <div className="rounded-xl bg-green-50 p-4">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
  🌿 {t.ayushHistory}
</p>

<p className="mt-1 text-sm text-green-800">
  {t.ayushAssessmentSaved}
</p>
      </div>

      <button
        type="button"
        onClick={() => {
         setAyushAnswers({
  ...event.ayushHistory,
});
setAyushQuestionIndex(0);
setAyushLanding(false);
setPreConsultationStep("ayushAssessment");
setPage("pre-consultation");
        }}
        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
      >
       {t.editAyush}
      </button>
    </div>
  </div>
)}
                               

                                  {event.diagnosis && (
                                    <div>
                                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        {t.diagnosisLabel}
                                      </p>

                                      <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {event.diagnosis}
                                      </p>
                                    </div>
                                  )}

                                  {event.doctor && (
                                    <div>
                                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        {t.doctorLabel}
                                      </p>

                                      <p className="mt-1 text-sm text-slate-700">
                                        {event.doctor}
                                      </p>
                                    </div>
                                  )}

                                  {event.hospital && (
                                    <div>
                                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        {t.hospitalClinicLabel}
                                      </p>

                                      <p className="mt-1 text-sm text-slate-700">
                                        {event.hospital}
                                      </p>
                                    </div>
                                  )}

                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                      {t.dateLabel}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-700">
                                      {event.date}
                                    </p>
                                  </div>

                                  {event.notes && (
                                    <div>
                                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        {t.notesLabel}
                                      </p>

                                      <p className="mt-1 text-sm leading-6 text-slate-700">
                                        {event.notes}
                                      </p>
                                    </div>
                                  )}
                                {event.type === "procedure" && (
  <div className="rounded-xl bg-purple-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
      {t.procedureSurgery}
    </p>

    <p className="mt-1 text-sm font-semibold text-purple-800">
      {event.title}
    </p>

    {event.notes && (
      <p className="mt-2 text-xs leading-5 text-purple-700">
        {event.notes}
      </p>
    )}
  </div>
)}
                                  {event.medication && (
                                    <div className="rounded-xl bg-orange-50 p-4">
                                      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                                       {t.medicationHistory}
                                         {t.relatedMedication}
                                      </p>

                                      <p className="mt-1 text-sm font-semibold text-orange-800">
                                        {event.medication}
                                      </p>
                                    </div>
                                  )}
{event.title?.startsWith("Symptom:") && (
  <button
    type="button"
    onClick={() => {
      const symptomIndex = symptomTimeline.findIndex(
        (symptom) =>
          `Symptom: ${symptom.symptom}` === event.title
      );

      if (symptomIndex === -1) return;

      const symptom = symptomTimeline[symptomIndex];

      setEditingSymptomIndex(symptomIndex);

      setNewSymptom({
        name: symptom.symptom || "",
        startedAt: symptom.startedAt || "",
        severity: symptom.severity || "",
        details: symptom.details || "",
      });

      setPage("add-symptom");
    }}
    className="w-full rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-100"
  >
    ✏️ {t.edit}
  </button>
)}
                                  {event.type === "medicalReport" && (
  <div className="rounded-xl bg-blue-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
  {t.investigationMedicalReport}
</p>

<p className="mt-1 text-sm font-semibold text-blue-800">
  {event.report}
</p>

<p className="mt-2 text-xs text-blue-700">
  {t.investigationDocumentDescription}
</p>
  </div>
)}
                                  <p className="pt-1 text-xs font-semibold text-teal-600">
                                    {t.closeDetails}
                                  </p>

                                </div>
                              )}

                            </button>

                          </div>
                        );
                      })}

                    </div>

                  </div>

                </section>
              ))}

          </div>

        </main>

      </div>
    );
  }
 // ==================================================
// MEDICAL HISTORY
// ==================================================

if (page === "medical-history") {
  const sharingOptions = [
    { key: "diagnosis", label: "Diagnosis" },
    { key: "hospital", label: "Hospital / Clinic" },
    { key: "doctor", label: "Doctor Name" },
    { key: "date", label: "Visit Date" },
    { key: "notes", label: "Doctor Notes" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto w-full max-w-md px-5 py-8">

        {/* BACK */}
        <button
          onClick={() => setPage("patient-dashboard")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        {/* HEADER */}
        <div className="mt-8">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileText size={26} />
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {t.medicalHistory}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
           <span>{t.view} {t.previous} Records</span>
          </p>

        </div>

        {/* MEDICAL RECORDS */}
        <div className="mt-8 space-y-4">

          {medicalRecords.map((record, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >

              {/* RECORD HEADER */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="font-bold">
                    {record.type}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {record.hospital}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {record.doctor}
                  </p>

                </div>

                <span className="whitespace-nowrap text-xs font-medium text-slate-400">
                  {record.date}
                </span>

              </div>

              {/* DIAGNOSIS */}
              <div className="mt-4">

                <p className="text-sm font-semibold text-slate-700">
                  {t.diagnosis}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {record.diagnosis}
                </p>

              </div>

              {/* NOTES */}
              <div className="mt-3">

                <p className="text-sm font-semibold text-slate-700">
                  {t.notes}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {record.notes || t.noNotes}
                </p>

              </div>

              {/* MANAGE SHARING */}
              <button
                onClick={() => {
                  setSelectedRecordIndex(index);
                  setShowRecordSharing(true);
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-100"
              >
              🔐 {t.manageSharing}
              </button>

            </div>

          ))}

        </div>

      </main>

      {/* SHARING POPUP */}
      {showRecordSharing && selectedRecordIndex !== null && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">

            {/* POPUP HEADER */}
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  {t.shareMedicalReport}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                 {t.chooseWhatHealthcareWorkersSee}
                </p>
              </div>

              <button
                onClick={() => setShowRecordSharing(false)}
                className="text-xl text-slate-400"
              >
                ✕
              </button>

            </div>

            {/* SHARING OPTIONS */}
            <div className="mt-6 space-y-2">

              {sharingOptions.map((option) => (

                <div
                  key={option.key}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                >

                  <div>

                    <p className="font-semibold">
                      {option.label}
                    </p>

                   <p className="mt-1 text-xs text-slate-400">
                   {recordSharing[selectedRecordIndex]?.[option.key]
                   ? "{t.shared}"
                   : "{t.private}"}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                         setRecordSharing({
                          ...recordSharing,
                        [selectedRecordIndex]: {
                      ...recordSharing[selectedRecordIndex],
                     [option.key]:
                       !recordSharing[selectedRecordIndex]?.[option.key],
                       },
                         })
                        }
                    className={`relative h-7 w-12 rounded-full transition ${
                      recordSharing[selectedRecordIndex]?.[option.key]
                        ? "bg-teal-600"
                        : "bg-slate-300"
                    }`}
                  >

                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                      recordSharing[selectedRecordIndex]?.[option.key]
                          ? "left-6"
                          : "left-1"
                      }`}
                    />

                  </button>

                </div>

              ))}

            </div>

            {/* SAVE */}
            <button
              onClick={() => {
                setShowRecordSharing(false);
               alert(t.sharingPreferencesSaved);
              }}
              className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white hover:bg-teal-700"
            >
              {t.saveSharingSettings}
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

  // ==================================================
  // ALLERGIES & MEDICATIONS
  // ==================================================

  if (page === "allergies-medications") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">

        <main className="mx-auto w-full max-w-md px-5 py-8">

          <button
            onClick={() => setPage("patient-dashboard")}
            className="flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowLeft size={18} />
            {t.back}
          </button>

          <div className="mt-8">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Pill size={26} />
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              {t.allergiesMedications}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {t.manageAllergies}
            </p>

          </div>

          <section className="mt-8">

            <h2 className="text-lg font-bold">
              {t.allergies}
            </h2>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <div>
  <h3 className="font-bold">
    {allergiesMedications.filter(
      (item) => item.item_type === "allergy"
    ).length > 0
      ? allergiesMedications
          .filter((item) => item.item_type === "allergy")
          .map((item) => item.name)
          .join(", ")
      : t.noKnownAllergies}
  </h3>

  <p className="mt-1 text-sm text-slate-500">
    {allergiesMedications.filter(
      (item) => item.item_type === "allergy"
    ).length > 0
      ? t.addedToRecord
      : t.noAllergiesAdded}
  </p>
</div>

                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  {t.safe}
                </span>

              </div>

            </div>

          </section>

          <section className="mt-8">

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-bold">
                {t.currentMedications}
              </h2>

            
            </div>

            <div className="mt-4 space-y-3">

              {medications.map((medication, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                        <Pill size={20} />
                      </div>

                      <div>

                        <h3 className="font-bold">
                          {medication.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {medication.dosage} • {medication.frequency}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {t.addedToRecord}
                        </p>

                      </div>

                    </div>

                    

                  </div>

                </div>

              ))}

            </div>

          </section>

          <div className="mt-8 rounded-2xl bg-orange-50 p-4">

            <p className="text-sm leading-6 text-orange-800">
  {t.keepInfoUpdated}
</p>

          </div>

        </main>

      </div>
    );
  }
 
   // ==================================================
// ADD NEW MEDICAL RECORD
// ==================================================

if (page === "add-record") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* CAMERA / DOCUMENT POPUP */}
      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {t.scanDocument}
              </h2>

              <button
                onClick={() => setShowCamera(false)}
                className="text-xl text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-100 p-4">

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  const imageUrl = URL.createObjectURL(file);

                  setCapturedImage(imageUrl);
                  setDocumentReady(false);
                  setShowCamera(false);

                  // Demo AI processing
                  setDocumentProcessing(true);

                  setTimeout(() => {
                    setDocumentProcessing(false);
                    setDocumentReady(true);

                    setNewRecord({
                      ...newRecord,
                      type: "Medical Document",
                      hospital: "City Health Centre",
                      date: new Date().toISOString().split("T")[0],
                      diagnosis: "Viral Fever",
                      notes:
                        "Information extracted from uploaded medical document.",
                    });
                  }, 1500);
                }}
                className="w-full text-sm"
              />

            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
                {t.documentInstruction}
            </p>

          </div>

        </div>
      )}

      <main className="mx-auto w-full max-w-md px-5 py-8">

        {/* BACK */}
        <button
          onClick={() => setPage("patient-dashboard")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        {/* HEADER */}
        <div className="mt-8">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <Plus size={26} />
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {t.addRecord}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
             {t.addRecordDescription}
          </p>

        </div>

        {/* INPUT METHODS */}
        <div className="mt-8 grid grid-cols-2 gap-4">

          {/* VOICE */}
          <button
            onClick={startVoiceInput}
            className={`rounded-2xl p-5 text-left shadow-sm transition ${
              listening
                ? "bg-red-500 text-white"
                : "border border-slate-200 bg-white hover:border-teal-400"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                listening
                  ? "bg-white/20"
                  : "bg-teal-50 text-teal-600"
              }`}
            >
              <Mic size={24} />
            </div>

            <h3 className="mt-4 font-bold">
              {listening ? t.listening : t.speakRecord}
            </h3>

            <p
              className={`mt-1 text-xs leading-5 ${
                listening ? "text-white/80" : "text-slate-500"
              }`}
            >
               {t.tellVisit}
            </p>
          </button>

          {/* CAMERA */}
          <button
            onClick={() => setShowCamera(true)}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-400"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              📷
            </div>

            <h3 className="mt-4 font-bold">
              {t.scanDocument}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
               {t.scanDocumentDescription}
            </p>
          </button>

        </div>

        {/* AI DOCUMENT RESULT */}
        {capturedImage && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">
              <h2 className="font-bold">
                 {t.medicalDocument}
              </h2>

              <button
                onClick={() => {
                  setCapturedImage(null);
                  setDocumentReady(false);
                }}
                className="text-sm font-semibold text-red-500"
              >
              {t.remove}
              </button>
            </div>

            {/* IMAGE */}
            <div className="mt-4 overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={capturedImage}
                alt="Medical document"
                className="max-h-80 w-full object-contain"
              />
            </div>

            {/* PROCESSING */}
            {documentProcessing && (
              <div className="mt-5 rounded-2xl bg-teal-50 p-4 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  ✨
                </div>

                <p className="mt-3 font-semibold text-teal-800">
                  {t.extractAI}
                </p>

                <p className="mt-1 text-xs text-teal-600">
                  {t.documentNote}
                </p>

              </div>
            )}

            {/* EXTRACTED INFORMATION */}
            {documentReady && !documentProcessing && (
              <div className="mt-5">

                <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">

                  <div className="flex items-center gap-2">
                    <span className="text-lg">✨</span>

                    <h3 className="font-bold text-teal-800">
                      {t.extractAI}
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-teal-700">
                    {t.reviewBeforeSaving}
                  </p>

                </div>

                {/* HOSPITAL */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold">
                     {t.hospitalClinic}
                  </label>

                  <input
                    type="text"
                    value={newRecord.hospital}
                    onChange={(e) =>
                      setNewRecord({
                        ...newRecord,
                        hospital: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
                  />
                </div>

                {/* DOCTOR */}
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold">
                    {t.doctorNameLabel}
                  </label>

                  <input
                    type="text"
                    value={newRecord.doctor}
                    onChange={(e) =>
                      setNewRecord({
                        ...newRecord,
                        doctor: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
                  />
                </div>

                {/* DIAGNOSIS */}
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold">
                   placeholder={t.diagnosisPlaceholder}
                  </label>

                  <input
                    type="text"
                    value={newRecord.diagnosis}
                    onChange={(e) =>
                      setNewRecord({
                        ...newRecord,
                        diagnosis: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
                  />
                </div>

                {/* NOTES */}
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold">
                   placeholder={t.notesPlaceholder}
                  </label>

                  <textarea
                    value={newRecord.notes}
                    onChange={(e) =>
                      setNewRecord({
                        ...newRecord,
                        notes: e.target.value,
                      })
                    }
                    rows="4"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
                  />
                </div>

                {/* SAVE */}
                <button
                  onClick={() => {
                    const today = new Date().toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    setMedicalRecords([
                      ...medicalRecords,
                      {
                        ...newRecord,
                        type: "Medical Document",
                        date: today,
                      },
                    ]);

                    setCapturedImage(null);
                    setDocumentReady(false);

                    setNewRecord({
                      type: "General Consultation",
                      hospital: "",
                      date: "",
                      diagnosis: "",
                      notes: "",
                    });

                    setPage("medical-history");
                  }}
                  className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md hover:bg-teal-700"
                >
                 {t.saveMedicalRecord}
                </button>

              </div>
            )}

          </div>
        )}

        {/* VOICE RESULT */}
        {query && (
          <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5">

            <div className="flex items-center gap-2">
              <Mic size={19} className="text-teal-700" />

              <h2 className="font-bold text-teal-800">
                {t.voiceInput}
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-teal-900">
              {query}
            </p>

            <button
              onClick={() =>
                setNewRecord({
                  ...newRecord,
                  notes: query,
                })
              }
              className="mt-4 w-full rounded-xl bg-teal-600 py-3 font-semibold text-white hover:bg-teal-700"
            >
             {t.useThisInformation}
            </button>

          </div>
        )}

        {/* MANUAL FORM */}
        <div className="mt-8">

          <div className="mb-5 flex items-center gap-2">
            <FileText size={20} className="text-slate-500" />

            <h2 className="text-lg font-bold">
              {t.enterManually}
            </h2>
          </div>

          <div className="space-y-5">

            {/* RECORD TYPE */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
               {t.recordType}
              </label>

              <select
                value={newRecord.type}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    type: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
              >
               <option>{t.recordGeneralConsultation}</option>
<option>{t.recordBloodTest}</option>
<option>{t.recordPrescription}</option>
<option>{t.recordVaccination}</option>
<option>{t.recordOther}</option>
              </select>
            </div>

            {/* HOSPITAL */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
              {t.hospitalClinicLabel}
              </label>

              <input
                type="text"
                value={newRecord.hospital}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    hospital: e.target.value,
                  })
                }
                placeholder={t.hospitalPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
              />
            </div>

            {/* DOCTOR */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                  {t.doctorNameLabel}
              </label>

              <input
                type="text"
                value={newRecord.doctor}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    doctor: e.target.value,
                  })
                }
                placeholder={t.doctorPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                 {t.dateLabel}
              </label>

              <input
                type="date"
                value={newRecord.date}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    date: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
              />
            </div>

            {/* DIAGNOSIS */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                 {t.diagnosisLabel}
              </label>

              <input
                type="text"
                value={newRecord.diagnosis}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    diagnosis: e.target.value,
                  })
                }
                placeholder="Enter diagnosis"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
              />
            </div>

            {/* NOTES */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                 {t.notesLabel}
              </label>

              <textarea
                value={newRecord.notes}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    notes: e.target.value,
                  })
                }
                placeholder="Add additional information..."
                rows="4"
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-600"
              />
            </div>

            {/* SAVE */}
            <button
              onClick={() => {

                if (
                  newRecord.hospital.trim() === "" ||
                  newRecord.doctor.trim() === "" ||
                  newRecord.date === "" ||
                  newRecord.diagnosis.trim() === ""
                ) {
                  alert("Please fill all required fields.");
                  return;
                }

                const formattedDate = new Date(
                  newRecord.date
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                setMedicalRecords([
  ...medicalRecords,
  {
    ...newRecord,
    hospital: newRecord.hospital.trim(),
    doctor: newRecord.doctor.trim(),
    diagnosis: newRecord.diagnosis.trim(),
    notes: newRecord.notes.trim(),
    date: formattedDate,
    addedAt: new Date().toISOString(),
  },
]);

                setNewRecord({
                  type: "General Consultation",
                  hospital: "",
                  date: "",
                  diagnosis: "",
                  notes: "",
                });

                setQuery("");
                setPage("medical-history");

              }}
              className="w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md hover:bg-teal-700"
            >
              {t.saveMedicalRecord || "Save Medical Record"}
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}


// ==================================================
// HEALTH ID / QR CODE
// ==================================================

if (page === "health-id") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto w-full max-w-md px-5 py-8">

        {/* BACK BUTTON */}

        <button
          onClick={() => setPage("patient-dashboard")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
         {t.back}
        </button>

        {/* HEADER */}

        <div className="mt-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <QrCode size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-bold">
          {t.aroviaHealthID}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {t.showHealthID}
          </p>

        </div>

        {/* HEALTH ID CARD */}

        <div className="mt-8 rounded-3xl bg-white p-6 text-center shadow-sm">

          <p className="text-sm font-semibold text-slate-500">
           {t.patient}
          </p>

          <h2 className="mt-1 text-xl font-bold">
          {patient?.full_name || t.patient}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            +91 {phone}
          </p>

          {/* QR DEMO */}

          <div className="mx-auto mt-6 flex h-56 w-56 items-center justify-center rounded-2xl border-4 border-slate-900 bg-white">
         <QRCodeCanvas
          value={healthId}
         size={190}
         bgColor="#ffffff"
         fgColor="#000000"
         level="H"
         />
       </div>
          <div className="mt-6">

            <p className="text-xs text-slate-400">
              {t.aroviaHealthID}
            </p>

            <p className="mt-1 text-lg font-bold tracking-widest text-teal-700">
              {healthId}
            </p>

          </div>

        </div>

        {/* INFORMATION */}

<div className="mt-6 rounded-2xl bg-teal-50 p-4">

  <p className="text-sm font-semibold text-teal-800">
    {t.howItWorks}
  </p>

  <p className="mt-2 text-sm leading-6 text-teal-700">
    {t.healthIDDescription}
  </p>

</div>

{/* SAFETY NOTE */}

<div className="mt-4 rounded-2xl bg-amber-50 p-4">

  <p className="text-xs leading-5 text-amber-800">
    {t.demoQR}
  </p>

</div>

      </main>

    </div>
  );
}

  // ==================================================
  // SYMPTOM CHECKER
  // ==================================================

  if (page === "symptom-checker") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">

        <main className="mx-auto w-full max-w-md px-5 py-8">

          <button
            onClick={() => setPage("patient-dashboard")}
            className="flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowLeft size={18} />
            {t.back}
          </button>

          <div className="mt-8">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Activity size={26} />
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              {t.symptomChecker}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {t.symptomDescription}
            </p>

          </div>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">

            <label className="mb-2 block text-sm font-semibold">
              {t.whatFeeling}
            </label>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Example: I have fever, headache and body pain"
              rows="5"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-600"
            />

            <button
              onClick={() => {

                if (query.trim() === "") {
                  alert(t.describeSymptoms);
                  return;
                }

                const symptomText = query.toLowerCase();

                if (
                  symptomText.includes("chest pain") ||
                  symptomText.includes("breathing") ||
                  symptomText.includes("shortness of breath")
                ) {
                 setQuery(t.emergencyMessage);
                } else if (
                  symptomText.includes("fever") ||
                  symptomText.includes("headache") ||
                  symptomText.includes("cold") ||
                  symptomText.includes("cough")
                ) {
                  
                  setQuery(t.feverMessage);
                } else {
                  setQuery(t.generalSymptomMessage);
                }

              }}
              className="mt-5 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md hover:bg-teal-700"
            >
              {t.checkSymptoms}
            </button>

          </div>

          <div className="mt-6 rounded-2xl bg-amber-50 p-4">

            <p className="text-sm leading-6 text-amber-800">
              {t.symptomWarning}
            </p>

          </div>

        </main>

      </div>
    );
  }
  // ==================================================
// {t.ayushHistory} LANDING PAGE
// ==================================================

if (page === "ayush-history") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-md px-5 py-8">

        {/* BACK */}
        <button
          onClick={() => setPage("patient-dashboard")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.backToDashboard}
        </button>

        {/* HEADER */}
        <div className="mt-8 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-4xl">
            🌿
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-teal-600">
            {t.ayushHistory}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {t.yourAyushHealthHistory}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {t.ayushHistoryDescription}
          </p>

        </div>

        {/* WHAT IT COVERS */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">
            {t.whatAssessmentCovers}
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex gap-3">
              <div className="mt-1 text-teal-600">✓</div>
             <div>
  <p className="font-semibold">
    {t.dashavidhaPariksha}
  </p>

  <p className="mt-1 text-xs leading-5 text-slate-500">
    {t.dashavidhaParikshaDescription}
  </p>
</div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 text-teal-600">✓</div>
             <div>
  <p className="font-semibold">
    {t.aharaVihara}
  </p>

  <p className="mt-1 text-xs leading-5 text-slate-500">
    {t.aharaViharaDescription}
  </p>
</div>
            </div>

            <div className="flex gap-3">
              <div className="mt-1 text-teal-600">✓</div>
              <div>
                <p className="font-semibold">
                  {t.reviewAndEdit}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.reviewEditDescription}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* OPTIONAL INFO */}
        <div className="mt-5 rounded-2xl bg-teal-50 p-4">

          <p className="text-sm font-semibold text-teal-800">
            {t.optionalAssessment}
          </p>

          <p className="mt-1 text-xs leading-5 text-teal-700">
            {t.optionalAssessmentDescription}
          </p>

        </div>

        {/* START */}
        <button
          onClick={() => {
            setAyushQuestionIndex(0);
            setPreConsultationStep("ayushAssessment");
            setPage("pre-consultation");
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 font-semibold text-white shadow-md transition hover:bg-teal-700"
        >
          {t.startAyushAssessment}
          <span>→</span>
        </button>

      </main>
    </div>
  );
}

// ==================================================
// PROFILE / SETTINGS
// ==================================================

if (page === "profile") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto w-full max-w-md px-5 py-8">

        {/* BACK */}
        <button
          onClick={() => setPage("patient-dashboard")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
         {t.back}
        </button>

        {/* HEADER */}
        <div className="mt-8 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <User size={36} />
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {t.profile}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {t.manageAccount}
          </p>

        </div>

        {/* PROFILE DETAILS */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">

          {/* NAME */}
          <div className="border-b border-slate-100 pb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t.patientName}
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
            {patientDemographics.name || t.summaryNotProvided}
            </p>
          </div>

          {/* PHONE */}
          <div className="border-b border-slate-100 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t.phoneNumber}
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              +91 {phone}
            </p>
          </div>

          {/* HEALTH ID */}
          <div className="border-b border-slate-100 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t.healthIdLabel}
            </p>

            <p className="mt-2 text-lg font-bold tracking-wide text-teal-700">
              {healthId}
            </p>
          </div>
          {/* PERSONAL & MEDICAL INFORMATION */}
<div>
  <p className="text-sm text-slate-500">
    {t.sex}
  </p>
  <p className="font-medium text-slate-900">
    {patientDemographics.sex || t.summaryNotProvided}
  </p>
</div>
          {/* LANGUAGE */}
          <div className="pt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t.language}
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">

              <button
                onClick={() => setLanguage("en")}
                className={`rounded-xl px-3 py-3 text-sm font-semibold ${
                  language === "en"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                English
              </button>

              <button
                onClick={() => setLanguage("te")}
                className={`rounded-xl px-3 py-3 text-sm font-semibold ${
                  language === "te"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                తెలుగు
              </button>

              <button
                onClick={() => setLanguage("hi")}
                className={`rounded-xl px-3 py-3 text-sm font-semibold ${
                  language === "hi"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                हिन्दी
              </button>

            </div>
          </div>

        </div>
    {/* PRIVACY & PERMISSIONS */}
         <button
            onClick={() => setPage("privacy-permissions")}
            className="mt-6 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-teal-400"
          >
        <div>
        <p className="font-bold">
      {t.privacyPermissions}
        </p>

       <p className="mt-1 text-xs leading-5 text-slate-500">
      {t.manageAccess}
         </p>
       </div>

        <span className="text-xl text-teal-600">›</span>
        </button>
        {/* LOGOUT */}
        <button
          onClick={() => {
  localStorage.removeItem("arovia_patient_session");
    sessionStorage.removeItem("arovia_patient_session");

  setPhone("");
  setOtp("");
  setPatientId(null);
  setAbhaId("");
  setPatient(null);
  setPage("home");
}}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 py-4 font-semibold text-red-600"
        >
          <LogOut size={20} />
          {t.logout}
        </button>

      </main>
    </div>
  );
}
// ==================================================
// PRIVACY & PERMISSIONS
// ==================================================

if (page === "privacy-permissions") {
  const permissionItems = [
    {
      key: "medicalHistory",
      label: t.medicalHistoryPermission,
    },
    
  {
  key: "ayushHistory",
  label: t.ayushHistory,
},

    {
      key: "medications",
      label: t.medicationsPermission,
    },
    {
      key: "allergies",
      label: t.allergiesPermission,
    },
    {
      key: "labReports",
      label: t.labReportsPermission,
    },
    {
      key: "prescriptions",
      label: t.prescriptionsPermission,
    },
    {
      key: "emergencyAccess",
      label: t.emergencyAccessPermission,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-md px-5 py-8">

        <button
          onClick={() => setPage("profile")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <div className="mt-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl">
            🔐
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {t.privacyPermissions}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t.manageAccess}
          </p>
        </div>

        {/* CONSENT STATUS */}
        <div className="mt-8 rounded-3xl border border-teal-200 bg-teal-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                {t.consentStatus}
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {t.consentActive}
              </p>
            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              {t.consentActive}
            </span>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold">{t.purpose}:</span>{" "}
              {t.consentPurposeText}
            </p>

            <p>
              <span className="font-semibold">{t.accessState}:</span>{" "}
              {t.consentAccessStateText}
            </p>

            <p>
              <span className="font-semibold">{t.expiry}:</span>{" "}
              {t.noConsentExpiry}
            </p>
          </div>

          <button
            onClick={() =>
              alert(t.consentRevocationMessage)
            }
            className="mt-4 w-full rounded-xl border border-red-200 bg-white py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            {t.revokeConsent}
          </button>
        </div>

        {/* DATA SHARING CONTROLS */}
        <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t.dataSharingControls}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {t.chooseHealthCategories}
          </p>

          <div className="mt-4">
            {permissionItems.map((item, index) => (
              <div
                key={item.key}
                className={`flex items-center justify-between py-4 ${
                  index !== permissionItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="pr-4">
                  <p className="font-semibold text-slate-900">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {permissions[item.key]
                      ? "{t.allowed}"
                      : "{t.notAllowed}"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setPermissions({
                      ...permissions,
                      [item.key]: !permissions[item.key],
                    })
                  }
                  className={`relative h-7 w-12 rounded-full transition ${
                    permissions[item.key]
                      ? "bg-teal-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                      permissions[item.key]
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE */}
        <button
          onClick={() => alert(t.permissionSaved)}
          className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-md hover:bg-teal-700"
        >
          {t.savePermissions}
        </button>

        {/* ACCESS EVENT */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
  {t.recentAccessEvent}
</p>

<p className="mt-1 text-xs leading-5 text-slate-500">
  {t.currentSharingPreferences}
</p>

<p className="mt-2 text-xs text-slate-400">
  {t.statusLabel}: {t.consentActive}
</p>

          <p className="mt-2 text-xs text-slate-400">
            Status: {t.consentActive}
          </p>
        </div>

        {/* INFO */}
        <div className="mt-5 rounded-2xl bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-800">
           {t.normalAccessEmergencyNote}
          </p>
        </div>

      </main>
    </div>
  );
}

//====================================
// PRE-CONSULTATION ASSISTANT
// ==================================================
if (page === "add-symptom") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-2xl px-5 py-8">

        <button
          onClick={() => setPage("pre-consultation")}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <div className="mt-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <Plus size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {t.addNewSymptom}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t.addNewSymptomDescription}
          </p>
        </div>

        <div className="mt-8 space-y-5 rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">

          <div>
            <label className="text-sm font-semibold text-slate-700">
              {t.newSymptomQuestion}
            </label>

            <input
              value={newSymptom.name}
              onChange={(e) =>
                setNewSymptom((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
              placeholder="{t.newSymptomPlaceholder}"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              {t.symptomStartedQuestion}
            </label>

            <input
              type="datetime-local"
              value={newSymptom.startedAt}
              onChange={(e) =>
                setNewSymptom((prev) => ({
                  ...prev,
                  startedAt: e.target.value
                }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />

            <p className="mt-1 text-xs text-slate-400">
              {t.symptomStartedNote}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              {t.howSevere}
            </label>

            <select
              value={newSymptom.severity}
              onChange={(e) =>
                setNewSymptom((prev) => ({
                  ...prev,
                  severity: e.target.value
                }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            >
             <option value="">{t.symptomSelectSeverity}</option>
<option value="mild">{t.symptomMild}</option>
<option value="moderate">{t.symptomModerate}</option>
<option value="severe">{t.symptomSevere}</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              {t.tellUsMore}
            </label>

            <textarea
              value={newSymptom.details}
              onChange={(e) =>
                setNewSymptom((prev) => ({
                  ...prev,
                  details: e.target.value
                }))
              }
              placeholder="{t.symptomDetailsPlaceholder}"
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />
          </div>

          <button
            onClick={async () => {
  if (!newSymptom.name.trim() || !newSymptom.startedAt) {
    alert(t.symptomSaveRequired);
    return;
  }

  if (!patientId) {
    alert(t.patientSessionNotFound);
    return;
  }

  const { data, error } = await supabase
    .from("symptoms")
    .insert({
      patient_id: patientId,
      symptom: newSymptom.name.trim(),
      started_at: newSymptom.startedAt,
      severity: newSymptom.severity || null,
      details: newSymptom.details.trim() || null,
      recorded_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Save symptom error:", error);
    alert(t.unableToSaveSymptom);
    return;
  }

  setSymptomTimeline((prev) => [
    ...prev,
    {
      id: data.id,
      symptom: data.symptom,
      startedAt: data.started_at,
      recordedAt: data.recorded_at,
      severity: data.severity,
      details: data.details,
    },
  ]);

  setNewSymptom({
    name: "",
    startedAt: "",
    severity: "",
    details: "",
  });

  setPage("health-journey");
}}
className="w-full rounded-xl bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700"
>
  {editingSymptomIndex !== null
  ? "Update Symptom"
  : "Save Symptom"}
</button>
           

        </div>
      </main>
    </div>
  );
}
if (page === "pre-consultation") {
  const complaintText =
    (preConsultationAnswers.complaint || "").toLowerCase();

  const isHeadache =
    complaintText.includes("headache") ||
    complaintText.includes("migraine") ||
    complaintText.includes("head pain") ||
    complaintText.includes("తలనొప్పి") ||
    complaintText.includes("सिरदर्द");

  const isCough =
    complaintText.includes("cough") ||
    complaintText.includes("cold") ||
    complaintText.includes("దగ్గు") ||
    complaintText.includes("కఫం") ||
    complaintText.includes("खांसी") ||
    complaintText.includes("सर्दी");

  const isStomach =
    complaintText.includes("stomach") ||
    complaintText.includes("abdominal") ||
    complaintText.includes("belly") ||
    complaintText.includes("కడుపు") ||
    complaintText.includes("పొట్ట") ||
    complaintText.includes("पेट");

    const isFever =
  complaintText.includes("fever") ||
  complaintText.includes("temperature") ||
  complaintText.includes("జ్వరం") ||
  complaintText.includes("बुखार");
const questions = {
  intro: {
    question: t.preConsultationIntro,
    field: "complaint",
  },

  duration: {
    question: t.preConsultationDuration,
    field: "duration",
  },

  severity: {
    question: t.preConsultationSeverity,
    field: "severity",
  },

  symptoms: {
    question:
      isHeadache
        ? t.preConsultationHeadacheSymptoms
        : isCough
        ? t.preConsultationCoughSymptoms
        : isFever
        ? t.preConsultationFeverSymptoms
        : isStomach
        ? t.preConsultationStomachSymptoms
        : t.preConsultationAssociatedSymptoms,
    field: "associatedSymptoms",
  },

  history: {
    question: t.preConsultationHistory,
    field: "relevantHistory",
  },

  medications: {
    question: t.preConsultationMedications,
    field: "medications",
  },

  allergies: {
    question: t.preConsultationAllergies,
    field: "allergies",
  },

  familyHistory: {
    question: t.preConsultationFamilyHistory,
    field: "familyHistory",
  },

  personalHistory: {
    question: t.preConsultationPersonalHistory,
    field: "personalHistory",
  },

  reviewOfSystems: {
    question: t.preConsultationReviewOfSystems,
    field: "reviewOfSystems",
  },

  redFlags: {
    question: t.preConsultationRedFlags,
    field: "redFlags",
  },
};

const currentQuestion =
  questions[preConsultationStep] || questions.intro;
    const clinicalQuestionOrder = [
  "intro",
  "duration",
  "severity",
  "symptoms",
  "history",
  "medications",
  "allergies",
  "familyHistory",
  "personalHistory",
  "reviewOfSystems",
  "redFlags",
];

const currentQuestionNumber =
  clinicalQuestionOrder.indexOf(preConsultationStep) + 1;

const answeredClinicalQuestions =
  clinicalQuestionOrder.filter(
    (step) => preConsultationAnswers[questions[step]?.field]?.trim()
  ).length;

const clinicalProgress =
  (currentQuestionNumber / clinicalQuestionOrder.length) * 100;

    const replayCurrentQuestion = () => {
  if (!currentQuestion?.question) return;

  speakQuestion(
    currentQuestion.question,
    getSpeechLanguage()
  );
};

  const submitPreConsultationAnswer = () => {
    const answer = preConsultationInput.trim();
    if (!answer) return;

   const field = currentQuestion.field;

if (preConsultationStep.startsWith("ayush")) {
  setAyushAnswers((prev) => ({
    ...prev,
    [field]: answer,
  }));
} else {
  setPreConsultationAnswers((prev) => ({
    ...prev,
    [field]: answer,
  }));
}
    setPreConsultationMessages((prev) => [
      ...prev,
      { role: "patient", text: answer },
    ]);
    setPreConsultationInput("");
const nextStepMap = {
  intro: "duration",
  duration: "severity",
  severity: "symptoms",
  symptoms: "history",
  history: "medications",
  medications: "allergies",
  allergies: "familyHistory",
  familyHistory: "personalHistory",
  personalHistory: "reviewOfSystems",
  reviewOfSystems: "redFlags",
  redFlags: ayushMode ? "ayushAssessment" : "summary",
  ayushAssessment: "summary",
};
  

    const nextStep = nextStepMap[preConsultationStep];
    setPreConsultationStep(nextStep || "summary");
  };

  const hasRedFlag = (text = "") => {
    const value = text.toLowerCase();
    const terms = [
      "severe breathing", "difficulty breathing", "can't breathe", "cannot breathe",
      "chest pain", "fainting", "unconscious", "seizure", "stroke",
      "sudden weakness", "sudden numbness", "uncontrolled bleeding",
      "coughing blood", "blood in vomit", "blood in stool",
    ];
    return terms.some((term) => value.includes(term));
  };

  const generatePreConsultationSummary = () => {
  const a = preConsultationAnswers;

  const historyText =
    medicalRecords.length > 0
      ? medicalRecords
          .slice(0, 3)
          .map(
            (record) =>
              `${record.diagnosis}${
                record.date ? ` (${record.date})` : ""
              }`
          )
          .join(", ")
      : "No previous records available";

  const medicationText =
    medications.length > 0
      ? medications
          .map(
            (medicine) =>
              `${medicine.name} ${medicine.dosage || ""}${
                medicine.frequency
                  ? ` • ${medicine.frequency}`
                  : ""
              }`
          )
          .join(", ")
      : a.medications || "None reported";

  return {
  complaint: a.complaint || t.summaryNotProvided,
  duration: a.duration || t.summaryNotProvided,
  severity: a.severity ? `${a.severity}/10` : t.summaryNotProvided,
  associatedSymptoms: a.associatedSymptoms || t.summaryNotReported,
  relevantHistory: a.relevantHistory || historyText,
  pastSurgicalHistory: a.pastSurgicalHistory || t.summaryNotReported,
  currentMedications: medicationText,
  allergies: a.allergies || t.summaryNotReported,
  familyHistory: a.familyHistory || t.summaryNotProvided,
  personalHistory: a.personalHistory || t.summaryNotProvided,
  reviewOfSystems: a.reviewOfSystems || t.summaryNotProvided,
  redFlags: a.redFlags || t.summaryNotReported,
  redFlagDetected:
    hasRedFlag(a.redFlags) || hasRedFlag(a.associatedSymptoms),
  patientDescription: a.complaint || t.summaryNotProvided,
  ayush: ayushMode
    ? {
        prakriti: ayushAnswers.prakriti || t.summaryNotProvided,
        vikriti: ayushAnswers.vikriti || t.summaryNotProvided,
        sara: ayushAnswers.sara || t.summaryNotProvided,
        samhanana: ayushAnswers.samhanana || t.summaryNotProvided,
        pramana: ayushAnswers.pramana || t.summaryNotProvided,
        satmya: ayushAnswers.satmya || t.summaryNotProvided,
        sattva: ayushAnswers.sattva || t.summaryNotProvided,
        aharaShakti: ayushAnswers.aharaShakti || t.summaryNotProvided,
        vyayamaShakti: ayushAnswers.vyayamaShakti || t.summaryNotProvided,
        vaya: ayushAnswers.vaya || t.summaryNotProvided,
        aharaVihara: ayushAnswers.aharaVihara || t.summaryNotProvided,
      }
    : null,
};
};
if (preConsultationStep === "ayushAssessment") {

  const ayushQuestions = [

    {
      key: "prakriti",
      label: t.summaryPrakriti,
      question: t.ayushPrakritiQuestion,
      placeholder: t.ayushPrakritiPlaceholder,
    },

    {
      key: "vikriti",
      label: t.summaryVikriti,
      question: t.ayushVikritiQuestion,
      placeholder: t.ayushVikritiPlaceholder,
    },

    {
      key: "sara",
      label: t.summarySara,
      question: t.ayushSaraQuestion,
      placeholder: t.ayushSaraPlaceholder,
    },

    {
      key: "samhanana",
      label: t.summarySamhanana,
      question: t.ayushSamhananaQuestion,
      placeholder: t.ayushSamhananaPlaceholder,
    },

    {
      key: "pramana",
      label: t.summaryPramana,
      question: t.ayushPramanaQuestion,
      placeholder: t.ayushPramanaPlaceholder,
    },

    {
      key: "satmya",
      label: t.summarySatmya,
      question: t.ayushSatmyaQuestion,
      placeholder: t.ayushSatmyaPlaceholder,
    },

    {
      key: "sattva",
      label: t.summarySattva,
      question: t.ayushSattvaQuestion,
      placeholder: t.ayushSattvaPlaceholder,
    },

    {
      key: "aharaShakti",
      label: t.summaryAharaShakti,
      question: t.ayushAharaShaktiQuestion,
      placeholder: t.ayushAharaShaktiPlaceholder,
    },

    {
      key: "vyayamaShakti",
      label: t.summaryVyayamaShakti,
      question: t.ayushVyayamaShaktiQuestion,
      placeholder: t.ayushVyayamaShaktiPlaceholder,
    },

    {
      key: "vaya",
      label: t.summaryVaya,
      question: t.ayushVayaQuestion,
      placeholder: t.ayushVayaPlaceholder,
    },

    {
      key: "aharaVihara",
      label: t.summaryAharaVihara,
      question: t.ayushAharaViharaQuestion,
      placeholder: t.ayushAharaViharaPlaceholder,
    },

  ];

  const currentAyushQuestion =
    ayushQuestions[ayushQuestionIndex];

  const isLastAyushQuestion =
    ayushQuestionIndex === ayushQuestions.length - 1;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-2xl px-5 py-8">

        {/* BACK */}
        <button
          onClick={() => {
            if (ayushQuestionIndex > 0) {
              setAyushQuestionIndex((prev) => prev - 1);
            } else {
              setPreConsultationStep("redFlags");
            }
          }}
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
        {t.back}
        </button>

        {/* HEADER */}
        <div className="mt-8">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl">
                🌿
              </div>

              <div>
                <p className="text-xs font-bold tracking-wide text-teal-600">
                  {t.ayushHistory}
                </p>

                <h1 className="mt-1 text-2xl font-bold">
                  {t.ayushHistory}
                </h1>
              </div>
            </div>

            <div className="text-sm font-bold text-slate-500">
              {ayushQuestionIndex + 1} / {ayushQuestions.length}
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-teal-600 transition-all duration-300"
              style={{
                width: `${
                  ((ayushQuestionIndex + 1) /
                    ayushQuestions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* QUESTION CARD */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm font-bold uppercase tracking-wide text-teal-600">
            {currentAyushQuestion.label}
          </p>

          <h2 className="mt-3 text-xl font-bold leading-relaxed text-slate-900">
            {currentAyushQuestion.question}
          </h2>
          <button
  type="button"
  onClick={() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        currentAyushQuestion.question
      );

      utterance.lang =
        language === "te"
          ? "te-IN"
          : language === "hi"
          ? "hi-IN"
          : "en-IN";

      window.speechSynthesis.speak(utterance);
    }
  }}
  className="mt-4 flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700"
>
  🔊 {t.readAloud}
</button>

          <textarea
            value={
              ayushAnswers[currentAyushQuestion.key] || ""
            }
            onChange={(e) =>
              setAyushAnswers((prev) => ({
                ...prev,
                [currentAyushQuestion.key]:
                  e.target.value,
              }))
            }
            placeholder={currentAyushQuestion.placeholder}
            rows={7}
            className="mt-6 w-full rounded-2xl border border-slate-200 p-4 text-sm leading-6 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />

          {/* NAVIGATION */}
          <div className="mt-6 flex items-center justify-between gap-3">

            <button
              type="button"
              disabled={ayushQuestionIndex === 0}
              onClick={() =>
                setAyushQuestionIndex((prev) =>
                  Math.max(0, prev - 1)
                )
              }
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.previous}
            </button>

            {!isLastAyushQuestion ? (
              <button
                type="button"
                onClick={() =>
                  setAyushQuestionIndex((prev) =>
                    Math.min(
                      ayushQuestions.length - 1,
                      prev + 1
                    )
                  )
                }
                className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                {t.next} →
              </button>
            ) : (
              <button
                type="button"
               onClick={() => {
  setPreConsultationAnswers((prev) => ({
    ...prev,
    ayushHistory: {
      ...ayushAnswers,
    },
  }));

  setPreConsultationStep("summary");
}}
                className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                {t.completeAyushAssessment}
              </button>
            )}

          </div>
        </div>

        {/* INFO */}
        <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50 p-4">
          <p className="text-sm leading-6 text-teal-800">
  {t.ayushAnswersSaved} {t.previous} {t.ayushReviewEdit}
</p>
        </div>

      </main>
    </div>
  );
}

  if (preConsultationStep === "summary") {
    const summary = generatePreConsultationSummary();

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto w-full max-w-2xl px-5 py-8">

          <button
            onClick={() =>
              setPage("patient-dashboard")
            }
            className="flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowLeft size={18} />
            {t.back}
          </button>

          <div className="mt-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <Mic size={30} />
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              {t.preConsultation}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {t.preConsultationDescription}
            </p>
          </div>

          <div className={`mt-8 rounded-2xl border p-4 ${
            summary.redFlagDetected ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"
          }`}>
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle size={19} className={summary.redFlagDetected ? "text-red-600" : "text-emerald-600"} />
              <span className={summary.redFlagDetected ? "text-red-700" : "text-emerald-700"}>
                {summary.redFlagDetected ? "Urgent symptoms reported" : "No red-flag symptoms reported"}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              This is a safety screen, not a diagnosis. A healthcare professional should review the information.
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <FileText size={24} />
              </div>

              <div>
                <h2 className="font-bold">
                  {t.preConsultationSummary}
                </h2>

                <p className="text-sm text-slate-500">
                  {t.reviewBeforeDoctor}
                </p>
              </div>
            </div>
<div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50 p-4">
  <div className="flex items-center justify-between gap-3">
    <div>
      <p className="font-bold text-teal-800">
        {t.trackNewSymptoms}
      </p>
      <p className="mt-1 text-xs leading-5 text-teal-700">
        {t.trackNewSymptomsDescription}
      </p>
    </div>
{symptomTimeline.length > 0 && (
  <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Clock size={22} />
      </div>

      <div>
        <h2 className="font-bold">
          {t.symptomTimeline}
        </h2>

        <p className="text-sm text-slate-500">
          {t.symptomTimelineDescription}
        </p>
      </div>
    </div>

    <div className="mt-6 space-y-4">
      {[...symptomTimeline]
        .sort(
          (a, b) =>
            new Date(a.startedAt) - new Date(b.startedAt)
        )
        .map((item, index) => (
          <div
            key={`${item.symptom}-${index}`}
            className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="font-bold text-slate-800">
                  {item.symptom}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Started:{" "}
                  {new Date(item.startedAt).toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Reported:{" "}
                  {new Date(item.recordedAt).toLocaleString()}
                </p>
              </div>

              {item.severity && (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  {item.severity}
                </span>
              )}

            </div>

            {item.details && (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.details}
              </p>
            )}
          </div>
        ))}
    </div>

  </div>
)}
    <button
      onClick={() => {
        setNewSymptom({
          name: "",
          startedAt: "",
          severity: "",
          details: ""
        });
        setPage("add-symptom");
      }}
      className="shrink-0 rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-teal-700"
    >
      + Add Symptom
    </button>
  </div>
</div>
            <div className="mb-6 rounded-2xl border border-teal-200 bg-teal-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
               {t.demographicsTitle}
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">{t.summaryPatientId}</p>
                  <p className="font-semibold text-slate-800">
                     {patientId || t.summaryNotAvailable}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">{t.mobileNumber}</p>
                  <p className="font-semibold text-slate-800">
                    {phone || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">{t.summaryAbhaId}</p>
                  <p className="font-semibold text-slate-800">
                   {abhaId || t.summaryNotLinked}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">

  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {t.summaryMainConcern}
    </p>
    <p className="mt-1 font-semibold text-slate-800">
     {preConsultationAnswers.complaint || t.summaryNotProvided}
    </p>
  </div>

  <div className="grid grid-cols-2 gap-3">

    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
       {t.summaryDuration}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">
        {preConsultationAnswers.duration || "Not provided"}
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {t.summarySeverity}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">
        {preConsultationAnswers.severity
          ? `${preConsultationAnswers.severity}/10`
          : "Not provided"}
      </p>
    </div>

  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {t.summaryAssociatedSymptoms}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.associatedSymptoms || "Not provided"}
    </p>
  </div>
  {/* {t.ayushHistory} SUMMARY */}
{Object.values(ayushAnswers).some(
  (answer) => answer && answer.trim()
) && (
  <div className="mt-6 rounded-3xl border border-teal-200 bg-teal-50 p-5">

    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-600">
        🌿
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-teal-600">
          {t.summaryAyushHistory}
        </p>

        <h2 className="mt-1 font-bold text-teal-900">
         {t.summaryDashavidhaLifestyle}
        </h2>

        <p className="mt-1 text-xs text-teal-700">
         {t.summaryAyushAssessmentInfo}
        </p>
      </div>
    </div>

    <div className="mt-5 space-y-3">

      {[
        ["Prakriti", ayushAnswers.prakriti],
        ["Vikriti", ayushAnswers.vikriti],
        ["Sara", ayushAnswers.sara],
        ["Samhanana", ayushAnswers.samhanana],
        ["Pramana", ayushAnswers.pramana],
        ["Satmya", ayushAnswers.satmya],
        ["Sattva", ayushAnswers.sattva],
        ["Ahara Shakti", ayushAnswers.aharaShakti],
        ["Vyayama Shakti", ayushAnswers.vyayamaShakti],
        ["Vaya", ayushAnswers.vaya],
        ["Ahara & Vihara", ayushAnswers.aharaVihara],
      ].map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-teal-100 bg-white p-4"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-teal-600">
            {label}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-700">
            {value || "Not provided"}
          </p>
        </div>
      ))}

    </div>

    <div className="mt-4 rounded-2xl border border-teal-100 bg-white p-4">
      <p className="text-xs leading-5 text-slate-500">
  {t.summaryAyushDisclaimer}
</p>
    </div>

  </div>
)}
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {t.summaryPastSurgicalHistory}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.pastSurgicalHistory || "None reported"}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
     {t.summaryRelevantMedicalHistory}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.relevantHistory || "Not provided"}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {t.summaryCurrentMedications}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {medications.length > 0
        ? medications
            .map(
              (medicine) =>
                `${medicine.name} ${medicine.dosage || ""}${
                  medicine.frequency
                    ? ` • ${medicine.frequency}`
                    : ""
                }`
            )
            .join(", ")
        : preConsultationAnswers.medications || "None reported"}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
     {t.summaryKnownAllergies}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.allergies || t.summaryNotReported}
    </p>
  </div>
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
   {t.summaryFamilyHistory}
  </p>

  <p className="mt-1 text-sm leading-6 text-slate-700">
  {preConsultationAnswers.familyHistory || t.summaryNotProvided}
  </p>
</div>
<div className="rounded-2xl border border-slate-200 bg-white p-4">
  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
   {t.summaryPersonalHistory}
  </p>

  <p className="mt-1 text-sm leading-6 text-slate-700">
  {preConsultationAnswers.personalHistory || t.summaryNotProvided}
  </p>
</div>
<div className="rounded-2xl border border-slate-200 bg-white p-4">
  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
    {t.summaryReviewOfSystems}
  </p>

  <p className="mt-1 text-sm leading-6 text-slate-700">
   {preConsultationAnswers.reviewOfSystems || t.summaryNotProvided}
  </p>
</div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {t.summaryPatientDescription}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.complaint || "Not provided"}
    </p>
  </div>
  <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
   {t.summaryHpi}
  </p>

  <div className="mt-3 space-y-2 text-sm text-slate-700">
    <p>
      <span className="font-semibold">{t.summaryChiefComplaint}:</span>{" "}
      {preConsultationAnswers.complaint || "Not provided"}
    </p>

    <p>
     <span className="font-semibold">{t.summaryDuration}:</span>{" "}
   {preConsultationAnswers.duration || t.summaryNotProvided}
    </p>

    <p>
    <span className="font-semibold">{t.summarySeverity}:</span>{" "}
      {preConsultationAnswers.severity
        ? `${preConsultationAnswers.severity}/10`
        : t.summaryNotProvided}
    </p>

    <p>
      <span className="font-semibold">{t.summaryAssociatedSymptoms}:</span>{" "}
     {preConsultationAnswers.associatedSymptoms || t.summaryNotReported}
    </p>

    <p>
   <span className="font-semibold">{t.summaryRelevantHistory}:</span>{" "}
      {preConsultationAnswers.relevantHistory || t.summaryNotProvided}
    </p>
  </div>
</div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.summaryFamilyHistory}</p>
    <p className="mt-1 text-sm leading-6 text-slate-700">{preConsultationAnswers.familyHistory || "Not provided"}</p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.summaryPersonalHistory}</p>
    <p className="mt-1 text-sm leading-6 text-slate-700">{preConsultationAnswers.personalHistory || "Not provided"}</p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.summaryReviewOfSystems}</p>
    <p className="mt-1 text-sm leading-6 text-slate-700">{preConsultationAnswers.reviewOfSystems || "Not provided"}</p>
  </div>

  <div className={`rounded-2xl border p-4 ${
    hasRedFlag(preConsultationAnswers.redFlags) || hasRedFlag(preConsultationAnswers.associatedSymptoms)
      ? "border-red-200 bg-red-50"
      : "border-emerald-200 bg-emerald-50"
  }`}>
    <p className={`text-xs font-semibold uppercase tracking-wide ${
      hasRedFlag(preConsultationAnswers.redFlags) || hasRedFlag(preConsultationAnswers.associatedSymptoms)
        ? "text-red-600" : "text-emerald-700"
    }`}>{t.summarySafetyRedFlag}</p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.redFlags || "{t.summaryNotReported}"}
    </p>
    {(hasRedFlag(preConsultationAnswers.redFlags) || hasRedFlag(preConsultationAnswers.associatedSymptoms)) && (
      <p className="mt-3 font-bold text-red-700">{t.summaryEmergencyWarning}</p>
    )}
  </div>

  <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
  <div className="flex items-center gap-2 text-sm font-bold text-teal-700">
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white">
      ✓
    </span>
    {t.aiClinicalSummaryDraft}
  </div>

  <p className="mt-2 text-xs font-semibold text-teal-700">
    {t.aiAssistedHistory}
  </p>
  <p className="mt-2 text-xs font-bold text-slate-700">
  {t.status}:
  {aiSummaryStatus === "draft"
    ? t.draft
    : aiSummaryStatus === "editing"
    ? t.editing
    : aiSummaryStatus === "confirmed"
    ? t.confirmed
    : t.correctionRequested}
</p>
<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
  <button
    onClick={() => {
      setAiSummaryStatus("editing");
    }}
    className="rounded-xl border border-teal-300 bg-white px-3 py-2 text-xs font-bold text-teal-700"
  >
   {t.edit}
  </button>

  <button
    onClick={() => {
      setAiSummaryStatus("confirmed");
    }}
    className="rounded-xl bg-teal-600 px-3 py-2 text-xs font-bold text-white"
  >
   {t.acceptConfirm}
  </button>

  <button
    onClick={() => {
      setAiSummaryStatus("correction-requested");
    }}
    className="rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600"
  >
   {t.rejectCorrection}
  </button>
</div>

  <p className="mt-2 text-xs leading-5 text-slate-600">
  {t.aiSummaryDisclaimer}
</p>
</div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      Relevant Medical History
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.relevantHistory || "Not provided"}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
       {t.currentMedications}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.medications || "Not provided"}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
     {t.allergies}
    </p>
    <p className="mt-1 text-sm leading-6 text-slate-700">
      {preConsultationAnswers.allergies || "Not provided"}
    </p>
  </div>

</div>
{summary.ayush && (
  <div className="mt-6 rounded-3xl border border-teal-200 bg-teal-50 p-6">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-600">
        🌿
      </div>

      <div>
        <h2 className="font-bold text-teal-800">
          {t.ayushDashavidhaTitle}
        </h2>
        <p className="text-sm text-teal-700">
         {t.ayurvedicClinicalAssessment}
        </p>
      </div>
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2">

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summaryPrakriti}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.prakriti}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summaryVikriti}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.vikriti}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summarySara}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.sara}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summarySamhanana}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.samhanana}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summaryPramana}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.pramana}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summarySatmya}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.satmya}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summarySattva}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.sattva}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summaryAharaShakti}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.aharaShakti}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summaryVyayamaShakti}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.vyayamaShakti}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold text-slate-500">{t.summaryVaya}</p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.vaya}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4 sm:col-span-2">
        <p className="text-xs font-semibold text-slate-500">
          {t.summaryAharaVihara}
        </p>
        <p className="mt-1 text-sm font-semibold">
          {summary.ayush.aharaVihara}
        </p>
      </div>

    </div>
  </div>
)}
            <p className="mt-4 text-xs leading-5 text-slate-500">
              {t.preConsultationDisclaimer}
            </p>

            <button
              onClick={() => {
  const complaint =
    preConsultationAnswers.complaint || "Pre-Consultation";

  setSavedConsultations((prev) => [
    ...prev,
    {
      id: `preconsult-${Date.now()}`,
      date: new Date().toISOString(),
      title: complaint,
      notes: preConsultationSummary || "Pre-consultation completed.",
      medication: preConsultationAnswers.medications || "",
    },
  ]);

  setPage("patient-dashboard");
}}
              className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 font-bold text-white hover:bg-teal-700"
            >
              {t.done}
            </button>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-8">

        <button
          onClick={() =>
            setPage("patient-dashboard")
          }
          className="flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <div className="mt-8">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <Mic size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {t.preConsultation}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t.preConsultationDescription}
          </p>
          
   

   
 {/* QUESTION */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
             AROVIA
          </p>
<div className="mb-5">
  <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
    <span>
    {t.questionProgress} {currentQuestionNumber} {t.ofText} {clinicalQuestionOrder.length}
    </span>

    <span>
     {t.answered} {answeredClinicalQuestions}/{clinicalQuestionOrder.length}
    </span>
  </div>

  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
    <div
      className="h-full rounded-full bg-teal-600 transition-all duration-300"
      style={{ width: `${clinicalProgress}%` }}
    />
  </div>

  <p className="mt-2 text-xs text-slate-500">
   {Math.round(clinicalProgress)}% {t.complete}
  </p>
</div>
          <h2 className="mt-3 text-xl font-bold leading-8">
            {currentQuestion.question}
          </h2>
          <button
  type="button"
  onClick={() => {
    if (currentQuestion?.question) {
      speakQuestion(
        currentQuestion.question,
        getSpeechLanguage()
      );
    }
  }}
  className="mt-4 flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700"
>
  🔊 {t.readAloud}
</button>

        </div>

        

        {/* INPUT */}
        <div className="mt-auto pt-8">

          {listening && (
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              <Mic size={18} />
              {t.aroviaListening}
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

            <textarea
              value={preConsultationInput}
              onChange={(e) =>
                setPreConsultationInput(
                  e.target.value
                )
              }
              placeholder={t.typeYourResponse}
              rows={3}
              className="w-full resize-none bg-transparent p-2 text-sm outline-none"
            />
          
            
            {/* MEDICINE PHOTO / PRESCRIPTION UPLOAD */}
{preConsultationStep === "medications" && (
  <div className="mt-3 rounded-xl border border-teal-200 bg-teal-50 p-3">

    <p className="text-sm font-semibold text-teal-800">
      {t.medicineNameUnknown}
    </p>

    <p className="mt-1 text-xs text-teal-700">
      {t.medicinePhotoInstruction}
    </p>

    <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-teal-300 bg-white px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-50">
      📷
    {t.takePhotoUpload}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
  setMedicinePhoto(file);

  setPreConsultationInput(
    `${preConsultationInput}${preConsultationInput ? "\n" : ""}📷 Medicine photo attached: ${file.name}`
  );
}
        }}
      />
    </label>
    {medicinePhoto && (
  <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3">
    <div className="flex items-center gap-2">
      <span className="text-lg">📷</span>
      <span className="text-xs font-semibold text-slate-700">
        {medicinePhoto.name}
      </span>
    </div>

    <button
      type="button"
      onClick={() => setMedicinePhoto(null)}
      className="text-xs font-semibold text-red-600 hover:text-red-700"
    >
      {t.remove}
    </button>
  </div>
)}

  </div>
)}

            <div className="mt-2 flex gap-3">

  {/* PREVIOUS */}
  <button
    onClick={() => {
      const currentIndex =
        clinicalQuestionOrder.indexOf(preConsultationStep);

      if (currentIndex > 0) {
        const previousStep =
          clinicalQuestionOrder[currentIndex - 1];

        setPreConsultationStep(previousStep);

        const previousField =
          questions[previousStep]?.field;

        setPreConsultationInput(
          preConsultationAnswers[previousField] || ""
        );
      }
    }}
    disabled={
      clinicalQuestionOrder.indexOf(preConsultationStep) === 0
    }
    className="flex-1 rounded-xl border-2 border-slate-300 bg-white py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
  >
    {t.previous}
  </button>

  {/* SPEAK */}
  <button
    onClick={startPreConsultationVoice}
    className={`flex-1 items-center justify-center gap-2 rounded-xl py-3 font-semibold transition ${
      listening
        ? "bg-red-500 text-white"
        : "bg-teal-600 text-white hover:bg-teal-700"
    }`}
  >
    <Mic size={20} />
    {listening
      ? (t.aroviaListening || "AROVIA is listening...")
      : (t.startSpeaking || "Start Speaking")}
  </button>

  {/* NEXT */}
  <button
    onClick={submitPreConsultationAnswer}
    className="flex-1 rounded-xl border-2 border-teal-600 bg-white py-3 font-semibold text-teal-700 hover:bg-teal-50"
  >
    {t.continue || "Next"}
  </button>

</div>

          </div>

        </div>
</div>
      </main>
    </div>
  );
}

if (page === "emergency-access") {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-4xl px-6 py-8">

        <button
          onClick={() => setPage("patient-dashboard")}
          className="mb-6 text-sm font-semibold text-teal-600"
        >
         {t.emergencyBackDashboard}
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertCircle size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
               {t.emergencyAccessSettings}
              </h1>
              <p className="text-sm text-slate-500">
               {t.emergencyAccessDescription} 
              </p>
            </div>
          </div>

          {/* ACCESS STATUS */}
          <div className="mt-7 rounded-2xl border border-teal-200 bg-teal-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                {t.emergencyAccessLabel}
                </p>

                <p className="mt-1 font-bold text-slate-800">
                 {t.enabled}
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  {t.emergencyCriticalInfo}
                </p>
              </div>

              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">
               {t.active}
              </span>
            </div>
          </div>

          {/* CRITICAL INFORMATION */}
          <div className="mt-6">
            <h2 className="font-bold text-slate-800">
              {t.criticalInfoAvailable}
            </h2>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  {t.bloodGroup}
                </p>
                <p className="mt-1 font-semibold">
  {patient?.blood_group || t.notAvailable}
</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                 {t.allergies}
                </p>
                <p className="mt-1 font-semibold">
                {t.noKnownAllergies}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                 {t.medications}
                </p>
                <p className="mt-1 font-semibold">
                {t.notAvailable}
                </p>
              </div>

            </div>
          </div>

          {/* ACCESS CONTROL */}
          <div className="mt-6 rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800">
              {t.accessControl}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
            {t.emergencyAccessIntended}
            </p>

            <button
              onClick={() => {
                setEmergencyStatus(
                  emergencyStatus === "Enabled" ? "Disabled" : "Enabled"
                );
              }}
              className="mt-4 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              {emergencyStatus === "Enabled"
  ? t.disableEmergencyAccess
  : t.enableEmergencyAccess}
            </button>

            <p className="mt-2 text-xs text-slate-500">
              {t.currentStatus}: {emergencyStatus}
            </p>
          </div>

          {/* ACCESS EVENT */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-bold text-slate-800">
             {t.recentAccessEvent}
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {emergencyAccessEvent ||
                t.noEmergencyAccessEvent}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
  // ==================================================
  // PATIENT DASHBOARD
  // ==================================================

  if (page === "patient-dashboard") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">

       <main className="mx-auto min-h-screen w-full max-w-7xl px-6 pb-28 pt-8 lg:px-10">

          {/* HEADER */}

          <header className="flex items-center justify-between">
  <div>
    <p className="text-sm text-slate-500">
      {t.welcome}
    </p>

    <h1 className="mt-1 text-2xl font-bold text-slate-900">
  {patient?.full_name || patientDemographics.name || t.summaryNotProvided}
</h1>
  </div>

  <div className="flex gap-2">

    <button
      onClick={() => setPage("profile")}
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-700 shadow-md"
    >
      <User size={23} />
    </button>

    <button
      onClick={() => setPage("health-id")}
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md"
    >
      <QrCode size={23} />
    </button>

  </div>
</header>
          {/* HEALTH SUMMARY */}

          <div className="mt-7 rounded-3xl bg-teal-600 p-6 text-white shadow-lg">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <HeartPulse size={25} />
              </div>

              <div>

                <p className="text-sm text-teal-50">
                  {t.yourHealthRecord}
                </p>

                <h2 className="text-xl font-bold">
                  {t.allInOnePlace}
                </h2>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-white/10 p-3">

                <p className="text-xs text-teal-50">
                  {t.records}
                </p>

                <p className="mt-1 text-lg font-bold">
                  {medicalRecords.length}
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-3">

                <p className="text-xs text-teal-50">
                  {t.lastVisit}
                </p>

                <p className="mt-1 text-lg font-bold">
                  {t.recent}
                </p>

              </div>

            </div>

          </div>

          {/* PHONE */}

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">

            <p className="text-xs text-slate-500">
              {t.registeredMobile}
            </p>

            <p className="mt-1 font-semibold">
              +91 {phone}
            </p>

          </div>

          {/* FEATURES */}

          <div className="mt-7">

            <h2 className="text-lg font-bold">
              {t.yourHealth}
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* MEDICAL HISTORY */}

              <button
                onClick={() => setPage("medical-history")}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-teal-400 active:scale-[0.98]"
               >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
               <FileText size={30} />
                </div>
                <h3 className="mt-4 font-bold">
                  {t.medicalHistory}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.previousRecordsShort}
                </p>

              </button>
                          

              {/* PRE-CONSULTATION */}

              <button
                onClick={() => {
                  setPreConsultationStep("intro");
                  setPreConsultationInput("");
                  setPreConsultationAnswers({
                    complaint: "", duration: "", severity: "", associatedSymptoms: "",
                    relevantHistory: "", pastSurgicalHistory: "", medications: "", allergies: "",
                    familyHistory: "", personalHistory: "", reviewOfSystems: "", redFlags: "",
                  });
                  setPreConsultationMessages([]);
                  setPreConsultationSummary("");
                  setPage("pre-consultation");
                }}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-400"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Mic size={24} />
                </div>

                <h3 className="mt-4 font-bold">
                  {t.aiClinicalInterview}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.aiClinicalInterviewDescription}
                </p>
              </button>

              

              {/* ALLERGIES & MEDICATIONS */}

              <button
                onClick={() =>
                  setPage("allergies-medications")
                }
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-400"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                 <Pill size={30} />
                 </div>

                <h3 className="mt-4 font-bold">
                  {t.allergiesMedications}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.manageMedicinesShort}
                </p>

              </button>

              {/* ADD NEW RECORD */}

              <button
                onClick={() => setPage("add-record")}
                className="rounded-2xl bg-teal-600 p-5 text-left text-white shadow-md transition hover:bg-teal-700"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                  <Plus size={24} />
                </div>

                <h3 className="mt-4 font-bold">
                  {t.addRecord}
                </h3>

                <p className="mt-1 text-xs leading-5 text-teal-50">
                  {t.uploadReports}
                </p>

              </button>
              {/* PATIENT DEMOGRAPHICS */}

<button
  onClick={() => setPage("patient-demographics")}
  className="rounded-2xl border border-teal-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-400 hover:bg-teal-50"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
    <User size={22} />
  </div>

  <h3 className="mt-4 font-bold text-slate-800">
    {t.myDemographics}
  </h3>

  <p className="mt-1 text-xs leading-5 text-slate-500">
    {t.myDemographicsDescription}
  </p>
</button>

              {/* SYMPTOM CHECKER */}

              <button
                onClick={() => setPage("symptom-checker")}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-400"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Activity size={22} />
                </div>

                <h3 className="mt-4 font-bold">
                  {t.symptomChecker}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t.checkYourSymptoms}
                </p>

                            </button>
                            {/* {t.ayushHistory} */}

<button
  onClick={() => {
  setAyushLanding(true);
  setPage("ayush-history");
}}
  className="rounded-2xl border border-teal-200 bg-teal-50 p-5 text-left shadow-sm transition hover:border-teal-400"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-600">
    🌿
  </div>

  <h3 className="mt-4 font-bold text-teal-800">
    {t.ayushHistory}
  </h3>

  <p className="mt-1 text-xs leading-5 text-teal-700">
    {t.ayushHistoryDescription}
  </p>
</button>
{/* SETTINGS */}

<button
  onClick={() => setPage("settings")}
  className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal-400 hover:bg-teal-50"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
    ⚙️
  </div>

  <h3 className="mt-4 font-bold text-slate-800">
    {t.settings}
  </h3>

  <p className="mt-1 text-xs leading-5 text-slate-500">
    {t.settingsDescription}
  </p>
</button>

              {/* EMERGENCY ACCESS */}

              <button
                onClick={() => setPage("emergency-access")}
                className="rounded-2xl border border-red-200 bg-red-50 p-5 text-left shadow-sm transition hover:border-red-400"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <AlertCircle size={22} />
                </div>

                <h3 className="mt-4 font-bold text-red-700">
                  {t.emergencyAccessLabel}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {t.emergencyAccessCardDescription}
                </p>
              </button>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={() => {
              localStorage.removeItem("arovia_patient_session");
    sessionStorage.removeItem("arovia_patient_session");
              setPage("home");
              setPhone("");
              setOtp("");
              setPatientId(null);
              setPatient(null);
              setAbhaId("");
            }}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-teal-600 bg-white py-3.5 font-semibold text-teal-700 hover:bg-teal-50"
          >
            <LogOut size={18} />
           {t.logout}
          </button>

        </main>

        {/* BOTTOM NAV */}

        <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white">

          <div className="mx-auto flex max-w-md items-center justify-around px-5 py-3">

            <button className="flex flex-col items-center gap-1 text-teal-600">

              <HeartPulse size={21} />

              <span className="text-xs font-semibold">
                {t.home}
              </span>

            </button>
                        <button
              onClick={() => setPage("health-journey")}
              className="flex flex-col items-center gap-1 text-slate-400"
            >
              <HeartPulse size={21} />

              <span className="text-xs">
                {t.healthJourney}
              </span>
            </button>

            <button
              onClick={() => setPage("medical-history")}
              className="flex flex-col items-center gap-1 text-slate-400"
            >

              <FileText size={21} />

              <span className="text-xs">
                {t.records}
              </span>

            </button>

            <button
              onClick={() => setPage("symptom-checker")}
              className="flex flex-col items-center gap-1 text-slate-400"
            >

              <Activity size={21} />

              <span className="text-xs">
                {t.symptoms}
              </span>

            </button>

            <button
              onClick={() => setPage("profile")}
              className="flex flex-col items-center gap-1 text-slate-400"
            >

              <User size={21} />

              <span className="text-xs">
                {t.profile}
              </span>

            </button>

          </div>

        </nav>

      </div>
    );
  }
{/* EMERGENCY ACCESS */}

<button
  onClick={() => setPage("emergency-access")}
  className="rounded-2xl border border-red-200 bg-red-50 p-5 text-left shadow-sm transition hover:border-red-400"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
    <AlertCircle size={22} />
  </div>
<h3 className="mt-4 font-bold text-red-700">
  {t.emergencyAccessSettings}
</h3>

<p className="mt-1 text-xs leading-5 text-slate-600">
{t.emergencyAccessDescription}
</p>
</button>
  // ==================================================
  // HOME / LANDING PAGE
  // ==================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-10">

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-600 text-2xl font-bold text-white shadow-lg">
            A
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-teal-700">
            {t.aroviaLabel}
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

        {/* SEARCH */}

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
              {t.listening}
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



        </section>

        <p className="mt-auto pt-10 text-center text-xs text-slate-400">
          {t.privateHealth}
        </p>

      </main>

    </div>
  );
}

export default App;
