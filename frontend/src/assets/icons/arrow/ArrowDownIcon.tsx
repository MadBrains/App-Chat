import * as React from 'react';
import { SVGProps } from 'react';
const SvgArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='m4 6 4 4 4-4'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgArrowDownIcon;
