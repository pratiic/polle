import { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";

import styles from "./vote.module.scss";

import { setVotedOption } from "../../redux/polls/polls.actions";

import {
	addVote,
	checkIfVoted,
	firestore,
} from "../../firebase/firebase.utils";
import { getCurrentUser } from "../utils/utils.current-user";

import VoteOption from "../vote-option/vote-option";
import Button from "../button/button";
import CustomInput from "../custom-input/custom-input";

const Vote = ({
	options,
	pollID,
	pollEnded,
	winners,
	totalVotes,
	type,
	password,
	votedOption,
	votedBy,
}) => {
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
	const [selectedOption, setSelectedOption] = useState("");
	const [optionsToDisplay, setOptionsToDisplay] = useState(
		options.map((option) => {
			return { ...option, selected: false };
		})
	);
	const [voted, setVoted] = useState(false);
	const [voting, setVoting] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	const dispatch = useDispatch();

	const passwordRef = useRef();

	useEffect(() => {
		checkVoted();
	}, []);

	useEffect(() => {
		firestore
			.collection("polls")
			.doc(pollID)
			.collection("votes")
			.onSnapshot((snapshot) => {
				checkVoted();
			});
	}, []);

	const checkVoted = async () => {
		const result = await checkIfVoted(pollID, currentUser.userID);
		console.log(result);

		if (result.voted) {
			setVoted(true);
			selectOption(result.option);
			setVotedOption(result.option);
			dispatch(setVotedOption(result.option));
		}
	};

	const selectOption = (value) => {
		setSelectedOption(value);

		setOptionsToDisplay(
			optionsToDisplay.map((optionToDisplay) => {
				if (optionToDisplay.value === value) {
					return { ...optionToDisplay, selected: true };
				}

				return { ...optionToDisplay, selected: false };
			})
		);
	};

	const handleVoteButtonClick = async () => {
		setPasswordError("");

		if (voted && voting) {
			return;
		}

		if (type === "private") {
			const validPassword = validatePassword();

			if (!validPassword) {
				return;
			}
		}

		if (selectedOption) {
			setVoting(true);
			const result = await addVote(
				pollID,
				selectedOption,
				options.find((option) => option.value === selectedOption)
					.votes + 1,
				currentUser.userID,
				votedBy
			);
			setVoting(false);
		}
	};

	const validatePassword = () => {
		if (!passwordRef.current.value) {
			setPasswordError("password cannot be empty");
			return false;
		}

		if (passwordRef.current.value !== password) {
			setPasswordError("password is not correct");
			return false;
		}

		return true;
	};

	return (
		<div
			className={`${styles.vote} ${(voted || pollEnded) && styles.voted}`}
		>
			<h3 className={styles.title}>vote</h3>

			<div className={styles.voteOptions}>
				{optionsToDisplay.map((option) => {
					return (
						<VoteOption
							{...option}
							voted={voted}
							pollEnded={pollEnded}
							winners={winners}
							totalVotes={totalVotes}
							clickHandler={selectOption}
						/>
					);
				})}
			</div>

			<div className={styles.gap}></div>

			{type === "private" && !votedOption && !pollEnded && (
				<CustomInput
					label="password"
					inputRef={passwordRef}
					error={passwordError}
				/>
			)}

			<Button
				color={voted || pollEnded ? "blue" : "red"}
				font="smaller"
				align="center"
				size="full"
				clickHandler={handleVoteButtonClick}
			>
				{pollEnded
					? "ended"
					: voted
					? "voted"
					: voting
					? "voting"
					: "vote"}
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
		votedOption: state.polls.votedOption,
	};
};

export default connect(mapStateToProps)(Vote);
