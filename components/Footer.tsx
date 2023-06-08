import LogoNet from "../public/logos/logo_net.svgr";
import Cost from "../public/logos/logo_cost.svgr";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="AppFooter">
      <a href="https://www.cost.eu">
        <Cost height="55px" />
      </a>
      <img src="/img/eu.gif" alt={"Funded by the European Union"} />
      <div className="LogoAndName">
        <a href="https://vu.nl/en">
          <img src="/img/vu.png" alt={"Vrije Universiteit Amsterdam Logo"} />
        </a>
        {/* <div className="Name">
          <span>Vrije Universiteit</span>
          <br />
          <span>Amsterdam</span>
        </div> */}
      </div>
      {/* <a
        className="JoinLink"
        href="https://cost.eu/actions/CA21129"
        target="_blank"
        rel="noreferrer"
      >
        Apply to join OPINION
      </a> */}
      {/* <Link href="about">
        <div className="LogoAndName">
          <LogoNet className="Logo" />
          <div className="Name">
            <span>OPINION</span>
            <br />
            <span>Network</span>
          </div>
        </div>
      </Link> */}
    </div>
  );
}
