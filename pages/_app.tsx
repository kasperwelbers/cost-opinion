import "../styles/globals.css";

import type { AppProps } from "next/app";
import Navbar from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='AppContainer'>
      <Navbar />
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
