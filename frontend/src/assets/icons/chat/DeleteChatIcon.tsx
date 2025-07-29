import * as React from 'react';
import { SVGProps } from 'react';
const SvgDeleteChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'
      stroke='#FC8181'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgDeleteChatIcon;
