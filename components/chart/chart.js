import styles from "./chart.module.scss";

import { Bar } from "react-chartjs-2";

const Chart = ({ type, data, options }) => {
	return (
		<div className={styles.chartContainer}>
			<Bar
				data={data}
				options={options}
				// style={{
				// 	height: "400px",
				// 	width: "600px",
				// 	marginRight: "2rem",
				// }}
				className={styles.chart}
			/>
		</div>
	);
};

export default Chart;
