import styles from "./header.module.scss";
import layoutStyles from "../../styles/layout.module.scss";

import Logo from "../../assets/logo/logo";

import Navbar from "../navbar/navbar";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={layoutStyles.headerWrapper}>
				<Logo />
				<Navbar />
			</div>
		</header>
	);
};

export default Header;
