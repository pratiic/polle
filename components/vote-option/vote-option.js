import { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./vote-option.module.scss";

const VoteOption = ({
	value,
	selected,
	votes,
	clickHandler,
	optionID,
	votedOption,
	voted,
	pollEnded,
	winners,
	totalVotes,
}) => {
	const [winner, setWinner] = useState(false);

	useEffect(() => {
		if (winners.length > 0) {
			setWinner(winners.some((winner) => winner.value === value));
		}
	}, [winners]);

	const handleVoteOptionClick = () => {
		if (!voted && !pollEnded) {
			clickHandler(value);
		}
	};

	const renderButtonValue = () => {
		if (winner) {
			return "winner";
		}

		if (voted && votedOption === value) {
			return "voted";
		}

		if (voted && votedOption !== value) {
			return `${votes}/${totalVotes}`;
		}

		if (selected) {
			return "selected";
		}

		return "select";
	};

	return (
		<div
			className={`${styles.option} ${
				(voted || pollEnded) && styles.disabledOption
			}`}
			onClick={handleVoteOptionClick}
		>
			<span className={styles.value}>{value}</span>
			<button
				className={`${styles.button} ${selected && styles.selected} ${
					winner && styles.winner
				}`}
			>
				{renderButtonValue()}
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		votedOption: state.polls.votedOption,
	};
};

export default connect(mapStateToProps)(VoteOption);
