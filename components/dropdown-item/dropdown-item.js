import styles from "./dropdown-item.module.scss";

const DropdownItem = ({ children, value, clickHandler }) => {
	const handleDropdownItemClick = () => {
		clickHandler(value);
	};

	return (
		<div className={styles.dropdownItem} onClick={handleDropdownItemClick}>
			{children}
		</div>
	);
};

export default DropdownItem;
