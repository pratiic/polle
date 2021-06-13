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
			linkTo: `/${currentUser.userID}/1`,
			active: false,
			path: "/[...slug]",
		},
		{
			value: "voted",
			linkTo: `/voted/${currentUser.userID}/1`,
			active: false,
			path: "/voted/[...slug]",
		},
		{
			value: "create",
			linkTo: "/create",
			active: false,
			path: "/create",
		},
		{
			value: "polls",
			linkTo: "/polls/page/1",
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
		console.log(pathname);

		setNavLinks(
			navLinks.map((navLink) => {
				if (pathname === navLink.path) {
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
