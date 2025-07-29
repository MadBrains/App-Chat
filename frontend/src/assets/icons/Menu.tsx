import * as React from 'react';
import { SVGProps } from 'react';
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={14} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M1 1h18M1 7h18M1 13h18'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgMenu;
