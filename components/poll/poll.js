import { useRouter } from "next/router";

import styles from "./poll.module.scss";

import Button from "../button/button";
import React from "react";

const Poll = ({
	title,
	pollID,
	options,
	tags,
	type,
	createdBy,
	createdByID,
	createdAt,
}) => {
	const router = useRouter();

	const renderOptions = () => {
		return (
			<React.Fragment>
				<h5 className={styles.subTitle}>options</h5>
				<ul className={styles.itemsList}>
					{options.map((option) => {
						if (option) {
							return (
								<li
									className={styles.option}
									key={option.value}
								>
									{option.value}
								</li>
							);
						}
					})}
				</ul>
			</React.Fragment>
		);
	};

	const renderTags = () => {
		const tagsArr = arrayFromString();

		return tagsArr ? (
			<React.Fragment>
				<h5 className={styles.subTitle}>tags</h5>
				<ul className={styles.itemsList}>
					{tagsArr.map((tag) => {
						return (
							<li className={styles.tag} key={tag}>
								{tag}
							</li>
						);
					})}
				</ul>
			</React.Fragment>
		) : null;
	};

	const arrayFromString = () => {
		if (tags.length > 0) {
			return tags.split(",");
		} else {
			return null;
		}
	};

	const getHowLongAgo = (milliseconds) => {
		const createdTimeMilliseconds = milliseconds;
		const millisecondsNow = Date.now();

		const difference = millisecondsNow - createdTimeMilliseconds;
		const differenceInSeconds = Math.round(difference / 1000);

		if (differenceInSeconds < 60) {
			return "few secs";
		} else if (differenceInSeconds < 3600) {
			return `${Math.round(differenceInSeconds / 60)} min`;
		} else if (differenceInSeconds < 86400) {
			return `${Math.round(differenceInSeconds / 3600)} hr`;
		} else {
			return `${Math.round(differenceInSeconds / 86400)}d`;
		}
	};

	const handlePollClick = () => {
		console.log("pratiic");
		router.push(`/polls/${pollID}`);
	};

	return (
		<div
			className={`${styles.poll} ${type === "private" && styles.private}`}
			onClick={handlePollClick}
		>
			<h4 className={styles.title}>{title}</h4>

			{renderOptions()}

			{renderTags()}

			<h5 className={`${styles.subTitle} ${styles.smallSubtitle}`}>
				poll type is {type}. Created by {createdBy.username}{" "}
				{getHowLongAgo(createdAt)} ago
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
			<Button
				align="center"
				font="smaller"
				color={type !== "private" ? "red" : "blue"}
			>
				view details
			</Button>
		</div>
	);
};

export default Poll;
