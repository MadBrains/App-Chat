import { Colors } from 'src/config/theme/palette';
import { Theme } from '@mui/material/styles';

export const components = (mode: 'light' | 'dark'): Theme['components'] => ({
  MuiAccordion: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        width: '100%',
        backgroundColor: 'transparent',
        backgroundImage: 'none'
      }
    }
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        padding: 0
      }
    }
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: '0 11px 0 0',
        '& .Mui-expanded .accordion-expand': {
          transform: 'rotate(360deg)'
        }
      },
      content: {
        display: 'flex',
        alignItems: 'center',
        margin: 0
      }
    }
  },
  MuiCssBaseline: {
    styleOverrides: {
      root: {
        color: Colors[mode].primaryMain
      }
    }
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true
    }
  },
  MuiSelect: {
    variants: [
      {
        props: { variant: 'filled' },
        style: {
          outline: 'none',
          borderRadius: 100,
          height: '100%',
          background: Colors[mode].input,
          '&::before': {
            borderBottom: 'none !important'
          },
          '&::after': {
            borderBottom: 'none !important'
          },
          '& .MuiSelect-select:focus': {
            background: 'none !important'
          },
          '&.MuiSelect-active': {
            background: 'none !important'
          },
          '& .MuiSelect-select': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          '& .MuiSelect-select.MuiFilledInput-input': {
            padding: '15px 0 5px 0 !important'
          },
          '&.Mui-error': {
            border: `1px solid ${Colors[mode].fieldError}`
          },
          '&.Mui-focused': {
            background: Colors[mode].input
          }
        }
      }
    ]
  },
  MuiButton: {
    variants: [
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          backgroundColor: Colors[mode].primaryMain
        }
      },
      {
        props: { variant: 'contained', color: 'primary', size: 'small' },
        style: {
          width: '100px',
          height: '28px',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '20px'
        }
      },
      {
        props: { variant: 'contained', color: 'secondary' },
        style: {
          backgroundColor: Colors[mode].button,
          '&:hover': {
            backgroundColor: Colors[mode].button
          },
          '&:active': {
            backgroundColor: Colors[mode].secondaryDark
          }
        }
      },
      {
        props: { variant: 'text', size: 'small' },
        style: {
          padding: '5px',
          width: 'max-content',
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: '400',
          ':hover': {
            backgroundColor: 'transparent'
          }
        }
      }
    ],
    styleOverrides: {
      root: {
        padding: '13px 16px 13px 16px',
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '1px',
        fontWeight: 500,
        boxShadow: 'none !important',
        borderRadius: '100px',
        width: '100%',
        textTransform: 'initial'
      }
    }
  },
  MuiIconButton: { styleOverrides: { root: { color: 'inherit' } } },
  MuiPaper: {
    styleOverrides: {
      root: {
        '&.MuiPopover-paper': {
          borderRadius: '16px'
        }
      }
    }
  }
});
