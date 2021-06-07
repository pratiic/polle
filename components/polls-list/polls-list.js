import styles from "./polls-list.module.scss";

import Poll from "../poll/poll";

const PollsList = ({ polls }) => {
	return (
		<div className={styles.pollsList}>
			{polls.map((poll) => {
				return <Poll {...poll} key={poll.id} />;
			})}
		</div>
	);
};

export default PollsList;
