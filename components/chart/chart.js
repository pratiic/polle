import { connect } from "react-redux";

import styles from "./chart.module.scss";

import { Bar, Pie, Line, Scatter, defaults } from "react-chartjs-2";

const Chart = ({ type, data, options, chartType }) => {
	defaults.font.size = 15;
	defaults.font.family = "Montserrat";

	const renderChart = () => {
		if (chartType === "bar" || chartType === "horizontal bar") {
			return (
				<Bar
					data={data}
					options={{
						...options,
						responsive: true,
					}}
					className={styles.chart}
				/>
			);
		}

		if (chartType === "pie") {
			return (
				<Pie data={data} options={options} className={styles.chart} />
			);
		}

		if (chartType === "line") {
			return (
				<Line data={data} options={options} className={styles.chart} />
			);
		}

		if (chartType === "scatter") {
			return (
				<Scatter
					data={data}
					options={options}
					className={styles.chart}
				/>
			);
		}
	};

	return <div className={styles.chartContainer}>{renderChart()}</div>;
};

const mapStateToProps = (state) => {
	return {
		chartType: state.chart.chartType,
	};
};

export default connect(mapStateToProps)(Chart);
