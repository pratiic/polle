import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import styles from "../styles/main.module.scss";
import genericStyles from "../styles/generic.module.scss";

import PollsList from "../components/polls-list/polls-list";

const MainPage = ({ polls, currentUser }) => {
	const router = useRouter();

	useEffect(() => {
		if (!currentUser) {
			router.push("/signin");
		}
	}, []);

	return (
		<div className={`${styles.mainPage} ${genericStyles.page}`}>
			<h2 className={`${genericStyles.title} ${styles.title}`}>
				your polls
			</h2>
			<PollsList polls={polls} />
		</div>
	);
};

export async function getStaticProps() {
	const polls = [
		{
			id: "poll 1",
			title: "which is your favorite laptop?",
			options: [
				{
					value: "dell",
					votes: 0,
				},
				{
					value: "hp",
					votes: 0,
				},
				{
					value: "asus",
					votes: 0,
				},
			],
			tags: ["technology", "hardware", "laptop"],
			type: "open",
			createdBy: "pratik",
			createdAt: "2017-05-07",
		},
		{
			id: "poll 2",
			title: "which is your favorite browser?",
			options: [
				{
					value: "chrome",
					votes: 0,
				},
				{
					value: "mozilla",
					votes: 0,
				},
				{
					value: "explorer",
					votes: 0,
				},
			],
			tags: ["browser"],
			type: "private",
			createdBy: "pratiic",
			createdAt: "2015-07-05",
		},
		{
			id: "poll 3",
			title: "which is your favorite programming langugage?",
			options: [
				{
					value: "javascript",
					votes: 0,
				},
				{
					value: "python",
					votes: 0,
				},
				{
					value: "c++",
					votes: 0,
				},
			],
			tags: ["technology", "programming language", "coding"],
			type: "open",
			createdBy: "prapti",
			createdAt: "2011-04-02",
		},
	];

	return {
		props: {
			polls: polls,
		},
	};
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(MainPage);
