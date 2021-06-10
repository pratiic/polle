import styles from "./vote-option.module.scss";

const VoteOption = ({ value }) => {
	return (
		<div className={styles.option}>
			<span className={styles.value}>{value}</span>
			<button className={styles.button}>select</button>
		</div>
	);
};

export default VoteOption;
