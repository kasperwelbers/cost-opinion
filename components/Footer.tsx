import LogoNet from "../public/logos/logo_net.svgr";
import Cost from "../public/logos/logo_cost.svgr";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="AppFooter">
      <a href="https://www.cost.eu">
        <Cost height="55px" />
      </a>
      <img
        src="/img/EN-Funded by the EU-POS.jpg"
        alt={"Funded by the European Union"}
      />

      <Link href="about">
        <div className="LogoAndName">
          <img src="/img/opinion_i.gif" alt={"OPINION logo"} />

          <div className="Name">
            <span>OPINION</span>
            <br />
            <span>Network</span>
          </div>
        </div>
      </Link>
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
