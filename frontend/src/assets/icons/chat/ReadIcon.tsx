import * as React from 'react';
import { SVGProps } from 'react';
const SvgReadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={17} height={18} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.01 8.509a.694.694 0 0 1 .981 0l2.778 2.778a.694.694 0 0 1-.982.982L4.009 9.49a.694.694 0 0 1 0-.982Z'
      fill='currentColor'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.325 5.731a.694.694 0 0 1 0 .982L7.769 12.27a.694.694 0 1 1-.982-.982l5.555-5.556a.694.694 0 0 1 .982 0Z'
      fill='currentColor'
    />
  </svg>
);
export default SvgReadIcon;
