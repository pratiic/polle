import styles from "./button.module.scss";

const Button = ({ type, children, clickHandler, color }) => {
	return (
		<button
			type={type}
			className={`${styles.button} ${
				type === "outlined" && styles.outlined
			} ${color === "red" && styles.red} ${
				color === "blue" && styles.blue
			}`}
			onClick={clickHandler}
		>
			{children}
		</button>
	);
};

export default Button;
