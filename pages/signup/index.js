import { useRef } from "react";
import Link from "next/link";

import styles from "./signup.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import CustomInput from "../../components/custom-input/custom-input";
import Button from "../../components/button/button";

const SignUpPage = () => {
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const repeatedPasswordRef = useRef();

	return (
		<div className={genericStyles.page}>
			<h2 className={`${genericStyles.title} ${styles.title}`}>
				sign up with polle
			</h2>
			<h4 className={`${genericStyles.subTitle} ${styles.subTitle}`}>
				already have an account?{" "}
				<Link href="/signin" className={genericStyles.formLink}>
					sign in
				</Link>
			</h4>

			<form className={genericStyles.form}>
				<CustomInput
					label="username"
					type="text"
					inputRef={usernameRef}
				/>
				<CustomInput label="email" type="text" inputRef={emailRef} />
				<CustomInput
					label="password"
					type="password"
					inputRef={passwordRef}
				/>
				<CustomInput
					label="repeat password"
					type="password"
					inputRef={repeatedPasswordRef}
				/>

				<div className={styles.gap}></div>

				<Button size="full" color="blue">
					sign up
				</Button>
			</form>
		</div>
	);
};

export default SignUpPage;
