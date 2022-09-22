import Link from "next/link";
import React, { useState } from "react";
import { BiNetworkChart } from "react-icons/bi";

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
          <BiNetworkChart style={{ fontSize: "2rem" }} />

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

export default Navbar;
