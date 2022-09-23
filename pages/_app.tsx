// use global styles, because module styles don't work with
// netlify-cms previews. Note that the styles must also be
// copied to public/previewstyles
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/Nav.css";
import "../styles/WGs.css";
import "../styles/people.css";
import "../styles/GridTable.css";

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
