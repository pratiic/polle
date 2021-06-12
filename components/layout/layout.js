import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useRouter } from "next/router";

import styles from "../../styles/layout.module.scss";

import {
	setCurrentUser,
	signUserIn,
} from "../../redux/current-user/current-user.actions";
import { showNotification } from "../../redux/notification/notification.actions";

import {
	auth,
	getCurrentUser as getCurrentUserInfo,
} from "../../firebase/firebase.utils";
import { getCurrentUser } from "../utils/utils.current-user";

import Header from "../header/header";
import Notification from "../notification/notification";

const Layout = ({ children }) => {
	const dispatch = useDispatch();

	const router = useRouter();
	// useEffect(() => {
	// 	if (currentUser) {
	// 		router.push(`/${currentUser.userID}`);
	// 	} else {
	// 		router.push("/signin");
	// 	}
	// }, [currentUser]);

	useEffect(() => {
		const localStorage = window.localStorage;

		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const currentUser = getCurrentUser();

				if (currentUser) {
					dispatch(signUserIn());
					return;
				}

				const currentUserInfo = await getCurrentUserInfo(user.uid);
				localStorage.setItem(
					"currentUser",
					JSON.stringify(currentUserInfo)
				);
				dispatch(signUserIn());
				router.push(`/${currentUserInfo.userID}`);
				// dispatch(setCurrentUser(currentUser));
				dispatch(showNotification("you are signed in", true));
			}
		});
	}, []);

	useEffect(() => {
		if (
			router.pathname.includes("signin") ||
			router.pathname.includes("signup") ||
			router.pathname === "/"
		) {
			return;
		}

		const currentUser = getCurrentUser();

		if (!currentUser) {
			router.push("/signin");
			dispatch(showNotification("you need to sign in", true));
		}
	}, [router]);

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
