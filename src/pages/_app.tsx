import { ReactNode } from 'react'

// Perf debug
// export function reportWebVitals(metric: any) {
//   console.log(metric)
// }

export default function MyApp({ Component, pageProps }: IAnyObject): ReactNode {
  return <Component {...pageProps} />
}
