// use global styles, because module styles don't work with
// netlify-cms previews. Note that the styles must also be
// copied to public/previewstyles
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/Nav.css";
import "../styles/WGs.css";
import "../styles/people.css";
import "../styles/GridTable.css";
import "../styles/PeopleList.css";

import type { AppProps } from "next/app";
import Navbar from "../components/Nav";
import { useRouter } from "next/router";
import Image from "next/image";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.route;

  return (
    <div>
      <div className="AppContainer" style={{ position: "relative" }}>
        <div className="AppBody">
          <Navbar path={path} />
          <Component {...pageProps} />
        </div>
      </div>
      <div className="AppFooter">
        <a href="https://www.cost.eu/" style={{ width: "100px" }}>
          <img
            src="/img/cost.png"
            alt="COST Association logo"
            style={{ height: "70px" }}
          />
        </a>
      </div>
    </div>
  );
}

export default MyApp;
