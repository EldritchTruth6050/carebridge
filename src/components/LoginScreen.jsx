import { useState } from "react";
import { BrandIconSimple } from "./icons/BrandIcon.jsx";
import { PATIENT } from "../data/patient.js";

export default function LoginScreen({ onLogin }) {
  const [patientId, setPatientId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e) {
    e?.preventDefault();
    const idVal = patientId.trim().toUpperCase();
    const codeVal = accessCode.trim();

    if (!idVal || !codeVal) {
      setErrorMsg("Please enter both your Patient ID and 6-digit Access Code.");
      return;
    }

    if (!/^\d+$/.test(codeVal)) {
      setErrorMsg("Access Code must be a 6-digit number.");
      return;
    }

    if (idVal === PATIENT.id && codeVal === PATIENT.code) {
      setErrorMsg("");
      onLogin();
    } else {
      setErrorMsg("That patient ID and access code don't match our records. Please try again.");
    }
  }

  return (
    <div id="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-mark">
          <BrandIconSimple />
        </div>
        <h1>Sign in to your discharge summary</h1>
        <p className="sub">
          Verify your identity to securely view your instructions and ask questions
          about your care.
        </p>

        {errorMsg && (
          <div className="login-error">
            {errorMsg}
          </div>
        )}

        <div className="field">
          <label htmlFor="patient-id">Patient ID</label>
          <input
            id="patient-id"
            type="text"
            placeholder="e.g. DEMO-1024"
            autoComplete="off"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="access-code">Access Code</label>
          <input
            id="access-code"
            type="password"
            placeholder="6-digit code from your discharge papers"
            autoComplete="off"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </div>
        <button type="submit" className="login-btn">
          Sign in securely
        </button>

        <div className="demo-hint">
          This is a demo build, so no real patient data is involved. Use the sample
          credentials below to sign in — Patient ID: <b>DEMO-1024</b>, Access Code:{" "}
          <b>482913</b>.
        </div>
        <div className="login-foot">
          In production, this step would verify identity against your hospital&apos;s
          patient portal and never store credentials in the app itself.
        </div>
      </form>
    </div>
  );
}
