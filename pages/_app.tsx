// we store the styles in public, because that way they can also
// be used in the netlify preview
import "../public/styles/globals.css";
import "../public/styles/index.css";
import "../public/styles/Nav.css";
import "../public/styles/WGs.css";
import "../public/styles/about.css";
import "../public/styles/updates.css";
import "../public/styles/GridTable.css";
import "../public/styles/PeopleList.css";
import "../public/styles/grants.css";
import "../public/styles/policies.css";
import "../public/styles/glossary.css";

import type { AppProps } from "next/app";
import Navbar from "../components/Nav";
import { useRouter } from "next/router";
import AuthContextProvider from "../contexts/authContext";

import Footer from "../components/Footer";
import Image from "next/image";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.route;

  return (
    <AuthContextProvider>
      <style jsx global>{`
        html {
          font-family: "Poppins", sans-serif;
        }
      `}</style>
      <div className="AppContainer" style={{ position: "relative" }}>
        <div className="AppContainerBackground">
          <Image
            className="BackgroundImage"
            src="/img/europe_smaller.jpg"
            alt="Map of Europe"
            fill={true}
          />
        </div>
        <div className="AppBody">
          <Navbar path={path} />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default MyApp;
