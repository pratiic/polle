import styles from "./dropdown-menu.module.scss";

const DropdownMenu = ({ children, show, extraStyles }) => {
	return (
		<div
			className={`${styles.dropdownMenu} ${extraStyles} ${
				show && styles.show
			}`}
		>
			{children}
		</div>
	);
};

export default DropdownMenu;
