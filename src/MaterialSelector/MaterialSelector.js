import React, { useState } from "react";

import classes from "./MaterialSelector.module.css";

import AshbyPlot from "./AshbyPlot";
import ChartFilters from "./ChartFilters";

const MaterialSelector = (props) => {
  const families = [...new Set(props.data.map((material) => material.family))];
  const DUMMY_PROPS = {
    families: families,
    matProps: ["tensile", "yield", "elongation", "density"],
  };

  const [chartFilters, setChartFilters] = useState({
    xProp: "",
    yProp: "",
    family: "",
  });
  const [xDataArray, setXDataArray] = useState([0]);
  const [yDataArray, setYDataArray] = useState([0]);

  const filterChangeHandler = (filters) => {
    setChartFilters(filters);
    console.log(filters);
    setXDataArray(props.data.map((material) => material[chartFilters.xProp]));
    setYDataArray(props.data.map((material) => material[chartFilters.yProp]));
    console.log(xDataArray);
    console.log(yDataArray);
  };

  const dataArray = families.map((fam) => ({
    family: fam,
    xData: props.data
      .filter((data) => data.family === fam)
      .map((material) => material[chartFilters.xProp]),
    yData: props.data
      .filter((data) => data.family === fam)
      .map((material) => material[chartFilters.yProp]),
  }));

  return (
    <div className={classes["material-selector"]}>
      <ChartFilters
        onChangeFilters={filterChangeHandler}
        filterOptions={DUMMY_PROPS}
      />
      <AshbyPlot filters={chartFilters} data={dataArray} />
    </div>
  );
};

export default MaterialSelector;
