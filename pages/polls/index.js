import genericStyles from "../../styles/generic.module.scss";
import mainStyles from "../../styles/main.module.scss";

import { getAllPolls } from "../../firebase/firebase.utils";
import { arrFromDocs } from "../../components/utils/utils.results";

import PollsList from "../../components/polls-list/polls-list";
import PageHeader from "../../components/page-header/page-header";

const PollsPage = ({ polls }) => {
	return (
		<div className={genericStyles.page}>
			<PageHeader text="new polls" />
			<PollsList polls={polls} />
		</div>
	);
};

export const getStaticProps = async () => {
	const result = await getAllPolls();

	return {
		props: {
			polls: result.polls ? arrFromDocs(result.polls) : null,
			error: result.error ? result.error.message : null,
		},
	};
};

export default PollsPage;
