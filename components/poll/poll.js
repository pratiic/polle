import styles from "./poll.module.scss";

import Button from "../button/button";

const Poll = ({ title, id, options, tags, type }) => {
	return (
		<div
			className={`${styles.poll} ${type === "private" && styles.private}`}
		>
			<h4 className={styles.title}>{title}</h4>

			<h5 className={styles.subTitle}>options</h5>
			<ul className={styles.itemsList}>
				{options.map((option) => {
					return (
						<li className={styles.option} key={option.value}>
							{option.value}
						</li>
					);
				})}
			</ul>

			<h5 className={styles.subTitle}>tags</h5>
			<ul className={styles.itemsList}>
				{tags.map((tag) => {
					return (
						<li className={styles.tag} key={tag}>
							{tag}
						</li>
					);
				})}
			</ul>

			<h5 className={styles.subTitle}>poll type is {type}</h5>

			<div className={styles.controls}>
				<Button type="outlined">view details</Button>
				<Button color="red">cancel poll</Button>
			</div>
		</div>
	);
};

export default Poll;
