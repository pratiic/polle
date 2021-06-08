import Link from "next/link";

import styles from "./signin.module.scss";
import genericStyles from "../../styles/generic.module.scss";

import CustomInput from "../../components/custom-input/custom-input";
import Button from "../../components/button/button";

const SignIn = () => {
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

			<form className={genericStyles.form}>
				<CustomInput label="email" type="text" />
				<CustomInput label="password" type="password" />

				<div className={styles.gap}></div>

				<Button size="full" color="blue">
					sign in
				</Button>
			</form>
		</div>
	);
};

export default SignIn;
