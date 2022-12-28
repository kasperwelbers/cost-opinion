import Link from "next/link";
import React from "react";

import { NextPage } from "next";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "WGs", href: "/wgs" },
  { text: "People", href: "/people" },
  { text: "Updates", href: "/updates" },
  { text: "Contact", href: "/contact" },
];

interface Props {
  path: string;
}

const Navbar: NextPage<Props> = ({ path }) => {
  return (
    <header>
      <nav className="Nav">
        <div className="NavContainer">
          {MENU_LIST.map((menu, i) => (
            <Link
              className={`NavLink ${path === menu.href ? "selected" : ""}`}
              href={menu.href}
              key={menu.text}
            >
              <span>{menu.text}</span>{" "}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
