import styles from "../styles/main.module.scss";
import genericStyles from "../styles/generic.module.scss";

import PollsList from "../components/polls-list/polls-list";

const MainPage = ({ polls }) => {
	console.log(polls);

	return (
		<div className={styles.mainPage}>
			<h2 className={genericStyles.title}>your polls</h2>
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
		},
	];

	return {
		props: {
			polls: polls,
		},
	};
}

export default MainPage;
