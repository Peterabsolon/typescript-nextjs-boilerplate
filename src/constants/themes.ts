// @ts-ignore
import defaults from '@rebass/preset'

export type ThemeKey = 'light' | 'dark'

const FONT_FACE =
  '-apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif'

const fonts = {
  ...defaults.fonts,
  body: FONT_FACE,
}

// Theme interface has to be defined in ".d.ts" file in order for styled-components to pick it up
export const themes: { [key in ThemeKey]: Theme } = {
  // ====================================================
  // Light
  // ====================================================
  light: {
    ...defaults,
    fonts,
    colors: {
      ...defaults.colors,
      background: 'white',
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
