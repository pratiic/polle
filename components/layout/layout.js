import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useRouter } from "next/router";

import styles from "../../styles/layout.module.scss";

import { setCurrentUser } from "../../redux/current-user/current-user.actions";
import { showNotification } from "../../redux/notification/notification.actions";

import { auth, getCurrentUser } from "../../firebase/firebase.utils";

import Header from "../header/header";
import Notification from "../notification/notification";

const Layout = ({ children, currentUser }) => {
	const dispatch = useDispatch();

	const router = useRouter();

	useEffect(() => {
		if (currentUser) {
			router.push(`/${currentUser.userID}`);
		} else {
			router.push("/signin");
		}
	}, [currentUser]);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const currentUser = await getCurrentUser(user.uid);
				dispatch(setCurrentUser(currentUser));
				dispatch(showNotification("you are signed in", true));
			} else {
				dispatch(setCurrentUser(null));
			}
		});
	}, []);

	return (
		<div>
			<Notification />
			<Header />
			<div className={styles.wrapper}>{children}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(Layout);
