import * as React from 'react';
import { SVGProps } from 'react';
const SvgArchiveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M20 4H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M10 13h4'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgArchiveIcon;
