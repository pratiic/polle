import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./header.module.scss";
import layoutStyles from "../../styles/layout.module.scss";

import { getCurrentUser } from "../utils/utils.current-user";

import Logo from "../../assets/logo/logo";
import MenuIcon from "../../assets/icons/menu-icon";

import Navbar from "../navbar/navbar";
import Button from "../button/button";
import React from "react";

const Header = ({ signedIn }) => {
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
	const [showNavbar, setShowNavbar] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setCurrentUser(getCurrentUser());
	}, [signedIn]);

	useEffect(() => {
		if (showNavbar) {
			toggleNavbar();
		}
	}, [router]);

	const renderButton = () => {
		return router.pathname.includes("/signin") ? (
			<Button
				clickHandler={() => {
					router.push("/signup");
				}}
			>
				sign up
			</Button>
		) : (
			<Button
				clickHandler={() => {
					router.push("/signin");
				}}
			>
				sign in
			</Button>
		);
	};

	const toggleNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	return (
		<header className={styles.header}>
			<div className={layoutStyles.headerWrapper}>
				<Logo currentUser={currentUser} />
				{currentUser ? (
					<React.Fragment>
						<MenuIcon
							extraStyles={styles.menu}
							clickHandler={toggleNavbar}
						/>
						<Navbar
							currentUser={currentUser}
							show={showNavbar}
							toggleNavbar={toggleNavbar}
						/>
					</React.Fragment>
				) : (
					renderButton()
				)}
			</div>
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		signedIn: state.currentUser.signedIn,
	};
};

export default connect(mapStateToProps)(Header);
