import * as React from 'react';
import { SVGProps } from 'react';
const SvgThreeDot = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={25} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M12 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 20.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgThreeDot;
