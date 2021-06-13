import styles from "./pagination-buttons.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import Button from "../button/button";

const PaginationButtons = ({
	loading,
	pageNumber,
	prevClickHandler,
	nextClickHandler,
	polls,
}) => {
	return loading ? (
		<p className={`${genericStyles.message} ${styles.message}`}>
			loading page...
		</p>
	) : (
		<div className={styles.buttons}>
			{pageNumber > 1 && (
				<Button clickHandler={prevClickHandler} color="green">
					prev
				</Button>
			)}
			<div className={styles.gap}></div>
			{polls.length >= 7 ? (
				<Button clickHandler={nextClickHandler} color="green">
					next
				</Button>
			) : null}
		</div>
	);
};

export default PaginationButtons;
