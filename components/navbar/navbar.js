import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";

import { signUserOut } from "../../redux/current-user/current-user.actions";
import { showNotification } from "../../redux/notification/notification.actions";

import { auth } from "../../firebase/firebase.utils";
import { getCurrentUser, removeCurrentUser } from "../utils/utils.current-user";

import styles from "./navbar.module.scss";
import headerStyles from "../header/header.module.scss";

import MenuIcon from "../../assets/icons/menu-icon";

import Button from "../button/button";
import ProfilePreview from "../profile-preview/profile-preview";
import Profile from "../profile/profile";

const Navbar = ({ currentUser, show, toggleNavbar }) => {
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
			path: "/polls/page/[pageNumber]",
		},
		// {
		// 	value: "search",
		// 	linkTo: "/search",
		// 	active: false,
		// 	path: "/search",
		// },
	]);

	const router = useRouter();

	const dispatch = useDispatch();

	useEffect(() => {
		setNavLinks(
			navLinks.map((navLink) => {
				if (router.pathname === navLink.path) {
					return { ...navLink, active: true };
				}

				return { ...navLink, active: false };
			})
		);
	}, [router]);

	const handleSignOutClick = () => {
		auth.signOut();
		removeCurrentUser();
		router.push("/signin");
		dispatch(signUserOut());
		dispatch(showNotification("you are signed out", true));
	};

	return (
		<nav className={`${styles.navbar} ${show && styles.show}`}>
			<Profile
				username={currentUser.username}
				email={currentUser.email}
				extraStyles={styles.profile}
			>
				<MenuIcon
					extraStyles={`${styles.navMenu} ${headerStyles.menu}`}
					clickHandler={toggleNavbar}
				/>
			</Profile>
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

			<span className={`${styles.link} ${styles.signOutButton}`}>
				sign out
			</span>
			<ProfilePreview
				username={currentUser.username}
				clickHandler={handleSignOutClick}
			/>
		</nav>
	);
};

export default Navbar;
