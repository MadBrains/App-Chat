import * as React from "react";
import { ReactElement } from "react";
import { AppProps } from "next/app";
import { NextPageWithLayout } from "src/types/types";
import { CssBaseline } from "@mui/material";
import "src/index.css";
import "react-toastify/dist/ReactToastify.css";
import createEmotionCache from "src/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import Head from "next/head";
import ThemeLayout from "src/components/Layout/ThemeLayout";
import Alert from "src/ui/Alert/Alert";
import "dayjs/locale/ru";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import isToday from "dayjs/plugin/isToday";
import dayjs from "dayjs";
import RefreshMiddleware from "src/utils/helpers/authHelper";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.locale("ru");

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();
export const refreshMiddleware = new RefreshMiddleware();

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <React.Fragment>
      <Head>
        <title>MadBrains</title>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <ThemeLayout>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeLayout>
          </CacheProvider>
          <Alert />
        </Provider>
      </ErrorBoundary>
    </React.Fragment>
  );
}
