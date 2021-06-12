import Head from "next/head";

import styles from "./create.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import PollCreator from "../../components/poll-creator/poll-creator";
import PageHeader from "../../components/page-header/page-header";

const CreatePage = () => {
	return (
		<div className={genericStyles.page}>
			<Head>
				<title>Create poll</title>
				<meta name="description" content="Create a new poll" />
				<meta name="keywords" content="poll, create poll, polle" />
			</Head>

			<PageHeader text="create a new poll" extraStyles={styles.header} />
			<PollCreator />
		</div>
	);
};

export default CreatePage;
