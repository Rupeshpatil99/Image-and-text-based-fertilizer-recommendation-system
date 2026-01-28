import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22a10 10 0 0 0 10-10H2a10 10 0 0 0 10 10z" />
    <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5A4.5 4.5 0 0 0 12 2z" />
    <path d="M12 12v10" />
    <path d="m4.33 15.67 1.25-2.16" />
    <path d="m19.67 15.67-1.25-2.16" />
  </svg>
);
