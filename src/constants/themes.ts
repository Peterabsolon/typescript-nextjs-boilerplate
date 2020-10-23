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
      background: 'white',
      primary: 'orange',
      text: '#333',
    },
  },

  // ====================================================
  // Dark
  // ====================================================
  dark: {
    ...defaults,
    colors: {
      background: 'black',
      primary: 'aqua',
      secondary: '#aaa',
      text: '#fff',
    },
  },
}
