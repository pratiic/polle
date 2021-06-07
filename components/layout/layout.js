import styles from "../../styles/layout.module.scss";

import Header from "../header/header";

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<div className={styles.wrapper}>{children}</div>
		</div>
	);
};

export default Layout;
