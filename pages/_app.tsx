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
import AuthContextProvider from "../contexts/authContext";

import Cost from "../public/logos/logo_cost.svgr";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.route;

  return (
    <AuthContextProvider>
      <div className="AppContainer" style={{ position: "relative" }}>
        <div className="AppBody">
          <Navbar path={path} />
          <Component {...pageProps} />
        </div>
        <div className="AppFooter">
          <a
            href="https://www.cost.eu/actions/CA21129/"
            style={{ width: "100px" }}
          >
            <Cost height="50px" />
          </a>
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default MyApp;
