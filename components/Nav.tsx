import Link from "next/link";
import React from "react";
import Logo from "../public/logos/logo_net2.svgr";

import { NextPage } from "next";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "WGs", href: "/wgs" },
  { text: "People", href: "/people" },
  { text: "Updates", href: "/updates" },
];

interface Props {
  path: string;
}

const Navbar: NextPage<Props> = ({ path }) => {
  return (
    <header>
      <nav className="Container Nav">
        <div className="LogoAndName">
          <Logo className="Logo" />
          <div className="Name">
            <span>OPINION</span>
            <br />
            <span>Network</span>
          </div>
        </div>
        <div className="NavContainer">
          {MENU_LIST.map((menu, i) => (
            <Link href={menu.href} key={menu.text}>
              <a className={`NavLink ${path === menu.href ? "selected" : ""}`}>
                {menu.text}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
