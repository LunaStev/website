// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the Portfolio License 1.0

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);