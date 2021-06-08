import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./navbar.module.scss";

const Navbar = () => {
	const [navLinks, setNavLinks] = useState([
		{
			value: "my polls",
			linkTo: "/",
			active: false,
			path: "/",
		},
		{
			value: "search",
			linkTo: "/search",
			active: false,
			path: "/search",
		},
		{
			value: "create",
			linkTo: "/create",
			active: false,
			path: "/create",
		},
	]);

	const { pathname } = useRouter();

	console.log(pathname);

	useEffect(() => {
		setNavLinks(
			navLinks.map((navLink) => {
				if (pathname === navLink.path) {
					return { ...navLink, active: true };
				}

				return { ...navLink, active: false };
			})
		);
	}, [pathname]);

	return (
		<nav className={styles.navbar}>
			{navLinks.map((navLink) => {
				return (
					<Link href={navLink.linkTo} key={navLink.value}>
						<span
							className={`${styles.link} ${
								navLink.active && styles.active
							}`}
						>
							{navLink.value}
						</span>
					</Link>
				);
			})}
		</nav>
	);
};

export default Navbar;
