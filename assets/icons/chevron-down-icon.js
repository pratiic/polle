import styles from "./icons.module.scss";

const ChevronDownIcon = ({ size }) => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 768 768"
			className={styles.icon}
		>
			<title></title>
			<g id="icomoon-ignore"></g>
			<path
				fill="#000"
				d="M169.376 310.624l192 192c12.512 12.512 32.768 12.512 45.248 0l192-192c12.512-12.512 12.512-32.768 0-45.248s-32.768-12.512-45.248 0l-169.376 169.376-169.376-169.376c-12.512-12.512-32.768-12.512-45.248 0s-12.512 32.768 0 45.248z"
			></path>
		</svg>
	);
};

export default ChevronDownIcon;
