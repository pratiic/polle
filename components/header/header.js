import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./header.module.scss";
import layoutStyles from "../../styles/layout.module.scss";

import { getCurrentUser } from "../utils/utils.current-user";

import Logo from "../../assets/logo/logo";

import Navbar from "../navbar/navbar";
import Button from "../button/button";

const Header = ({ signedIn }) => {
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	const router = useRouter();

	useEffect(() => {
		setCurrentUser(getCurrentUser());
	}, [signedIn]);

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

	return (
		<header className={styles.header}>
			<div className={layoutStyles.headerWrapper}>
				<Logo currentUser={currentUser} />
				{currentUser ? (
					<Navbar currentUser={currentUser} />
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
