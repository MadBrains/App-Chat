import * as React from 'react';
import { SVGProps } from 'react';
const SvgDeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M2 4h12M12.667 4v9.333c0 .667-.666 1.334-1.333 1.334H4.667c-.666 0-1.333-.667-1.333-1.334V4M5.334 4V2.667c0-.667.667-1.334 1.333-1.334h2.667c.667 0 1.333.667 1.333 1.334V4'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgDeleteIcon;
