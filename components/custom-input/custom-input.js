import styles from "./custom-input.module.scss";

const CustomInput = ({ label, type, inputRef }) => {
	return (
		<div className={styles.customInput}>
			<label htmlFor={label} className={styles.label}>
				{label}
			</label>
			<input type={type} className={styles.input} ref={inputRef} />
		</div>
	);
};

export default CustomInput;
