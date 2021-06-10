import { useState } from "react";

import styles from "./profile-preview.module.scss";

import { auth } from "../../firebase/firebase.utils";

import ChevronDownIcon from "../../assets/icons/chevron-down-icon";

import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const ProfilePreview = ({ username }) => {
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);

	const toggleDropdownMenu = () => {
		setShowDropdownMenu(!showDropdownMenu);
	};

	const handleSignOutItemClick = () => {
		auth.signOut();
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
