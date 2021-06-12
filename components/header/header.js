import { connect } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./header.module.scss";
import layoutStyles from "../../styles/layout.module.scss";

import Logo from "../../assets/logo/logo";

import Navbar from "../navbar/navbar";
import Button from "../button/button";

const Header = ({ currentUser }) => {
	const router = useRouter();

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
				<Logo currentUser={currentUser ? currentUser.userID : null} />
				{currentUser ? <Navbar /> : renderButton()}
			</div>
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(Header);
