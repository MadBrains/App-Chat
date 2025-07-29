import * as React from 'react';
import { SVGProps } from 'react';
const SvgSettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M12 20a8 8 0 1 0 0-16.001A8 8 0 0 0 12 20v0Z'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 2v2M12 22v-2M17 20.66l-1-1.73M11 10.27 7 3.34M20.66 17l-1.73-1M3.34 7l1.73 1M14 12h8M2 12h2M20.66 7l-1.73 1M3.34 17l1.73-1M17 3.34l-1 1.73M11 13.73l-4 6.93'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgSettingsIcon;
