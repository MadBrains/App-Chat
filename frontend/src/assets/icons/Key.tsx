import * as React from 'react';
import { SVGProps } from 'react';
const SvgKey = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M15.5 7.5 19 4m2-2-2 2 2-2Zm-9.61 9.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777v-.001Zm0 0L15.5 7.5l-4.11 4.11ZM15.5 7.5l3 3L22 7l-3-3-3.5 3.5Z'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgKey;
