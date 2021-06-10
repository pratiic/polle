import styles from "./page-header.module.scss";
import genericStyles from "../../styles/generic.module.scss";

const PageHeader = ({ text, children }) => {
	return (
		<header className={styles.pageHeader}>
			<h3 className={`${genericStyles.title} ${styles.title}`}>{text}</h3>
			{children}
		</header>
	);
};

export default PageHeader;
