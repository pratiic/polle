import genericStyles from "../../styles/generic.module.scss";

import { getVotedPolls } from "../../firebase/firebase.utils";
import { arrFromDocs } from "../../components/utils/utils.results";

import PageHeader from "../../components/page-header/page-header";
import PollsList from "../../components/polls-list/polls-list";

const VotedPage = ({ polls }) => {
	console.log(polls);

	return (
		<div className={genericStyles.page}>
			<PageHeader text="voted by you" />
			{polls.length > 0 ? (
				<PollsList polls={polls} />
			) : (
				<p className={genericStyles.message}>
					you have not voted on any polls
				</p>
			)}
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const result = await getVotedPolls(context.params.userID);

	return {
		props: {
			polls: result.polls ? arrFromDocs(result.polls) : null,
			error: result.error ? result.error : null,
		},
	};
};

export default VotedPage;
