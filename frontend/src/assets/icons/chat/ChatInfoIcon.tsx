import * as React from 'react';
import { SVGProps } from 'react';
const SvgChatInfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={25} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M12 22.5c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10ZM12 16.5v-4M12 8.5h.01'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgChatInfoIcon;
