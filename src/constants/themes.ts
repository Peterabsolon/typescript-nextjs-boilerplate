// @ts-ignore
import defaults from '@rebass/preset'

export type Theme = 'light' | 'dark'

export const themes: { [key in Theme]: IAnyObject } = {
  // ====================================================
  // Light
  // ====================================================
  light: {
    ...defaults,
    colors: {
      ...defaults.colors,
      background: 'white',
      backgroundDark: '#eee',
      primary: '#14b5f5',
      text: '#333',
    },
  },

  // ====================================================
  // Dark
  // ====================================================
  dark: {
    ...defaults,
    colors: {
      ...defaults.colors,
      background: '#1b2735',
      backgroundDark: '#18222f',
      primary: '#74d3f9',
      secondary: '#fff',
      text: '#fff',
    },
  },
}
