import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../app/redux/store';
import Layout from '../app/components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
