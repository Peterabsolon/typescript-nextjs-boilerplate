// @ts-ignore
import defaults from '@rebass/preset'

export const theme = {
  ...defaults,
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  colors: {
    primary: '#07c',
    gray: '#f6f6ff',
  },
  buttons: {
    primary: {
      color: 'white',
      bg: 'primary',
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
    },
  },
}
