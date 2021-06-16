import { connect } from "react-redux";

import styles from "./notification.module.scss";

const Notification = ({ show, text, success }) => {
	return (
		<div
			className={`${styles.notification} ${show && styles.show} ${
				success && styles.success
			} ${!success && styles.failure}`}
		>
			{text}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		show: state.notification.show,
		text: state.notification.text,
		success: state.notification.success,
	};
};

export default connect(mapStateToProps)(Notification);
