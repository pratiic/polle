import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";

import { getCurrentUser } from "../utils/utils.current-user";

import styles from "./navbar.module.scss";

import Button from "../button/button";
import ProfilePreview from "../profile-preview/profile-preview";

const Navbar = ({ currentUser }) => {
	const [localStorage, setLocalStorage] = useState(
		typeof window !== "undefined" ? window.localStorage : null
	);

	const [navLinks, setNavLinks] = useState([
		{
			value: "my polls",
			linkTo: `/${currentUser.userID}`,
			active: false,
			path: `/${currentUser.userID}`,
		},
		{
			value: "create",
			linkTo: "/create",
			active: false,
			path: "/create",
		},
		{
			value: "polls",
			linkTo: "/polls",
			active: false,
			path: "/polls",
		},
		// {
		// 	value: "search",
		// 	linkTo: "/search",
		// 	active: false,
		// 	path: "/search",
		// },
	]);

	const { pathname, query } = useRouter();

	useEffect(() => {
		setNavLinks(
			navLinks.map((navLink) => {
				if (
					pathname === navLink.path ||
					`/${query.userID}` === navLink.path
				) {
					return { ...navLink, active: true };
				}

				return { ...navLink, active: false };
			})
		);
	}, [pathname]);

	const handleSignOutButtonClick = () => {
		auth.signOut();
	};

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

			<ProfilePreview username={currentUser.username} />
		</nav>
	);
};

export default Navbar;
