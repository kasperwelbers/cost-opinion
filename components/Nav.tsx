import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import { BiNetworkChart } from "react-icons/bi";

import styles from "styles/Nav.module.css";
import { NextPage } from "next";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "WGs", href: "/wgs" },
  { text: "People", href: "/people" },
  { text: "Agenda", href: "/agenda" },
];

interface Props {
  path: string;
}

const Navbar: NextPage<Props> = ({ path }) => {
  return (
    <header>
      <nav className="Container Nav">
        <div className="NavContainer">
          <BiNetworkChart style={{ fontSize: "2rem", paddingRight: "1rem" }} />

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
