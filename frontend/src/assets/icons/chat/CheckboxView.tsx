import * as React from 'react';
import { SVGProps } from 'react';
const SvgCheckboxView = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M15.71 8.29a1 1 0 0 0-1.42 0L12 10.59l-2.29-2.3a1.004 1.004 0 0 0-1.42 1.42l2.3 2.29-2.3 2.29a1 1 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219l2.29-2.3 2.29 2.3a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095L13.41 12l2.3-2.29a1 1 0 0 0 0-1.42ZM19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14Z'
      fill='#D9D9D9'
    />
  </svg>
);
export default SvgCheckboxView;
