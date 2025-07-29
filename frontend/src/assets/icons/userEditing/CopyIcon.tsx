import * as React from 'react';
import { SVGProps } from 'react';
const SvgCopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={19} height={22} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M13.5 1H6.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V5.5L13.5 1Z'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M1 6.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8M13 1v5h5'
      stroke='#000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgCopyIcon;
