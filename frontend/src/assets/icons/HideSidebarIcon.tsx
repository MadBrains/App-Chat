import * as React from 'react';
import { SVGProps } from 'react';
const SvgHideSidebarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={8} height={14} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M7 13 1 7l6-6'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgHideSidebarIcon;
