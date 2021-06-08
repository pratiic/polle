import styles from "./custom-input.module.scss";

const CustomInput = ({ label, type, error, inputRef }) => {
	return (
		<div className={styles.customInput}>
			<label htmlFor={label} className={styles.label}>
				{label}
			</label>
			<input
				type={type}
				className={`${styles.input} ${error && styles.errorInput}`}
				ref={inputRef}
			/>
			<span className={styles.error}>{error}</span>
		</div>
	);
};

export default CustomInput;
