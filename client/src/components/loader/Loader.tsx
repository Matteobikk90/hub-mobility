export const Loader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 200 200"
    fill="none"
    className="text-azzurro absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <defs>
      <linearGradient id="spinner-secondHalf">
        <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
        <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
      </linearGradient>
      <linearGradient id="spinner-firstHalf">
        <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
        <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
      </linearGradient>
    </defs>

    <g strokeWidth="8">
      <path
        stroke="url(#spinner-secondHalf)"
        d="M 4 100 A 96 96 0 0 1 196 100"
      />
      <path
        stroke="url(#spinner-firstHalf)"
        d="M 196 100 A 96 96 0 0 1 4 100"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        d="M 4 100 A 96 96 0 0 1 4 98"
      />
    </g>
    <animateTransform
      from="0 0 0"
      to="360 0 0"
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      repeatCount="indefinite"
      dur="1s"
    />
  </svg>
);
