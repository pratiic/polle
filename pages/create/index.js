import Head from "next/head";

import styles from "./create.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import PollCreator from "../../components/poll-creator/poll-creator";

const CreatePage = () => {
	return (
		<div className={genericStyles.page}>
			<Head>
				<title>Create poll</title>
				<meta name="description" content="Create a new poll" />
				<meta name="keywords" content="poll, create poll, polle" />
			</Head>

			<h2
				className={`${genericStyles.title} ${genericStyles.titleCenter} ${styles.title}`}
			>
				create a new poll
			</h2>
			<PollCreator />
		</div>
	);
};

export default CreatePage;
