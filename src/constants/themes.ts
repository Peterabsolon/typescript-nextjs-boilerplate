// @ts-ignore
import defaults from '@rebass/preset'

export type ThemeKey = 'light' | 'dark'

const FONT_FACE =
  '-apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif'

const fonts = {
  ...defaults.fonts,
  body: FONT_FACE,
}

// Theme interface defined in ~/@types/theme.d.ts
// styled-components picks it up from there to provide typings for props.theme
export const themes: { [key in ThemeKey]: Theme } = {
  // ====================================================
  // Light
  // ====================================================
  light: {
    ...defaults,
    fonts,
    colors: {
      ...defaults.colors,
      background: 'whitesmoke',
      backgroundDark: '#efefef',
      primary: '#14b5f5',
      secondary: '#74d3f9',
      text: '#333',
    },
  },

  // ====================================================
  // Dark
  // ====================================================
  dark: {
    ...defaults,
    fonts,
    colors: {
      ...defaults.colors,
      background: '#1b2735',
      backgroundDark: '#18222f',
      primary: '#74d3f9',
      secondary: 'hsl(0 0% 95% / 1)',
      text: '#fff',
    },
  },
}
