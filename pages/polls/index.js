import Head from "next/head";

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
