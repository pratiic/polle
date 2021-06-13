import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "./polls.module.scss";
import genericStyles from "../../../styles/generic.module.scss";
import mainStyles from "../../../styles/main.module.scss";

import { getAllPolls } from "../../../firebase/firebase.utils";
import {
	arrFromDocs,
	validatePageNumber,
	validateResult,
} from "../../../components/utils/utils.results";

import PollsList from "../../../components/polls-list/polls-list";
import PageHeader from "../../../components/page-header/page-header";
import PollSearch from "../../../components/poll-search/poll-search";
import Button from "../../../components/button/button";
import PaginationButtons from "../../../components/pagination-buttons/pagination-buttons";

const PollsPage = ({ polls, error }) => {
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	console.log(error);

	if (error) {
		return <p className={genericStyles.message}>{error}</p>;
	}

	useEffect(() => {
		setPageNumber(Number(router.query.pageNumber));
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [router]);

	const handleNextButtonClick = () => {
		setLoading(true);
		router.push(`/polls/page/${pageNumber + 1}`);
		setPageNumber(pageNumber + 1);
	};

	const handlePreviousButtonClick = () => {
		setLoading(true);
		router.push(`/polls/page/${pageNumber - 1}`);
		setPageNumber(pageNumber - 1);
	};

	return (
		<div className={`${genericStyles.page} ${loading && styles.loading}`}>
			<Head>
				<title>New polls</title>
				<meta name="description" content="Find new polls" />
				<meta name="keywords" content="new polls, poll, polle" />
			</Head>

			<div className={styles.header}>
				<PageHeader text="new polls" extraStyles={styles.pageHeader} />
				<PollSearch />
			</div>

			{polls.length > 0 ? (
				<PollsList polls={polls} />
			) : (
				<p className={genericStyles.message}>no polls found</p>
			)}

			<PaginationButtons
				loading={loading}
				pageNumber={pageNumber}
				prevClickHandler={handlePreviousButtonClick}
				nextClickHandler={handleNextButtonClick}
				polls={polls}
			/>
		</div>
	);
};

// export const getStaticProps = async () => {
// 	const result = await getAllPolls();

// 	return {
// 		props: {
// 			polls: result.polls ? arrFromDocs(result.polls) : null,
// 			error: result.error ? result.error.message : null,
// 		},
// 		revalidate: 30,
// 	};
// };

export const getServerSideProps = async (context) => {
	const pageNumber = context.params.pageNumber;
	console.log(pageNumber);

	if (isNaN(Number(pageNumber))) {
		return {
			props: {
				error: "page not found",
			},
		};
	}

	const result = await getAllPolls(pageNumber);

	if (result.polls && result.polls.length === 0 && Number(pageNumber) > 1) {
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

export default PollsPage;
