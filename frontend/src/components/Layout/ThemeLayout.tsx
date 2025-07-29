import React, { PropsWithChildren } from 'react';
import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import getTheme from 'src/config/theme';
import { ThemeProvider } from '@mui/material/styles';

const ThemeLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const mode = useSelector(state => state.profile.theme, shallowEqual);
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeLayout;
