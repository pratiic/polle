import React, { useState } from "react";
import Link from "next/link";

import styles from "./navbar.module.scss";

const Navbar = () => {
	const [navLinks, setNavLinks] = useState([
		{
			value: "my polls",
			linkTo: "/",
		},
		{
			value: "search",
			linkTo: "/search",
		},
	]);

	return (
		<nav className={styles.navbar}>
			{navLinks.map((navLink) => {
				return (
					<Link href={navLink.linkTo} key={navLink.value}>
						<span className={styles.link}>{navLink.value}</span>
					</Link>
				);
			})}
		</nav>
	);
};

export default Navbar;
