import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./Logo";

import styles from "styles/Nav.module.css";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "WGs", href: "/wgs" },
];

const Navbar = () => {
  const [selected, setSelected] = useState(0);

  return (
    <header>
      <nav className={styles.Nav}>
        <div className={styles.NavContainer}>
          {MENU_LIST.map((menu, i) => (
            <Link href={menu.href} key={menu.text}>
              <a
                className={`${styles.NavLink} ${
                  selected === i ? styles.selected : ""
                }`}
                onClick={() => setSelected(i)}
              >
                {menu.text}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

const NavItem = ({ text, href, selected }) => {
  console.log(selected);
  return (
    <Link href={href}>
      <a className={`${styles.NavLink} ${selected ? styles.selected : ""}`}>
        {text}
      </a>
    </Link>
  );
};

export default Navbar;
