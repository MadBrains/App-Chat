import * as React from 'react';
import { SVGProps } from 'react';
const SvgEye = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgEye;
