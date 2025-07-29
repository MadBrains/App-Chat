export const Colors = {
  light: {
    primaryMain: '#000000',
    primaryContrast: '#FFFFFF',
    secondaryLight: '#F6F6F6',
    secondaryMain: '#CACACA',
    secondaryDark: '#D9D9D9',
    input: '#F6F6F6',
    inputHover: '#D9D9D9',
    button: '#E6E7EA',
    fieldError: '#FC8181',
    blue: '#2400FE',
    textInfo: '#86878F'
  },
  dark: {
    primaryMain: '#ffffff',
    primaryContrast: '#000000',
    secondaryMain: '#706c6c',
    secondaryDark: '#3d3b3b',
    secondaryLight: '#0e0d0d',
    input: '#b6b5b5',
    inputHover: '#7A7A7A',
    button: '#171616',
    fieldError: '#FC8181',
    blue: '#2400FE'
  }
};

const grayColors = {
  gray1: '#E6E7EA',
  gray2: '#F6F6F6',
  gray3: '#CACACA',
  gray4: '#d0cccc',
  gray5: '#A5A5A5',
  gray6: '#C5C5C5',
  gray7: '#D9D9D9',
  gray8: '#E3E5E8',
  gray9: '#DFE2E5',
  gray10: '#E6E6E6',
  gray11: '#F4F4F4',
  gray12: '#7A7A7A',
  gray13: '#ECEBEB',
  gray14: '#858585',
  gray15: '#E9E9E9',
  darkGray1: '#232323',
  darkGray2: '#2E2E2E'
};

export const lightThemePalette = {
  primary: {
    main: Colors.light.primaryMain
  },
  secondary: {
    main: Colors.light.secondaryMain,
    light: Colors.light.secondaryLight,
    dark: Colors.light.secondaryDark
  },
  input: {
    main: Colors.light.input,
    light: Colors.light.inputHover
  },
  neutral: {
    main: Colors.light.blue,
    light: Colors.light.primaryContrast
  },
  info: {
    main: Colors.light.secondaryLight,
    dark: Colors.light.secondaryMain,
    light: Colors.light.textInfo
  },
  error: {
    main: Colors.light.fieldError
  }
};

export const darkThemePalette = {
  mode: 'dark',
  primary: {
    main: Colors.dark.primaryMain
  },
  secondary: {
    main: Colors.dark.secondaryMain,
    light: Colors.dark.secondaryLight,
    dark: Colors.dark.secondaryDark,
    contrastText: Colors.dark.primaryMain
  },
  neutral: {
    main: Colors.dark.blue,
    light: Colors.dark.secondaryDark
  },
  input: {
    main: Colors.dark.input,
    light: Colors.dark.inputHover
  },
  background: {
    default: Colors.dark.secondaryDark,
    paper: Colors.dark.button
  },
  text: {
    primary: Colors.dark.primaryMain,
    secondary: Colors.dark.primaryMain
  },
  divider: Colors.dark.secondaryMain,
  info: {
    main: Colors.dark.primaryMain,
    dark: Colors.light.primaryContrast,
    light: Colors.light.textInfo
  },
  error: {
    main: Colors.dark.fieldError
  }
};
