import defaults from '@rebass/preset'

console.log('defaults', defaults)

export type ThemeKey = 'light' | 'dark'

const FONT_FACE =
  '-apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif'

const fonts = {
  ...defaults.fonts,
  body: FONT_FACE,
}

const shared = {
  ...defaults,
  fonts,
}

const primary = '#182a61'
const border = '#eef1fb'

// Theme interface defined in ~/@types/theme.d.ts
// styled-components picks it up from there to provide typings for props.theme
export const themes: { [key in ThemeKey]: Theme } = {
  // ====================================================
  // Light
  // ====================================================
  light: {
    ...shared,
    colors: {
      ...defaults.colors,
      background: 'whitesmoke',
      backgroundLight: '#eef1fb',
      primary,
      border,
      secondary: '#74d3f9',
      text: '#333',
    },
  },

  // ====================================================
  // Dark
  // ====================================================
  dark: {
    ...shared,
    colors: {
      ...defaults.colors,
      background: '#18222f',
      backgroundLight: '#1b2735',
      primary,
      border,
      secondary: 'hsl(0 0% 95% / 1)',
      text: '#fff',
    },
  },
}
