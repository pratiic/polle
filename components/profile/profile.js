import styles from "./profile.module.scss";

const Profile = ({ username, email, children, extraStyles }) => {
	return (
		<div className={`${styles.profile} ${extraStyles && extraStyles}`}>
			<p className={styles.username}>{username}</p>
			<p className={styles.email}>{email}</p>
			{children}
		</div>
	);
};

export default Profile;
