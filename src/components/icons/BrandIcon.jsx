export function BrandIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <path
        d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4.5 5.4 4a4.6 4.6 0 0 1 6.6 1.8A4.6 4.6 0 0 1 18.6 4C22 4.5 23.6 8 22 11.8 19.5 16.4 12 21 12 21Z"
        stroke="white"
        strokeWidth="1.6"
      />
      <path
        d="M6 12h2.4l1.4-3 2.4 6 1.4-3H16"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandIconSimple({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
      <path
        d="M12 21s-7.5-4.6-10-9.2C.4 8 2 4.5 5.4 4a4.6 4.6 0 0 1 6.6 1.8A4.6 4.6 0 0 1 18.6 4C22 4.5 23.6 8 22 11.8 19.5 16.4 12 21 12 21Z"
        stroke="white"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
      <path d="M4 20l16-8L4 4v6l10 2-10 2v6Z" fill="white" />
    </svg>
  );
}
