import { ReactNode } from 'react'

// Perf debug
// export function reportWebVitals(metric: any) {
//   console.log(metric)
// }

interface IAnyObject {
  [key: string]: any
}

export default function MyApp({ Component, pageProps }: IAnyObject): ReactNode {
  return <Component {...pageProps} />
}
