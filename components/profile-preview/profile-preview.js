import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import styles from "./profile-preview.module.scss";

import { setCurrentUserPolls } from "../../redux/polls/polls.actions";
import { showNotification } from "../../redux/notification/notification.actions";
import { signUserOut } from "../../redux/current-user/current-user.actions";

import { auth } from "../../firebase/firebase.utils";
import { removeCurrentUser } from "../utils/utils.current-user";

import ChevronDownIcon from "../../assets/icons/chevron-down-icon";

import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const ProfilePreview = ({ username }) => {
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);

	const dispatch = useDispatch();

	const router = useRouter();

	const toggleDropdownMenu = () => {
		setShowDropdownMenu(!showDropdownMenu);
	};

	const handleSignOutItemClick = () => {
		auth.signOut();
		dispatch(setCurrentUserPolls([]));
		removeCurrentUser();
		router.push("/signin");
		dispatch(signUserOut());
		dispatch(showNotification("you are signed out", true));
	};

	return (
		<div className={styles.profilePreview} onClick={toggleDropdownMenu}>
			<p className={styles.username}>{username}</p>
			<ChevronDownIcon extraStyles={styles.icon} />
			<DropdownMenu
				extraStyles={styles.dropdownMenu}
				show={showDropdownMenu}
			>
				<DropdownItem clickHandler={handleSignOutItemClick}>
					sign out
				</DropdownItem>
			</DropdownMenu>
		</div>
	);
};

export default ProfilePreview;
