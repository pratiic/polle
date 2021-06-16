import { useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "./signup.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import { signUp, firestore, addUser } from "../../firebase/firebase.utils";
import { getCurrentUser } from "../../components/utils/utils.current-user";

import CustomInput from "../../components/custom-input/custom-input";
import Button from "../../components/button/button";

const SignUpPage = () => {
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
	const [signingUp, setSigningUp] = useState(false);
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const repeatedPasswordRef = useRef();

	const router = useRouter();

	if (currentUser) {
		router.push(`/${currentUser.userID}`);
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		clearAllErrors();

		const emptyResult = checkIfEmpty();

		switch (emptyResult.error) {
			case "username":
				setUsernameError("username cannot be empty");
				return;
			case "email":
				setEmailError("email cannot be empty");
				return;
			case "password":
				setPasswordError("password cannot be empty");
				return;
			case "repeatedPassword":
				setRepeatedPasswordError("password cannot be empty");
				return;
		}

		const minimumCharacterResult = checkMinimumCharacters();

		switch (minimumCharacterResult.error) {
			case "username":
				setUsernameError("username must be atleast 5 characters long");
				return;
			case "password":
				setPasswordError("password must be atleast 7 characters long");
				return;
		}

		const maximumCharacterResult = checkMaximumCharacters();

		switch (maximumCharacterResult.error) {
			case "username":
				setUsernameError(
					"username cannot be greater than 20 characters long"
				);
				return;
		}

		const validEmail = validateEmail();

		if (!validEmail) {
			return setEmailError("email is not valid");
		}

		const passwordsMatched = checkPasswordsMatch();

		if (!passwordsMatched) {
			setPasswordError("these passwords do not match");
			return setRepeatedPasswordError("these passwords do not match");
		}

		setSigningUp(true);

		const result = await signUp({
			email: emailRef.current.value,
			password: passwordRef.current.value,
		});

		setSigningUp(false);

		if (result.error && result.error.code === "auth/email-already-in-use") {
			return setEmailError("this email belongs to an existing user");
		}

		if (result.message === "signed up") {
			try {
				await addUser(
					{
						username: usernameRef.current.value,
						email: emailRef.current.value,
						userID: result.userInfo.uid,
						createdAt: new Date().getTime(),
					},
					result.userInfo.uid
				);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const clearAllErrors = () => {
		setUsernameError("");
		setEmailError("");
		setPasswordError("");
		setRepeatedPasswordError("");
	};

	const checkIfEmpty = () => {
		if (!usernameRef.current.value) {
			return { error: "username" };
		}

		if (!emailRef.current.value) {
			return { error: "email" };
		}

		if (!passwordRef.current.value) {
			return { error: "password" };
		}

		if (!repeatedPasswordRef.current.value) {
			return { error: "repeatedPassword" };
		}

		return { error: "" };
	};

	const checkMinimumCharacters = () => {
		if (usernameRef.current.value.length < 5) {
			return { error: "username" };
		}

		if (passwordRef.current.value.length < 7) {
			return { error: "password" };
		}

		return { error: "" };
	};

	const checkMaximumCharacters = () => {
		if (usernameRef.current.value.length > 20) {
			return { error: "username" };
		}

		return { error: "" };
	};

	const validateEmail = () => {
		const emailRegularExpression =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const result = emailRegularExpression.test(emailRef.current.value);
		return result;
	};

	const checkPasswordsMatch = () => {
		return passwordRef.current.value === repeatedPasswordRef.current.value;
	};

	return (
		<div className={genericStyles.page}>
			<Head>
				<title>Sign Up</title>
				<meta name="description" content="sign up to polle" />
				<meta name="keywords" content="sign up, polle, poll" />
			</Head>

			<h2 className={`${genericStyles.title} ${styles.title}`}>
				sign up with polle
			</h2>
			<h4 className={`${genericStyles.subTitle} ${styles.subTitle}`}>
				already have an account?{" "}
				<Link href="/signin" className={genericStyles.formLink}>
					sign in
				</Link>
			</h4>

			<form className={genericStyles.form} onSubmit={handleFormSubmit}>
				<CustomInput
					label="username"
					type="text"
					error={usernameError}
					inputRef={usernameRef}
				/>
				<CustomInput
					label="email"
					type="text"
					error={emailError}
					inputRef={emailRef}
				/>
				<CustomInput
					label="password"
					type="password"
					error={passwordError}
					inputRef={passwordRef}
				/>
				<CustomInput
					label="repeat password"
					type="password"
					error={repeatedPasswordError}
					inputRef={repeatedPasswordRef}
				/>

				<div className={styles.gap}></div>

				<Button size="full" color="blue">
					{signingUp ? "signing up" : "sign up"}
				</Button>
			</form>
		</div>
	);
};

export default SignUpPage;
