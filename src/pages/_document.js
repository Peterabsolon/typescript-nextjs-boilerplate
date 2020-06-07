import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content='Track your efforts'></meta>
        </Head>
        <body>
          Document
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
