import styles from "./polls.module.scss";
import genericStyles from "../../styles/generic.module.scss";
import mainStyles from "../../styles/main.module.scss";

import { getAllPolls } from "../../firebase/firebase.utils";
import { arrFromDocs } from "../../components/utils/utils.results";

import PollsList from "../../components/polls-list/polls-list";
import PageHeader from "../../components/page-header/page-header";
import PollSearch from "../../components/poll-search/poll-search";

const PollsPage = ({ polls }) => {
	return (
		<div className={genericStyles.page}>
			<div className={styles.header}>
				<PageHeader text="new polls" extraStyles={styles.pageHeader} />
				<PollSearch />
			</div>
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
		revalidate: 30,
	};
};

export default PollsPage;
