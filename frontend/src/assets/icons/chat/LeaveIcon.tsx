import * as React from 'react';
import { SVGProps } from 'react';
const SvgLeaveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M8 7l-5 5 5 5M3 12h12'
      stroke='#FC8181'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgLeaveIcon;
