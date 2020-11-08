import { createGlobalStyle } from 'styled-components'

export const PAGE_TRANSITION_DURATION = 80

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: .8rem;
  }

  html,
  body,
  body * {
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fonts.body};
    font-size: 13px;
  }

  .page-transition-enter {
    opacity: 0;
  }

  .page-transition-enter-active {
    opacity: 1;
    transition: ${PAGE_TRANSITION_DURATION}ms ease-in;
  }

  .page-transition-exit {
    opacity: 1;
  }

  .page-transition-exit-active {
    opacity: 0;
    transition: ${PAGE_TRANSITION_DURATION}ms ease-out;
  }
`
