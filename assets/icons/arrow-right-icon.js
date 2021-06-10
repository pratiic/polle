import styles from "./icons.module.scss";

const ArrowRightIcon = ({ size, extraStyles }) => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 768 768"
			className={`${styles.icon} ${
				size === "smaller" && styles.smaller
			} ${extraStyles}`}
		>
			<title></title>
			<g id="icomoon-ignore"></g>
			<path
				fill="#000"
				d="M361.376 182.624l169.376 169.376h-370.752c-17.664 0-32 14.336-32 32s14.336 32 32 32h370.752l-169.376 169.376c-12.512 12.512-12.512 32.768 0 45.248s32.768 12.512 45.248 0l224-224c2.944-2.944 5.312-6.464 6.944-10.368 3.232-7.84 3.232-16.672 0-24.512-1.568-3.776-3.872-7.296-6.944-10.368l-224-224c-12.512-12.512-32.768-12.512-45.248 0s-12.512 32.768 0 45.248z"
			></path>
		</svg>
	);
};

export default ArrowRightIcon;
