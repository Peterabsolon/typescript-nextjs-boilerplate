interface RebassTheme {
  colors: {
    text: string
    background: string
    primary: string
    secondary: string
    muted: string
    gray: string
    highlight: string
  }
  fonts: {
    body: string
    heading: string
    monospace: string
  }
  fontSizes: number[]
  fontWeights: {
    body: number
    heading: number
    bold: number
  }
  lineHeights: {
    body: number
    heading: number
  }
  space: number[]
  sizes: {
    avatar: number
  }
  radii: {
    default: number
    circle: number
  }
  shadows: {
    card: string
  }
  text: {
    heading: {
      fontFamily: string
      lineHeight: string
      fontWeight: string
    }
    display: {
      fontFamily: string
      fontWeight: string
      lineHeight: string
      fontSize: number[]
    }
    caps: {
      textTransform: string
      letterSpacing: string
    }
  }
  variants: {
    avatar: {
      width: string
      height: string
      borderRadius: string
    }
    card: {
      p: number
      bg: string
      boxShadow: string
    }
    link: {
      color: string
    }
    nav: {
      fontSize: number
      fontWeight: string
      display: string
      p: number
      color: string
      textDecoration: string
      ':hover,:focus,.active': {
        color: string
      }
    }
  }
  buttons: {
    primary: {
      fontSize: number
      fontWeight: string
      color: string
      bg: string
      borderRadius: string
    }
    outline: {
      variant: string
      color: string
      bg: string
      boxShadow: string
    }
    secondary: {
      variant: string
      color: string
      bg: string
    }
  }
  styles: {
    root: {
      fontFamily: string
      fontWeight: string
      lineHeight: string
    }
  }
}

declare module '@rebass/preset' {
  const theme: RebassTheme
  export default theme
}
