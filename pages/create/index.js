import styles from "./create.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import PollCreator from "../../components/poll-creator/poll-creator";

const CreatePage = () => {
	return (
		<div className={genericStyles.page}>
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
