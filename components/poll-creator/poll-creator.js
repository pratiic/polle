import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import styles from "./poll-creator.module.scss";
import genericStyles from "../../styles/generic.module.scss";
import customInputStyles from "../custom-input/custom-input.module.scss";

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

		try {
			const currentTime = new Date().getTime();
			const pollID = `${currentUser.userID}${currentTime}`;

			const result = await createPoll({
				title: titleRef.current.value,
				options: [
					{ value: option1Ref.current.value, votes: 0 },
					{ value: option2Ref.current.value, votes: 0 },
					option3Ref.current && option3Ref.current.value
						? { value: option3Ref.current.value, votes: 0 }
						: null,
					option4Ref.current && option4Ref.current.value
						? { value: option5Ref.current.value, votes: 0 }
						: null,
					option5Ref.current && option5Ref.current.value
						? { value: option5Ref.current.value, votes: 0 }
						: null,
				],
				durationType: durationRef.current.value,
				timeDuration:
					timeDurationRef.current && timeDurationRef.current.value
						? timeDurationRef.current.value
						: "",
				dateDuration:
					dateDurationRef.current && dateDurationRef.current.value
						? dateDurationRef.current.value
						: "",
				type: typeRef.current.value,
				password:
					typeRef.current.value === "private" &&
					passwordRef.current.value
						? passwordRef.current.value
						: "",
				tags: tagsRef.current.value,
				createdBy: currentUser,
				createdAt: currentTime,
				pollID: pollID,
			});

			if (result.message === "created") {
				router.push("/");
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
			return setTitleError("title cannot be empty");
		}

		if (!option1Ref.current.value) {
			// return { error: "option1" };
			return setOptionError("option1Error", "option one cannot be empty");
		}

		if (!option2Ref.current.value) {
			// return { error: "option2" };
			return setOptionError("option2Error", "option two cannot be empty");
		}

		if (durationType === "time") {
			if (!timeDurationRef.current.value) {
				// return { error: "timeDuration", type: "empty" };
				return setTimeDurationError("duration cannot be empty");
			}

			if (
				timeDurationRef.current.value <= 0 ||
				isNaN(Number(timeDurationRef.current.value))
			) {
				// return { error: "timeDuration", type: "invalid" };
				return setTimeDurationError("duration is not valid");
			}
		}

		if (durationType === "date") {
			const startingDate = new Date(dateDurationRef.current.value);
			const currentDate = new Date();

			if (!dateDurationRef.current.value) {
				return setDateDurationError("date cannot be empty");
			}

			if (
				startingDate.getFullYear() < currentDate.getFullYear() ||
				startingDate.getMonth() < currentDate.getMonth() ||
				startingDate.getDate() <= currentDate.getDate()
			) {
				// return { error: "dateDuration" };
				return setDateDurationError("date duration is not valid");
			}
		}

		if (type === "private") {
			if (!passwordRef.current.value) {
				// return { error: "password" };
				return setPasswordError("password cannot be empty");
			}
		}
	};

	const setOptionError = (option, error) => {
		setOptionsErrors({ ...optionsErrors, [`${option}`]: error });
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
			<Button>create</Button>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.currentUser,
	};
};

export default connect(mapStateToProps)(PollCreator);
