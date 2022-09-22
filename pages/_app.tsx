import "../styles/globals.css";

import type { AppProps } from "next/app";
import Navbar from "../components/Nav";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.route;

  return (
    <div className="AppContainer" style={{ position: "relative" }}>
      <div className="AppBody">
        <Navbar path={path} />

        <Component {...pageProps} />
      </div>
      <div className="AppFooter"></div>
    </div>
  );
}

export default MyApp;
