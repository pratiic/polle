import styles from "./icons.module.scss";

const MenuIcon = ({ extraStyles, clickHandler }) => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 768 768"
			className={`${styles.icon} ${styles.bigger} ${
				extraStyles && extraStyles
			}`}
			onClick={clickHandler}
		>
			<title></title>
			<g id="icomoon-ignore"></g>
			<path
				fill="#000"
				d="M96 416h576c17.664 0 32-14.336 32-32s-14.336-32-32-32h-576c-17.664 0-32 14.336-32 32s14.336 32 32 32zM96 224h576c17.664 0 32-14.336 32-32s-14.336-32-32-32h-576c-17.664 0-32 14.336-32 32s14.336 32 32 32zM96 608h576c17.664 0 32-14.336 32-32s-14.336-32-32-32h-576c-17.664 0-32 14.336-32 32s14.336 32 32 32z"
			></path>
		</svg>
	);
};

export default MenuIcon;
