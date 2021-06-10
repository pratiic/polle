import styles from "./chart.module.scss";
import "./chart.module.scss";

import { Bar } from "react-chartjs-2";

const Chart = ({ type, data, options }) => {
	return (
		<div>
			<Bar
				data={data}
				options={options}
				style={{
					height: "400px",
					width: "600px",
					marginRight: "2rem",
				}}
			/>
		</div>
	);
};

export default Chart;
