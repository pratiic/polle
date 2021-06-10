import { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./poll-details.module.scss";
import genericStyles from "../../../styles/generic.module.scss";

import { getAllPolls, getPoll } from "../../../firebase/firebase.utils";
import { arrFromDocs } from "../../../components/utils/utils.results";
import { chartColors } from "./chart-colors";

import PageHeader from "../../../components/page-header/page-header";
import Chart from "../../../components/chart/chart";
import PollInfo from "../../../components/poll-info/poll-info";
import Vote from "../../../components/vote/vote";

const PollDetailsPage = ({ poll }) => {
	const [chartOptions, setChartOptions] = useState({});
	const [pollEnded, setPollEnded] = useState(false);

	useEffect(() => {
		setPollEnded(getPollEnded());
	}, []);

	const getChartData = () => {
		const labels = poll.options.map((option) => {
			if (option) {
				return option.value;
			}
		});
		const datasets = [
			{
				label: "poll",
				data: poll.options.map((option) => {
					if (option) {
						return option.votes;
					}
				}),
				backgroundColor: chartColors,
			},
		];

		return { labels, datasets };
	};

	const getPollEnded = () => {
		const currentTime = new Date().getTime();

		return currentTime >= poll.duration;
	};

	return (
		<div className={genericStyles.page}>
			<PageHeader text={poll.title} />
			<PollInfo
				createdBy={poll.createdBy}
				createdAt={poll.createdAt}
				duration={poll.duration}
				pollEnded={pollEnded}
			/>
			<div className={styles.voteContainer}>
				<Chart data={getChartData()} options={chartOptions} />
				<Vote options={poll.options} />
			</div>
		</div>
	);
};

export const getStaticProps = async (context) => {
	const result = await getPoll(context.params.pollID);

	return {
		props: {
			poll: result.poll,
		},
	};
};

export const getStaticPaths = async () => {
	const result = await getAllPolls();

	const polls = arrFromDocs(result.polls);

	const paths = polls.map((poll) => {
		return { params: { pollID: poll.pollID } };
	});

	return {
		paths: paths,
		fallback: true,
	};
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(PollDetailsPage);
