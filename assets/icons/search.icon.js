import styles from "./icons.module.scss";

const SearchIcon = ({ size, extraStyles }) => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 640 640"
			className={`${styles.icon} ${
				size === "smaller" && styles.smaller
			} ${extraStyles && extraStyles}`}
		>
			<title></title>
			<g id="icomoon-ignore"></g>
			<path
				fill="#000"
				d="M412.8 458.24c-42.889 33.57-97.603 53.832-157.048 53.832-141.385 0-256-114.615-256-256s114.615-256 256-256c141.385 0 256 114.615 256 256 0 59.446-20.262 114.159-54.256 157.611l0.424-0.562 171.2 170.56-45.44 45.44-170.56-170.88zM256 448c106.039 0 192-85.961 192-192s-85.961-192-192-192v0c-106.039 0-192 85.961-192 192s85.961 192 192 192v0z"
			></path>
		</svg>
	);
};

export default SearchIcon;
