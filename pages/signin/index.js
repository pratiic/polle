import { useRef, useState } from "react";
import Link from "next/link";

import styles from "./signin.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import { signIn } from "../../firebase/firebase.utils";

import CustomInput from "../../components/custom-input/custom-input";
import Button from "../../components/button/button";

const SignIn = () => {
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [signingIn, setSigningIn] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		clearAllErrors();

		const emptyResult = checkIfEmpty();

		switch (emptyResult.error) {
			case "email":
				setEmailError("email cannot be empty");
				return;
			case "password":
				setPasswordError("password cannot be empty");
				return;
		}

		setSigningIn(true);

		const result = await signIn({
			email: emailRef.current.value,
			password: passwordRef.current.value,
		});

		setSigningIn(false);

		if (result.error) {
			if (result.error.code === "auth/user-not-found") {
				return setEmailError("this email does not exist");
			}

			setEmailError("email or password is incorrect");
			return setPasswordError("email or password is incorrect");
		}
	};

	const clearAllErrors = () => {
		setEmailError("");
		setPasswordError("");
	};

	const checkIfEmpty = () => {
		if (!emailRef.current.value) {
			return { error: "email" };
		}

		if (!passwordRef.current.value) {
			return { error: "password" };
		}

		return { error: "" };
	};

	return (
		<div className={genericStyles.page}>
			<h2 className={`${genericStyles.title} ${styles.title}`}>
				sign in to polle
			</h2>
			<h4 className={`${genericStyles.subTitle} ${styles.subTitle}`}>
				do not have an account?{" "}
				<Link href="/signup" className={genericStyles.formLink}>
					sign up
				</Link>
			</h4>

			<form className={genericStyles.form} onSubmit={handleFormSubmit}>
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

				<div className={styles.gap}></div>

				<Button size="full" color="blue">
					{signingIn ? "signing in" : "sign in"}
				</Button>
			</form>
		</div>
	);
};

export default SignIn;
