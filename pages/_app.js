import { Provider } from "react-redux";
import { store } from "../redux/store";

import "../styles/globals.scss";

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
