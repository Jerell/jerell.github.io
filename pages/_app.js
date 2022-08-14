import { initFirebase } from '@/lib/firebase/initFirebase';
import '../styles/globals.css';

initFirebase();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
