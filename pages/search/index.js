import { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./search.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import { searchPolls } from "../../firebase/firebase.utils";
import { arrFromDocs } from "../../components/utils/utils.results";

import PageHeader from "../../components/page-header/page-header";
import PollsList from "../../components/polls-list/polls-list";
import PollSearch from "../../components/poll-search/poll-search";

const SearchPage = ({ searchValue }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchMessage, setSearchMessage] = useState("");

	useEffect(() => {
		fetchSearchResults();
	}, []);

	console.log(searchResults);

	const fetchSearchResults = async () => {
		setSearchMessage("loading polls...");
		const result = await searchPolls(searchValue);
		setSearchMessage("");

		if (result.results) {
			if (result.results.length > 0) {
				return setSearchResults(arrFromDocs(result.results));
			}
			setSearchMessage("no polls found");
		}
	};

	return (
		<div className={genericStyles.page}>
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
	};
};

export default connect(mapStateToProps)(SearchPage);
