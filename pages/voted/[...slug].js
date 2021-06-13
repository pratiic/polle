import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import genericStyles from "../../styles/generic.module.scss";

import { getVotedPolls, getAllPolls } from "../../firebase/firebase.utils";
import {
	arrFromDocs,
	validatePageNumber,
} from "../../components/utils/utils.results";
import { getCurrentUser } from "../../components/utils/utils.current-user";

import PageHeader from "../../components/page-header/page-header";
import PollsList from "../../components/polls-list/polls-list";
import PaginationButtons from "../../components/pagination-buttons/pagination-buttons";
import React from "react";

const VotedPage = ({ polls, error }) => {
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	const router = useRouter();

	if (error) {
		return <p className={genericStyles.message}>{error}</p>;
	}

	const handlePreviousButtonClick = () => {
		setLoading(true);
		router.push(`/voted/${currentUser.userID}/${pageNumber - 1}`);
		setPageNumber(pageNumber - 1);
	};

	const handleNextButtonClick = () => {
		setLoading(true);
		router.push(`/voted/${currentUser.userID}/${pageNumber + 1}`);
		setPageNumber(pageNumber + 1);
	};

	useEffect(() => {
		setPageNumber(Number(router.query.slug[1]));
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [router]);

	return (
		<div className={genericStyles.page}>
			<PageHeader text="voted by you" />
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
				<p className={genericStyles.message}>
					you have not voted on any polls
				</p>
			)}
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

	const result = await getVotedPolls(
		context.params.slug[1],
		7,
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

export default VotedPage;
