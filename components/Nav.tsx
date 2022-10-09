import Link from "next/link";
import React from "react";
import Logo from "../public/logos/logo_cg.svgr";

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
        <div className="NavContainer">
          <Logo className="Logo" />

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
