import * as React from 'react';
import { SVGProps } from 'react';
const SvgAddChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M11.666 7.5h-.833v-.833a.833.833 0 1 0-1.667 0V7.5h-.833a.833.833 0 0 0 0 1.667h.833V10a.833.833 0 1 0 1.667 0v-.833h.833a.833.833 0 0 0 0-1.667Zm4.167-5.833H4.167a2.5 2.5 0 0 0-2.5 2.5V12.5a2.5 2.5 0 0 0 2.5 2.5h9.658l3.083 3.092a.834.834 0 0 0 1.283-.13.834.834 0 0 0 .142-.462V4.167a2.5 2.5 0 0 0-2.5-2.5Zm.833 13.825-1.908-1.917a.834.834 0 0 0-.591-.242h-10a.833.833 0 0 1-.834-.833V4.167a.833.833 0 0 1 .833-.834h11.667a.833.833 0 0 1 .833.834v11.325Z'
      fill='currentColor'
    />
  </svg>
);
export default SvgAddChatIcon;
