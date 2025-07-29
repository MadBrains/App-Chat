import * as React from 'react';
import { SVGProps } from 'react';
const SvgPersonalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3M22 22v-1c0-.53-.24-1.04-.67-1.414A2.461 2.461 0 0 0 19.715 19h-3.428c-.607 0-1.188.21-1.617.586C14.241 19.96 14 20.47 14 21v1'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M18 15.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgPersonalIcon;
