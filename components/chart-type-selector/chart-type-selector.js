import { useState } from "react";
import { connect, useDispatch } from "react-redux";

import styles from "./chart-type-selector.module.scss";

import { setChartType } from "../../redux/chart/chart.actions";

import ChevronDownIcon from "../../assets/icons/chevron-down-icon";

import DropdownMenu from "../dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-item/dropdown-item";

const ChartTypeSelector = ({ chartType }) => {
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);
	const [chartTypes, setChartTypes] = useState([
		{
			value: "bar",
		},
		{
			value: "pie",
		},
		{
			value: "line",
		},
		{
			value: "scatter",
		},
	]);

	const dispatch = useDispatch();

	const toggleDropdownMenu = () => {
		setShowDropdownMenu(!showDropdownMenu);
	};

	const handleItemClick = (value) => {
		dispatch(setChartType(value));
	};

	return (
		<div onClick={toggleDropdownMenu} className={styles.chartTypeSelector}>
			<div className={styles.typeContainer}>
				<span className={styles.type}>{chartType}</span>{" "}
				<ChevronDownIcon size="smaller" />{" "}
			</div>
			<DropdownMenu show={showDropdownMenu} extraStyles={styles.dropdown}>
				{chartTypes.map((chartType) => {
					return (
						<DropdownItem
							value={chartType.value}
							clickHandler={handleItemClick}
						>
							{chartType.value}
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		chartType: state.chart.chartType,
	};
};

export default connect(mapStateToProps)(ChartTypeSelector);
