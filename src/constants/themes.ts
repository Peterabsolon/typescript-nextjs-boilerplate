import defaults from '@rebass/preset'

console.log('defaults', defaults)

export type ThemeKey = 'light' | 'dark'

const FONT_FACE =
  '-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol'

const fonts = {
  ...defaults.fonts,
  body: FONT_FACE,
}

const shared = {
  ...defaults,
  fonts,
}

const primary = '#182a61'
const secondary = '#f47920'
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
      secondary,
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
      secondary,
      text: '#fff',
    },
  },
}
