import styles from "./button.module.scss";

const Button = ({ type, children, clickHandler, color, size, align }) => {
	return (
		<button
			type={type}
			className={`${styles.button} ${
				type === "outlined" && styles.outlined
			} ${color === "red" && styles.red} ${
				color === "blue" && styles.blue
			} ${size === "full" && styles.full} ${ align === "center" && styles.centered }`}
			onClick={clickHandler}
		>
			{children}
		</button>
	);
};

export default Button;
