import React, { useState, useRef, useEffect } from "react";

import styles from "./poll-creator.module.scss";
import genericStyles from "../../styles/generic.module.scss";
import customInputStyles from "../custom-input/custom-input.module.scss";

import { createPoll } from "../../firebase/firebase.utils";

import CustomInput from "../custom-input/custom-input";
import Button from "../button/button";

const PollCreator = () => {
	const [options, setOptions] = useState(2);
	const [durationType, setDurationType] = useState("time");
	const [type, setType] = useState("open");

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

	const renderOptions = () => {
		let optionsArr = [];

		for (let i = 1; i <= options; i++) {
			optionsArr = [
				...optionsArr,
				<CustomInput
					label={`option ${i}`}
					type="text"
					inputRef={optionsRefs[`option${i}`]}
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

		const result = await createPoll({
			title: titleRef.current.value,
			duration: timeDurationRef.current.value,
			createdAt: new Date().getTime(),
		});
	};

	return (
		<form
			className={`${genericStyles.form} ${styles.form}`}
			onSubmit={handleFormSubmit}
		>
			<CustomInput label="title" type="text" inputRef={titleRef} />
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

export default PollCreator;
