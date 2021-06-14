import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import styles from "../styles/main.module.scss";
import genericStyles from "../styles/generic.module.scss";

import { setCurrentUserPolls } from "../redux/polls/polls.actions";
import { showNotification } from "../redux/notification/notification.actions";

import {
	getUserPolls,
	firestore,
	getAllPolls,
} from "../firebase/firebase.utils";
import {
	arrFromDocs,
	validatePageNumber,
} from "../components/utils/utils.results";
import { getCurrentUser } from "../components/utils/utils.current-user";

import PollsList from "../components/polls-list/polls-list";
import CreatePoll from "../components/create-poll/create-poll";
import PageHeader from "../components/page-header/page-header";
import PaginationButtons from "../components/pagination-buttons/pagination-buttons";
import React from "react";

const UserPollsPage = ({ polls, error }) => {
	const [pollsMessage, setPollsMessage] = useState("");
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const dispatch = useDispatch();

	// if (!currentUser) {
	// 	dispatch(showNotification("you need to sign in", true));
	// }

	if (error) {
		return <p className={genericStyles.message}>{error}</p>;
	}

	useEffect(() => {
		if (!currentUser) {
			return router.push("/signin");
		}

		// fetchPolls();
	}, [currentUser]);

	// const fetchPolls = async () => {
	// 	if (currentUserPolls.length > 0) {
	// 		return;
	// 	}

	// 	setPollsMessage("loading your polls...");

	// 	const result = await getUserPolls(currentUser.userID);

	// 	setPollsMessage("");

	// 	if (result.polls) {
	// 		if (result.polls.length === 0) {
	// 			return setPollsMessage("you have no polls yet");
	// 		}
	// 		const polls = arrFromDocs(result.polls);

	// 		console.log("pratiic");

	// 		dispatch(setCurrentUserPolls(polls));
	// 	}
	// };

	useEffect(() => {
		setLoading(false);
	}, [router]);

	useEffect(() => {
		setPageNumber(Number(router.query.slug[1]));
	}, []);

	const handlePreviousButtonClick = () => {
		setLoading(true);
		router.push(`/${currentUser.userID}/${pageNumber - 1}`);
		setPageNumber(pageNumber - 1);
	};

	const handleNextButtonClick = () => {
		setLoading(true);
		router.push(`/${currentUser.userID}/${pageNumber + 1}`);
		setPageNumber(pageNumber + 1);
	};

	return (
		<div className={`${styles.mainPage} ${genericStyles.page}`}>
			<Head>
				<title>My polls</title>
				<meta
					name="description"
					content="Shows polls created the user that is logged in to the system"
				/>
				<meta name="keywords" content="polls" />
			</Head>

			<PageHeader text="your polls" extraStyles={styles.header}>
				<CreatePoll />
			</PageHeader>
			{polls.length > 0 ? (
				<React.Fragment>
					<PollsList polls={polls} />
					<PaginationButtons
						pageNumber={pageNumber}
						loading={loading}
						prevClickHandler={handlePreviousButtonClick}
						nextClickHandler={handleNextButtonClick}
						polls={polls}
					/>
				</React.Fragment>
			) : (
				<p className={`${genericStyles.message} ${styles.message}`}>
					you have no polls
				</p>
			)}
			{/* <PollsList polls={polls} /> */}
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const pageNumber = Number(context.params.slug[1]);

	if (isNaN(Number(pageNumber)) || context.params.slug.length > 2) {
		return {
			props: {
				error: "page not found",
			},
		};
	}

	const result = await getAllPolls(
		context.params.slug[1],
		7,
		"createdByID",
		context.params.slug[0]
	);

	if (result.polls && result.polls.length === 0 && pageNumber > 1) {
		return {
			props: {
				error: "page not found",
			},
		};
	}

	return {
		props: {
			polls: result.polls ? arrFromDocs(result.polls) : null,
			error: result.error ? result.error : null,
		},
	};
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

export default connect(mapStateToProps)(UserPollsPage);
