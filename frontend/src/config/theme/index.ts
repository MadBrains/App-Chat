import { createTheme } from '@mui/material/styles';
import { components } from 'src/config/theme/components';
import { darkThemePalette, lightThemePalette } from 'src/config/theme/palette';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    input: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    input: PaletteOptions['primary'];
  }
}

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1200,
        xl: 1536
      }
    },
    palette: mode === 'dark' ? darkThemePalette : lightThemePalette,
    typography: {
      fontFamily: 'Manrope, sans-serif',
      fontSize: 16,
      h1: { fontSize: '50px', fontWeight: '400', lineHeight: '45px' },
      h2: { fontSize: '24px', fontWeight: '400' },
      h3: { fontSize: '16px', fontWeight: '400', lineHeight: '20px' },
      h4: { fontSize: '18px', fontWeight: '700', lineHeight: '22px' },
      h5: { fontSize: '14px', fontWeight: '400', lineHeight: '19px' },
      body2: { fontSize: '14px', fontWeight: '400', lineHeight: '18px' },
      body1: { fontSize: '12px', fontWeight: '400', lineHeight: '16px' },
      subtitle1: { fontWeight: '400', fontSize: '35px', lineHeight: '90%' }
    },
    components: components(mode)
  });

export default getTheme;
