import * as React from 'react';
import { SVGProps } from 'react';
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5Z'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgEdit;
