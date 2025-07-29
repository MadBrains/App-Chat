import * as React from 'react';
import { SVGProps } from 'react';
const SvgEyeOff = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08c.421-.052.845-.08 1.27-.08 7 0 10 7 10 7a13.163 13.163 0 0 1-1.67 2.68'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgEyeOff;
