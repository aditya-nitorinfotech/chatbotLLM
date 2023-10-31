import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#0162C4',
  dark: '#007B55',
  darker: '#005249',
  red: '#B82225'
};
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const grey = {
  100: "#e0e0e0",
  200: "#c2c2c2",
  300: "#a3a3a3",
  400: "#858585",
  500: "#666666",
  600: "#525252",
  700: "#3d3d3d",
  800: "#292929",
  900: "#141414",
}

const primary = {
  100: "#d0d1d5",
  200: "#a1a4ab",
  300: "#727681",
  400: "#1F2A40",
  500: "#141b2d",
  600: "#101624",
  700: "#0c101b",
  800: "#080b12",
  900: "#040509",
}

const greenAccent = {
  100: "#dbf5ee",
  200: "#b7ebde",
  300: "#94e2cd",
  400: "#70d8bd",
  500: "#4cceac",
  600: "#3da58a",
  700: "#2e7c67",
  800: "#1e5245",
  900: "#0f2922",
}


const redAccent = {
  100: "#f8dcdb",
  200: "#f1b9b7",
  300: "#e99592",
  400: "#e2726e",
  500: "#db4f4a",
  600: "#af3f3b",
  700: "#832f2c",
  800: "#58201e",
  900: "#2c100f",
}

const blueAccent = {
  100: "#e1e2fe",
  200: "#c3c6fd",
  300: "#a4a9fc",
  400: "#868dfb",
  500: "#6870fa",
  600: "#535ac8",
  700: "#3e4396",
  800: "#2a2d64",
  900: "#151632",
}

const greyDark = {
  100: "#141414",
  200: "#292929",
  300: "#3d3d3d",
  400: "#525252",
  500: "#666666",
  600: "#858585",
  700: "#a3a3a3",
  800: "#c2c2c2",
  900: "#e0e0e0",
}

const primaryDark = {
  100: "#040509",
  200: "#080b12",
  300: "#0c101b",
  400: "#f2f0f0", // manually changed
  500: "#141b2d",
  600: "#1F2A40",
  700: "#727681",
  800: "#a1a4ab",
  900: "#d0d1d5",
}

const greenAccentDark = {
  100: "#0f2922",
  200: "#1e5245",
  300: "#2e7c67",
  400: "#3da58a",
  500: "#4cceac",
  600: "#70d8bd",
  700: "#94e2cd",
  800: "#b7ebde",
  900: "#dbf5ee",
}

const redAccentDark = {
  100: "#2c100f",
  200: "#58201e",
  300: "#832f2c",
  400: "#af3f3b",
  500: "#db4f4a",
  600: "#e2726e",
  700: "#e99592",
  800: "#f1b9b7",
  900: "#f8dcdb",
}

const blueAccentDark = {
  100: "#151632",
  200: "#2a2d64",
  300: "#3e4396",
  400: "#535ac8",
  500: "#6870fa",
  600: "#868dfb",
  700: "#a4a9fc",
  800: "#c3c6fd",
  900: "#e1e2fe",
}

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,

  greyLight: grey,
  primaryLight: primary,
  greenAccent: greenAccent,
  redAccent: redAccent,
  blueAccent: blueAccent,
  greyDark: greyDark,
  primaryDark: primaryDark,
  greenAccentDark: greenAccentDark,
  redAccentDark: redAccentDark,
  blueAccentDark: blueAccentDark,

  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16], dark: "#000" },
    action: { active: GREY[500], ...COMMON.action },
  },
};





export default palette;
