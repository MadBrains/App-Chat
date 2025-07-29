import React, { ReactElement } from 'react';
import { Badge } from '@mui/material';
import { Colors } from 'src/config/colors';

interface OnlineBudgeProps {
  children: ReactElement;
  online?: boolean;
  large?: boolean;
}

const genBudgeSx = (large?: boolean) => ({
  '.MuiBadge-badge': {
    backgroundColor: Colors.lightGreen,
    outline: 'solid white',
    width: large ? 15 : 7.5,
    height: large ? 15 : 7.5,
    borderRadius: large ? 10 : 5,
    outlineWidth: large ? 2 : 1
  }
});

const OnlineBudge: React.FC<OnlineBudgeProps> = ({ children, online, large }) => (
  <Badge
    overlap='circular'
    badgeContent=''
    variant='dot'
    sx={genBudgeSx(large)}
    invisible={!online}
  >
    {children}
  </Badge>
);

export default OnlineBudge;
