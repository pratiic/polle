import { useState, useEffect } from "react";

import styles from "./poll-info.module.scss";

import { getDate, getTime, getRemainingTime } from "../utils/utils.date-time";

const PollInfo = ({ createdBy, createdAt, duration, pollEnded }) => {
	const [remainingTime, setRemainingTime] = useState("");

	useEffect(() => {
		setInterval(() => {
			setRemainingTime(getRemainingTime(duration));
		}, 1000);
	}, []);

	const getDateAndTime = (milliseconds) => {
		return `${getDate(milliseconds)}, ${getTime(milliseconds)}`;
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
		</div>
	);
};

export default PollInfo;
