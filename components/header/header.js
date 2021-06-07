import styles from "./header.module.scss";

import Logo from "../../assets/logo/logo";

import Navbar from "../navbar/navbar";

const Header = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<Navbar />
		</header>
	);
};

export default Header;
