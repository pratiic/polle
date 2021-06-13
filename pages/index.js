import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { getCurrentUser } from "../components/utils/utils.current-user";

const MainPage = () => {
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	const router = useRouter();

	useEffect(() => {
		if (currentUser) {
			return router.push(`/${currentUser.userID}/1`);
		}
		return router.push("/signin");
	}, []);

	return (
		<div>
			<Head>
				<meta
					name="description"
					content="This is an application where users can create polls. Any user that has an account can vote on the polls. A poll can be open in which anyone can vote or private which requires a password to vote."
				/>
				<meta
					name="keywords"
					content="polle, poll, polls, private polls, open polls, vote"
				/>
			</Head>
		</div>
	);
};

export default MainPage;
