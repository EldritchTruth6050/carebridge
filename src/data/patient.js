/**
 * SECURITY NOTE & HIPAA COMPLIANCE:
 * For this client-side demonstration, patient credentials and records are loaded locally.
 * In a production hospital environment, this app must:
 * 1. Never hardcode credentials or patient details.
 * 2. Authenticate patients via OAuth2 / OpenID Connect (OIDC) through the hospital's EHR Patient Portal (e.g. Epic MyChart).
 * 3. Fetch patient discharge summaries and clinical records dynamically from secure EHR APIs (such as HL7 FHIR endpoints)
 *    using temporary, cryptographically signed access tokens, adhering strictly to the HIPAA Security Rule.
 */
export const PATIENT = { id: "DEMO-1024", name: "Eleanor Ruiz", code: "482913" };

export const SUGGESTIONS = [
  "When do I take my water pill and what does it do?",
  "Is it normal to feel anxious after being in the hospital?",
  "When can I drive or go back to work?",
  "What should my husband know in case something goes wrong?",
];
