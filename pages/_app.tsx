// we store the styles in public, because that way they can also
// be used in the netlify preview
import "../public/styles/globals.css";
import "../public/styles/index.css";
import "../public/styles/Nav.css";
import "../public/styles/WGs.css";
import "../public/styles/people.css";
import "../public/styles/updates.css";
import "../public/styles/GridTable.css";
import "../public/styles/PeopleList.css";

import type { AppProps } from "next/app";
import Navbar from "../components/Nav";
import { useRouter } from "next/router";

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
