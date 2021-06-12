import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, connect } from "react-redux";

import styles from "./poll-search.module.scss";

import {
	setSearching,
	setSearchValue,
} from "../../redux/search/search.actions";

import SearchIcon from "../../assets/icons/search.icon";

const PollSearch = ({ searchValue }) => {
	const [search, setSearch] = useState("");

	const router = useRouter();

	const dispatch = useDispatch();

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (!search) {
			return;
		}

		dispatch(setSearchValue(search));
		dispatch(setSearching(true));
		router.push("/search");
	};

	const handleInputChange = (event) => {
		setSearch(event.target.value);
	};

	return (
		<form className={styles.search} onSubmit={handleFormSubmit}>
			<div className={styles.inputGroup}>
				<input
					type="text"
					className={styles.input}
					placeholder="search with title or tags"
					value={search}
					onChange={handleInputChange}
				/>
				<SearchIcon size="smaller" extraStyles={styles.icon} />
			</div>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		searchValue: state.search.searchValue,
	};
};

export default connect(mapStateToProps)(PollSearch);
