/**
 * ChefMentor X – Design Tokens
 */

export const Colors = {
  primary: {
    50: '#FFF0EB', 100: '#FFE0D6', 200: '#FFC1AD', 300: '#FFA285',
    400: '#FF835C', 500: '#FF6B4A', 600: '#E85A3A', 700: '#CC4A2E',
    800: '#A63B24', 900: '#802D1B',
  },
  accent: {
    50: '#F0F5F1', 100: '#D9E8DC', 200: '#B3D1B9', 300: '#8DBA96',
    400: '#6B8F71', 500: '#5A7D60', 600: '#496B4F', 700: '#3A593F',
    800: '#2C4730', 900: '#1E3521',
  },
  neutral: {
    50: '#FAFAFA', 100: '#F4F4F5', 200: '#E4E4E7', 300: '#D4D4D8',
    400: '#A1A1AA', 500: '#71717A', 600: '#52525B', 700: '#3F3F46',
    800: '#27272A', 900: '#18181B',
  },
  brand: {
    orange: '#FF6B4A', orangeDark: '#E85A3A',
    peach: '#FFEFEB', peachLight: '#FFF0EB',
    sage: '#6B8F71', sageDark: '#5A7D60',
  },
  success: '#059669', warning: '#D97706', error: '#DC2626', info: '#0284C7',
  white: '#FFFFFF', black: '#000000',
  background: '#F8F9FA', backgroundDark: '#18181B',
  surfaceLight: '#F9FAFB', surfaceDark: '#27272A',
  textMain: '#1F2937', textSub: '#6B7280',
} as const;

export const Typography = {
  fontFamily: { primary: 'DMSans', display: 'PlayfairDisplay', sans: 'DMSans', mono: 'JetBrainsMono' },
  fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 42 },
  fontWeight: { regular: '400' as const, medium: '500' as const, semibold: '600' as const, bold: '700' as const, extrabold: '800' as const },
} as const;

export const Spacing = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 } as const;
export const BorderRadius = { none: 0, sm: 4, base: 8, md: 12, lg: 16, xl: 20, '2xl': 24, '3xl': 32, full: 9999 } as const;

export const Shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  base: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 15, elevation: 8 },
  glow: { shadowColor: '#FF6B4A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 6 },
} as const;

export const Breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;
export const Layout = { containerMaxWidth: 1280, columns: 12, gutter: 16 } as const;
export const Animation = { duration: { fast: 150, normal: 200, slow: 300 }, easing: 'ease-in-out' } as const;
export const IconSize = { sm: 16, md: 20, lg: 24 } as const;
export const TouchTarget = { min: 44 } as const;
