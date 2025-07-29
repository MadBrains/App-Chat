import * as React from 'react';
import { SVGProps } from 'react';
const SvgAddPlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M8 3.333v9.334M3.333 8h9.334'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgAddPlusIcon;
