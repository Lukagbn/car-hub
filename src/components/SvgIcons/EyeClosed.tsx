interface EyeClosedProps {
  onClick: () => void;
}

function EyeClosed({ onClick }: EyeClosedProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className="absolute right-0 bottom-1/2 translate-y-1/2 cursor-pointer"
      onClick={onClick}
    >
      <title>eye-closed</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.479 9.693c2.42 2.468 5.792 4 9.521 4s7.101-1.53 9.521-4m-16.16 2.23l-1.694 2.769m6.066-1.191l-.636 3.166m9.542-4.744l1.694 2.769m-6.066-1.191l.636 3.166"
      />
    </svg>
  );
}
export default EyeClosed;
