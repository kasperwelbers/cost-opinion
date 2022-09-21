import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./Logo";

import styled from "styled-components";
import styles from "styles/Nav.module.css";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "WGs", href: "/workgroups" },
];

const Navbar = () => {
  return (
    <header>
      <nav className={styles.Nav}>
        <div className={styles.NavContainer}>
          {MENU_LIST.map((menu, idx) => (
            <NavItem key={menu.text} {...menu} />
          ))}
        </div>
      </nav>
    </header>
  );
};

const NavItem = ({ text, href }) => {
  return (
    <Link href={href}>
      <a className={styles.NavLink}>{text}</a>
    </Link>
  );
};

export default Navbar;
