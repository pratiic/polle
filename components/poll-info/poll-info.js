import { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./poll-info.module.scss";

import { getDate, getTime, getRemainingTime } from "../utils/utils.date-time";

const PollInfo = ({
	createdBy,
	createdAt,
	duration,
	pollEnded,
	winners,
	totalVotes,
	votedOption,
	options,
}) => {
	const [remainingTime, setRemainingTime] = useState("");

	useEffect(() => {
		const getTimeInterval = setInterval(() => {
			setRemainingTime(getRemainingTime(duration));
		}, 1000);

		return () => {
			clearInterval(getTimeInterval);
		};
	}, []);

	const getDateAndTime = (milliseconds) => {
		return `${getDate(milliseconds)}, ${getTime(milliseconds)}`;
	};

	const renderWinnerMessage = () => {
		if (winners.length === 1) {
			return `${winners[0].value} (${winners[0].votes}/${totalVotes}) votes`;
		}

		return `tied between ${getWinnerValues()}`;
	};

	const getWinnerValues = () => {
		let values = "";
		winners.forEach((winner, index) => {
			values += `${winner.value} (${winner.votes}/${totalVotes}) votes${
				index === winners.length - 1 ? "" : ","
			} `;
		});
		return values;
	};

	return (
		<div className={styles.pollInfo}>
			<p className={styles.title}>
				created by{" "}
				<span className={styles.colored}>{createdBy.username}</span> on{" "}
				<span className={styles.colored}>
					{getDateAndTime(createdAt)}
				</span>
			</p>
			<p className={styles.title}>
				status{" "}
				<span className={styles.colored}>
					{!pollEnded ? "ongoing" : "ended"}
				</span>
			</p>
			<p className={styles.title}>
				{pollEnded ? "ended" : "ends"} on{" "}
				<span className={styles.colored}>
					{getDateAndTime(duration)}
				</span>
			</p>
			{!pollEnded && (
				<p className={styles.title}>
					{" "}
					ends in{" "}
					<span className={styles.colored}>{remainingTime}</span>{" "}
				</p>
			)}
			{pollEnded && (
				<p className={styles.title}>
					{" "}
					{winners.length === 1 ? "winner" : "winners"}{" "}
					<span className={styles.capitalized}>
						{renderWinnerMessage()}
					</span>
				</p>
			)}
			<p className={styles.title}>
				total votes <span className={styles.colored}>{totalVotes}</span>
			</p>
			{votedOption && (
				<p className={styles.title}>
					voted on{" "}
					<span className={styles.capitalized}>
						{votedOption} (
						{
							options.find(
								(option) => option.value === votedOption
							).votes
						}
						/{totalVotes}) votes
					</span>
				</p>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		votedOption: state.polls.votedOption,
	};
};

export default connect(mapStateToProps)(PollInfo);
