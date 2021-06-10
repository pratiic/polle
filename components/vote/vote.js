import { useState } from "react";

import styles from "./vote.module.scss";

import VoteOption from "../vote-option/vote-option";

const Vote = ({ options }) => {
	const [selectedOption, setSelectedOption] = useState(null);

	return (
		<div className={styles.vote}>
			<h3 className={styles.title}>vote</h3>

			{options.map((option) => {
				if (option) {
					return <VoteOption {...option} />;
				}
			})}
		</div>
	);
};

export default Vote;
