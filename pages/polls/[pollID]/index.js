import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import styles from "./poll-details.module.scss";
import genericStyles from "../../../styles/generic.module.scss";

import {
	getAllPolls,
	getPoll,
	firestore,
} from "../../../firebase/firebase.utils";
import { arrFromDocs } from "../../../components/utils/utils.results";
import { chartColors } from "../../../components/utils/utils.chart";

import PageHeader from "../../../components/page-header/page-header";
import Chart from "../../../components/chart/chart";
import PollInfo from "../../../components/poll-info/poll-info";
import Vote from "../../../components/vote/vote";
import ChartTypeSelector from "../../../components/chart-type-selector/chart-type-selector";

const PollDetailsPage = ({ poll, error }) => {
	console.log(error);

	if (error) {
		return <p>does not exist</p>;
	}

	const router = useRouter();

	const [chartOptions, setChartOptions] = useState({});
	const [pollEnded, setPollEnded] = useState(false);
	const [pollOptions, setPollOptions] = useState(poll.options);
	const [winners, setWinners] = useState([]);
	const [totalVotes, setTotalVotes] = useState(0);

	useEffect(() => {
		firestore
			.collection("polls")
			.doc(poll.pollID)
			.collection("options")
			.onSnapshot((snapshot) => {
				setPollOptions(arrFromDocs(snapshot.docs));
			});
	}, []);

	useEffect(() => {
		const pollInterval = setInterval(() => {
			const currentTime = new Date().getTime();

			if (currentTime >= poll.duration) {
				setPollEnded(true);
			}
		}, 1000);

		return () => {
			clearInterval(pollInterval);
		};
	}, []);

	useEffect(() => {
		if (pollEnded) {
			const votes = pollOptions.map((pollOption) => {
				return pollOption.votes;
			});
			const highestVote = findHighestVote(votes);

			const tiedOptions = getTiedOptions(highestVote);

			setWinners(tiedOptions);
		}
	}, [pollEnded]);

	useEffect(() => {
		if (winners.length > 0) {
			winners.forEach((winner) => {
				setPollOptions(
					pollOptions.map((pollOption) => {
						if (winner.value === pollOption.value) {
							return { ...pollOption, winner: true };
						}
						return { ...pollOption, winner: false };
					})
				);
			});
		}
	}, [winners]);

	useEffect(() => {
		let totalVotesNumber = 0;
		pollOptions.forEach((pollOption) => {
			totalVotesNumber += pollOption.votes;
		});
		setTotalVotes(totalVotesNumber);
	}, [pollOptions, pollEnded]);

	const getChartData = () => {
		const labels = pollOptions.map((option) => {
			if (option) {
				return option.value;
			}
		});
		const datasets = [
			{
				label: "poll",
				data: pollOptions.map((option) => {
					if (option) {
						return option.votes;
					}
				}),
				backgroundColor: chartColors,
				pointBorderWidth: 3,
				pointBorderColor: "rgb(50, 50, 44)",
			},
		];

		return { labels, datasets };
	};

	const findHighestVote = (votes) => {
		let highest = -1;
		votes.forEach((vote) => {
			if (vote > highest) {
				highest = vote;
			}
		});
		return highest;
	};

	const getTiedOptions = (highestVote) => {
		let tiedOptions = [];
		pollOptions.forEach((pollOption) => {
			if (pollOption.votes === highestVote) {
				tiedOptions = [...tiedOptions, pollOption];
			}
		});
		return tiedOptions;
	};

	return (
		<div className={genericStyles.page}>
			<PageHeader text={poll.title} />
			<PollInfo
				createdBy={poll.createdBy}
				createdAt={poll.createdAt}
				duration={poll.duration}
				pollEnded={pollEnded}
				winners={winners}
				totalVotes={totalVotes}
				options={pollOptions}
			/>
			<ChartTypeSelector />
			<div className={styles.voteContainer}>
				<Chart data={getChartData()} options={chartOptions} />
				<Vote
					options={pollOptions}
					pollID={poll.pollID}
					pollEnded={pollEnded}
					winners={winners}
					totalVotes={totalVotes}
					type={poll.type}
					password={poll.password}
				/>
			</div>
		</div>
	);
};

// export const getStaticProps = async (context) => {
// 	const result = await getPoll(context.params.pollID);

// 	return {
// 		props: {
// 			poll: result.poll ? result.poll : null,
// 			error: result.error ? result.error : null,
// 		},
// 	};
// };

// export const getStaticPaths = async () => {
// 	const result = await getAllPolls();

// 	const polls = arrFromDocs(result.polls);

// 	const paths = polls.map((poll) => {
// 		return { params: { pollID: poll.pollID } };
// 	});

// 	return {
// 		paths: paths,
// 		fallback: true,
// 	};
// };

export const getServerSideProps = async (context) => {
	const result = await getPoll(context.params.pollID);

	return {
		props: {
			poll: result.poll ? result.poll : null,
			error: result.error ? result.error : null,
		},
	};
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(PollDetailsPage);
