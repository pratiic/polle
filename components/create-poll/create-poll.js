import { useRouter } from "next/router";

import styles from "./create-poll.module.scss";

import ArrowRightIcon from "../../assets/icons/arrow-right-icon";

const CreatePoll = () => {
	const router = useRouter();

	return (
		<div
			className={styles.createPoll}
			onClick={() => {
				router.push("/create");
			}}
		>
			<p className={styles.text}>create new poll</p>
			<ArrowRightIcon size="smaller" extraStyles={styles.icon} />
		</div>
	);
};

export default CreatePoll;
