import * as React from 'react';
import { SVGProps } from 'react';
const SvgDoublePrevIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='m11 17-5-5 5-5M18 17l-5-5 5-5'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgDoublePrevIcon;
