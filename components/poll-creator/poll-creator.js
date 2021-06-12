import React, { useState, useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import styles from "./poll-creator.module.scss";
import genericStyles from "../../styles/generic.module.scss";
import customInputStyles from "../custom-input/custom-input.module.scss";

import { addCurrentUserPoll } from "../../redux/polls/polls.actions";

import { createPoll } from "../../firebase/firebase.utils";

import CustomInput from "../custom-input/custom-input";
import Button from "../button/button";

const PollCreator = ({ currentUser }) => {
	const [options, setOptions] = useState(2);
	const [durationType, setDurationType] = useState("time");
	const [type, setType] = useState("open");
	const [titleError, setTitleError] = useState("");
	const [optionsErrors, setOptionsErrors] = useState({
		option1Error: "",
		option2Error: "",
	});
	const [timeDurationError, setTimeDurationError] = useState("");
	const [dateDurationError, setDateDurationError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [creating, setCreating] = useState(false);

	const titleRef = useRef();
	const optionsRef = useRef();
	const durationRef = useRef();
	const option1Ref = useRef();
	const option2Ref = useRef();
	const option3Ref = useRef();
	const option4Ref = useRef();
	const option5Ref = useRef();
	const timeDurationRef = useRef();
	const dateDurationRef = useRef();
	const passwordRef = useRef();
	const tagsRef = useRef();
	const typeRef = useRef();

	const optionsRefs = {
		option1: option1Ref,
		option2: option2Ref,
		option3: option3Ref,
		option4: option4Ref,
		option5: option5Ref,
	};

	const router = useRouter();

	const dispatch = useDispatch();

	const renderOptions = () => {
		let optionsArr = [];

		for (let i = 1; i <= options; i++) {
			optionsArr = [
				...optionsArr,
				<CustomInput
					label={`option ${i}`}
					type="text"
					inputRef={optionsRefs[`option${i}`]}
					error={optionsErrors[`option${i}Error`]}
					key={`option ${i}`}
				/>,
			];
		}

		return optionsArr;
	};

	const handleOptionsChange = (event) => {
		setOptions(event.target.value);
	};

	const renderDurationType = () => {
		return durationType === "time" ? (
			<CustomInput
				label="duration (in hours)"
				type="text"
				error={timeDurationError}
				inputRef={timeDurationRef}
			/>
		) : (
			<React.Fragment>
				<label className={customInputStyles.label}>
					select finish date
				</label>
				<input
					type="date"
					ref={dateDurationRef}
					className={`${styles.select} ${styles.date}`}
				/>
				<span className={`${customInputStyles.error} ${styles.error}`}>
					{dateDurationError}
				</span>
			</React.Fragment>
		);
	};

	const handleDurationTypeChange = (event) => {
		setDurationType(event.target.value);
	};

	const renderType = (event) => {
		return (
			type === "private" && (
				<CustomInput
					label="password"
					type="text"
					error={passwordError}
					inputRef={passwordRef}
				/>
			)
		);
	};

	const handleTypeChange = (event) => {
		setType(event.target.value);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		clearAllErrors();

		const emptyResult = validateInputFields();

		if (!emptyResult) {
			return;
		}

		setCreating(true);

		console.log(creating);

		try {
			const result = await createPoll(getPoll(), getPollOptions());

			setCreating(false);

			if (result.message === "created") {
				router.push(`/${ currentUser.userID }`);
				// dispatch(addCurrentUserPoll(getPoll()));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const clearAllErrors = () => {
		setTitleError("");
		setOptionError("option1Error", "");
		setOptionError("option2Error", "");
		setTimeDurationError("");
		setDateDurationError("");
		setPasswordError("");
	};

	const validateInputFields = () => {
		if (!titleRef.current.value) {
			// return { error: "title" };
			setTitleError("title cannot be empty");
			return false;
		}

		if (!option1Ref.current.value) {
			// return { error: "option1" };
			setOptionError("option1Error", "option one cannot be empty");
			return false;
		}

		if (!option2Ref.current.value) {
			// return { error: "option2" };
			setOptionError("option2Error", "option two cannot be empty");
			return false;
		}

		if (durationType === "time") {
			if (!timeDurationRef.current.value) {
				// return { error: "timeDuration", type: "empty" };
				setTimeDurationError("duration cannot be empty");
				return false;
			}

			if (
				timeDurationRef.current.value <= 0 ||
				isNaN(Number(timeDurationRef.current.value))
			) {
				// return { error: "timeDuration", type: "invalid" };
				setTimeDurationError("duration is not valid");
				return false;
			}
		}

		if (durationType === "date") {
			const startingDate = new Date(dateDurationRef.current.value);
			const currentDate = new Date();

			if (!dateDurationRef.current.value) {
				setDateDurationError("date cannot be empty");
				return false;
			}

			if (
				startingDate.getFullYear() < currentDate.getFullYear() ||
				startingDate.getMonth() < currentDate.getMonth() ||
				startingDate.getDate() <= currentDate.getDate()
			) {
				// return { error: "dateDuration" };
				setDateDurationError("date duration is not valid");
				return false;
			}
		}

		if (type === "private") {
			if (!passwordRef.current.value) {
				// return { error: "password" };
				setPasswordError("password cannot be empty");
				return false;
			}
		}

		return true;
	};

	const setOptionError = (option, error) => {
		setOptionsErrors({ ...optionsErrors, [`${option}`]: error });
	};

	const getPoll = () => {
		const currentTime = new Date().getTime();
		const pollID = `${currentUser.userID}${currentTime}`;

		let duration;

		if (durationRef.current.value === "time") {
			duration =
				currentTime + timeDurationRef.current.value * 60 * 60 * 1000;
		} else {
			duration = new Date(dateDurationRef.current.value).getTime();
		}

		return {
			title: titleRef.current.value,
			options: getPollOptions().map((pollOption) => pollOption.value),
			duration: duration,
			type: typeRef.current.value,
			password:
				typeRef.current.value === "private" && passwordRef.current.value
					? passwordRef.current.value
					: "",
			tags: tagsRef.current.value
				? arrayFromString(tagsRef.current.value)
				: [],
			createdByID: currentUser.userID,
			createdBy: currentUser,
			createdAt: currentTime,
			pollID: pollID,
		};
	};

	const getPollOptions = () => {
		return [
			{ value: option1Ref.current.value, votes: 0 },
			{ value: option2Ref.current.value, votes: 0 },
			option3Ref.current && option3Ref.current.value
				? { value: option3Ref.current.value, votes: 0 }
				: null,
			option4Ref.current && option4Ref.current.value
				? { value: option4Ref.current.value, votes: 0 }
				: null,
			option5Ref.current && option5Ref.current.value
				? { value: option5Ref.current.value, votes: 0 }
				: null,
		].filter((pollOption) => pollOption);
	};

	const arrayFromString = (string) => {
		const arr = string.split(",");
		return arr;
	};

	return (
		<form
			className={`${genericStyles.form} ${styles.form}`}
			onSubmit={handleFormSubmit}
		>
			<CustomInput
				label="title"
				type="text"
				error={titleError}
				inputRef={titleRef}
			/>
			<label className={customInputStyles.label}>options</label>
			<select
				className={styles.select}
				ref={optionsRef}
				onChange={handleOptionsChange}
			>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			{renderOptions().map((option) => {
				return option;
			})}
			<label className={customInputStyles.label}>duration type</label>
			<select
				className={styles.select}
				ref={durationRef}
				onChange={handleDurationTypeChange}
			>
				<option value="time">time</option>
				<option value="date">date</option>
			</select>
			{renderDurationType()}
			<label className={customInputStyles.label}>type</label>
			<select
				className={styles.select}
				onChange={handleTypeChange}
				ref={typeRef}
			>
				<option value="open">open (anyone can vote)</option>
				<option value="private">
					private (users need password to vote)
				</option>
			</select>
			{renderType()}
			<CustomInput label="tags" type="text" inputRef={tagsRef} />
			<div className={styles.gap}></div>
			<Button color="blue" size="full">
				{creating ? "creating" : "create"}
			</Button>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(PollCreator);
