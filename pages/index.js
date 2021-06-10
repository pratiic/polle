import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import styles from "../styles/main.module.scss";
import genericStyles from "../styles/generic.module.scss";

import { setCurrentUserPolls } from "../redux/polls/polls.actions";
import { getUserPolls, firestore } from "../firebase/firebase.utils";
import { arrFromDocs } from "../components/utils/utils.results";

import PollsList from "../components/polls-list/polls-list";
import CreatePoll from "../components/create-poll/create-poll";
import PageHeader from "../components/page-header/page-header";

const MainPage = ({ currentUser, currentUserPolls }) => {
	const [pollsMessage, setPollsMessage] = useState("");

	const router = useRouter();

	const dispatch = useDispatch();

	useEffect(() => {
		if (!currentUser) {
			return router.push("/signin");
		}

		fetchPolls();
	}, [currentUser]);

	const fetchPolls = async () => {
		if (currentUserPolls.length > 0) {
			return;
		}

		setPollsMessage("loading your polls...");

		const result = await getUserPolls(currentUser.userID);

		setPollsMessage("");

		if (result.polls) {
			if (result.polls.length === 0) {
				return setPollsMessage("you have no polls yet");
			}
			const polls = arrFromDocs(result.polls);

			console.log("pratiic");

			dispatch(setCurrentUserPolls(polls));
		}
	};

	return (
		<div className={`${styles.mainPage} ${genericStyles.page}`}>
			<PageHeader text="your polls">
				<CreatePoll />
			</PageHeader>
			{currentUserPolls.length > 0 ? (
				<PollsList polls={currentUserPolls} />
			) : (
				<p className={`${genericStyles.message} ${styles.message}`}>
					{pollsMessage}
				</p>
			)}
			{/* <PollsList polls={polls} /> */}
		</div>
	);
};

// export async function getStaticProps() {
// 	const polls = [
// 		{
// 			id: "poll 1",
// 			title: "which is your favorite laptop?",
// 			options: [
// 				{
// 					value: "dell",
// 					votes: 0,
// 				},
// 				{
// 					value: "hp",
// 					votes: 0,
// 				},
// 				{
// 					value: "asus",
// 					votes: 0,
// 				},
// 			],
// 			tags: ["technology", "hardware", "laptop"],
// 			type: "open",
// 			createdBy: "pratik",
// 			createdAt: "2017-05-07",
// 		},
// 		{
// 			id: "poll 2",
// 			title: "which is your favorite browser?",
// 			options: [
// 				{
// 					value: "chrome",
// 					votes: 0,
// 				},
// 				{
// 					value: "mozilla",
// 					votes: 0,
// 				},
// 				{
// 					value: "explorer",
// 					votes: 0,
// 				},
// 			],
// 			tags: ["browser"],
// 			type: "private",
// 			createdBy: "pratiic",
// 			createdAt: "2015-07-05",
// 		},
// 		{
// 			id: "poll 3",
// 			title: "which is your favorite programming langugage?",
// 			options: [
// 				{
// 					value: "javascript",
// 					votes: 0,
// 				},
// 				{
// 					value: "python",
// 					votes: 0,
// 				},
// 				{
// 					value: "c++",
// 					votes: 0,
// 				},
// 			],
// 			tags: ["technology", "programming language", "coding"],
// 			type: "open",
// 			createdBy: "prapti",
// 			createdAt: "2011-04-02",
// 		},
// 	];

// 	return {
// 		props: {
// 			polls: polls,
// 		},
// 	};
// }

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		currentUserPolls: state.polls.currentUserPolls,
	};
};

export default connect(mapStateToProps)(MainPage);
