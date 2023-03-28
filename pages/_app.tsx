import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import NavBarComponent from '../components/Header';
import CustomFont from '../components/customFonts';
import Footer  from '../components/footer'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const navbarLinks = [
  {
    label: 'Study',
    link: '/study'
  }, {
    label: 'About',
    link: '/about'
  }, {
    label: 'Insights',
    link: '/compare'
  }
  ]

  return (
    <>
      <Head>
        <title>Deceptive Interfaces Library</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@200;300;400;500;600;700&family=Inter:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{
          fontSizes: {
            xs: 14,
            sm: 18,
            md: 25,
            lg: 65,
            xl: 80,
          },
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.3,
          headings: { fontFamily: 'Inter Tight, sans-serif' },
          colorScheme: 'light',
          components: {
            Container: {
              defaultProps: {
                sizes: {
                  xs: 540,
                  sm: 720,
                  md: 1160,
                  lg: 1140,
                  xl: 1520,
                },
              },
            },
          }
        }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <NavBarComponent links={navbarLinks}></NavBarComponent>
            <Component {...pageProps} />
            <Footer></Footer>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
