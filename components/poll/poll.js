import styles from "./poll.module.scss";

import Button from "../button/button";

const Poll = ({ title, id, options, tags, type, createdBy, createdAt }) => {
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

			<h5 className={styles.subTitle}>
				poll type is {type}. Created by {createdBy} 1h ago
			</h5>

			{/* <div className={styles.controls}>
				<Button type={type === "private" && "outlined"}>
					view details
				</Button>
				<Button color="red" type={type !== "private" && "outlined"}>
					cancel poll
				</Button>
			</div> */}
			<div className={styles.gap}></div>
			<Button type={type === "private" && "outlined"} align="center">
				view details
			</Button>
		</div>
	);
};

export default Poll;
