import * as React from 'react';
import { SVGProps } from 'react';
const SvgChatsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3M22 14v3h-3'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14 17c0-.58.197-1.146.564-1.632a3.41 3.41 0 0 1 1.509-1.107 4.03 4.03 0 0 1 1.967-.225c.667.09 1.29.342 1.793.729l1.167.9M14 23v-3h3'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M22 20c0 .58-.197 1.146-.564 1.632a3.41 3.41 0 0 1-1.509 1.107 4.03 4.03 0 0 1-1.967.225 3.772 3.772 0 0 1-1.793-.729l-1.167-.9'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgChatsIcon;
