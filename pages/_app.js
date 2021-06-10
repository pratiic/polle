import { Provider, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import "../styles/globals.scss";

import { store } from "../redux/store";

import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
