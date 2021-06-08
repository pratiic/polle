import styles from "./dropdown-item.module.scss";

const DropdownItem = ({ children, clickHandler }) => {
	return (
		<div className={styles.dropdownItem} onClick={clickHandler}>
			{children}
		</div>
	);
};

export default DropdownItem;
