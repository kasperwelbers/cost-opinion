import "../styles/globals.css";

import type { AppProps } from "next/app";
import Navbar from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="AppContainer">
      <div className="AppBody">
        <Navbar />

        <Component {...pageProps} />
      </div>
      <div className="AppFooter"></div>
    </div>
  );
}

export default MyApp;
