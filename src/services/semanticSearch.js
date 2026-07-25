import { DOC_SECTIONS } from "../data/docSections.js";

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "do", "does", "did", "i", "my", "me",
  "you", "your", "to", "of", "in", "on", "for", "and", "or", "it", "this", "that",
  "should", "can", "what", "when", "how", "much", "many", "will", "be", "have", "has",
  "with", "at", "if", "from", "about", "am", "need", "could",
]);

const SYNONYMS = {
  "water pill": "furosemide lasix diuretic urinate",
  "fluid pill": "furosemide lasix diuretic",
  "heart pill": "metoprolol lisinopril",
  "blood pressure pill": "lisinopril",
  "pulse pill": "metoprolol heart rate",
  pee: "urinate urination",
  peeing: "urinate urination",
  salt: "sodium",
  salty: "sodium",
  swelling: "edema swelling",
  swollen: "edema swelling",
  puffy: "edema swelling",
  shot: "vaccine vaccination flu pneumonia",
  vaccine: "vaccination flu pneumonia",
  "flu shot": "vaccine vaccination flu",
  drive: "driving",
  driving: "driving car",
  sex: "sexual activity",
  intimacy: "sexual activity",
  work: "work job return duty",
  job: "work return duty",
  cough: "cough side effects",
  dizzy: "dizziness fainting lightheaded",
  lightheaded: "dizziness fainting",
  tired: "fatigue tiredness",
  fatigue: "tiredness",
  anxious: "emotional wellbeing mood anxiety",
  depressed: "emotional wellbeing mood",
  sad: "emotional wellbeing mood",
  stressed: "emotional wellbeing mood",
  family: "caregiver support",
  spouse: "caregiver support",
  husband: "caregiver support",
  wife: "caregiver support",
  refill: "refill pharmacy medication",
  pharmacy: "refill medication",
  "missed dose": "missed dose medication",
  forgot: "missed dose medication",
  alcohol: "alcohol drinking",
  drink: "alcohol fluid",
  drinking: "alcohol fluid",
  smoke: "smoking",
  smoking: "smoking quit",
  sleep: "sleep positioning pillows",
  pillow: "sleep positioning",
  scale: "equipment weight",
  cuff: "equipment blood pressure",
  "chest pain": "chest pain emergency warning",
  911: "emergency warning",
  emergency: "warning emergency",
  exercise: "activity exercise rest",
  rehab: "cardiac rehab activity",
  "what does": "what is means",
  "what is": "what is means",
  why: "why summary means",
};

function tokenize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w));
}

function expandQuery(query) {
  let expanded = query.toLowerCase();
  Object.keys(SYNONYMS).forEach((phrase) => {
    if (expanded.includes(phrase)) expanded += " " + SYNONYMS[phrase];
  });
  return expanded;
}

const CORPUS = DOC_SECTIONS.map((s) => tokenize(s.title + " " + s.text));
const VOCAB = {};
CORPUS.forEach((tokens) => tokens.forEach((t) => { VOCAB[t] = VOCAB[t] || 0; }));
const VOCAB_LIST = Object.keys(VOCAB);

function termFreq(tokens) {
  const tf = {};
  tokens.forEach((t) => { tf[t] = (tf[t] || 0) + 1; });
  const max = Math.max(1, ...Object.values(tf));
  Object.keys(tf).forEach((k) => { tf[k] = tf[k] / max; });
  return tf;
}

const docFreq = {};
VOCAB_LIST.forEach((term) => {
  docFreq[term] = CORPUS.filter((tokens) => tokens.includes(term)).length;
});

function idf(term) {
  return Math.log((1 + CORPUS.length) / (1 + (docFreq[term] || 0))) + 1;
}

function vectorize(tokens) {
  const tf = termFreq(tokens);
  const vec = {};
  Object.keys(tf).forEach((term) => { vec[term] = tf[term] * idf(term); });
  return vec;
}

const SECTION_VECTORS = CORPUS.map(vectorize);

function cosineSim(vecA, vecB) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  const keys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  keys.forEach((k) => {
    const a = vecA[k] || 0;
    const b = vecB[k] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function semanticSearch(query, topN = 4) {
  const qVec = vectorize(tokenize(expandQuery(query)));
  const scored = DOC_SECTIONS.map((section, i) => ({
    section,
    score: cosineSim(qVec, SECTION_VECTORS[i]),
  }));
  scored.sort((a, b) => b.score - a.score);
  const withSignal = scored.filter((s) => s.score > 0.012);
  return (withSignal.length ? withSignal : scored).slice(0, topN);
}
