import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Head from "next/head";

import styles from "./search.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import { setSearching } from "../../redux/search/search.actions";

import { searchPolls } from "../../firebase/firebase.utils";
import { arrFromDocs } from "../../components/utils/utils.results";

import PageHeader from "../../components/page-header/page-header";
import PollsList from "../../components/polls-list/polls-list";
import PollSearch from "../../components/poll-search/poll-search";

const SearchPage = ({ searchValue, searching }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchMessage, setSearchMessage] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (searching) {
			fetchSearchResults();
		}
	}, [searching]);

	const fetchSearchResults = async () => {
		setSearchResults([]);
		setSearchMessage("loading polls...");
		const result = await searchPolls(searchValue);
		setSearchMessage("");
		dispatch(setSearching(false));

		if (result.results) {
			if (result.results.length > 0) {
				return setSearchResults(arrFromDocs(result.results));
			}
			setSearchMessage("no polls found");
		}
	};

	return (
		<div className={genericStyles.page}>
			<Head>
				<title>Search</title>
				<meta name="description" content="search for polls" />
				<meta name="keywords" content="search poll, poll, polle" />
			</Head>

			<PageHeader
				text={`search results for "${searchValue}"`}
				extraStyles={styles.pageHeader}
			/>
			<PollSearch />
			<div className={styles.gap}></div>
			{searchResults.length > 0 ? (
				<PollsList polls={searchResults} />
			) : (
				<p className={genericStyles.message}>{searchMessage}</p>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		searchValue: state.search.searchValue,
		searching: state.search.searching,
	};
};

export default connect(mapStateToProps)(SearchPage);
