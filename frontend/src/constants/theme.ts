/**
 * ChefMentor X – Design Tokens
 * Based on the Frontend Design System specification.
 */

export const Colors = {
  // Primary (Mentor Blue – Trust & Guidance)
  primary: {
    50: '#eef4ff',
    100: '#dbe7ff',
    200: '#bcd4ff',
    300: '#8fb8ff',
    400: '#5c94ff',
    500: '#2f6fff',
    600: '#1f56e0',
    700: '#1943b8',
    800: '#183a8f',
    900: '#162f6b',
  },
  // Accent (Fresh Green – Success & Improvement)
  accent: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  // Neutral (Kitchen Calm)
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  // Brand color from stitch mockups
  brand: {
    orange: '#FF6B4A',
    orangeDark: '#E85A3A',
    peach: '#FFEFEB',
    peachLight: '#FFF0EB',
  },
  // Semantic
  success: '#16a34a',
  warning: '#f59e0b',
  error: '#dc2626',
  info: '#0284c7',
  // Surfaces
  white: '#FFFFFF',
  black: '#000000',
  background: '#F8F9FA',
  backgroundDark: '#18181B',
  surfaceDark: '#27272A',
} as const;

export const Typography = {
  fontFamily: {
    primary: 'Inter',
    mono: 'JetBrainsMono',
    display: 'PlusJakartaSans',
    serif: 'PlayfairDisplay',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
} as const;

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  glow: {
    shadowColor: '#FF6B4A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
} as const;

export const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const Layout = {
  containerMaxWidth: 1280,
  columns: 12,
  gutter: 16,
} as const;

export const Animation = {
  duration: {
    fast: 150,
    normal: 200,
    slow: 300,
  },
  easing: 'ease-in-out',
} as const;

export const IconSize = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export const TouchTarget = {
  min: 44,
} as const;
