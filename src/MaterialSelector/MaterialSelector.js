import React, { useState, useContext } from "react";

import classes from "./MaterialSelector.module.css";
import MaterialsContext from "../store/materials-context";
import AshbyPlot from "./AshbyPlot";
import ChartFilters from "./ChartFilters";

const MaterialSelector = (props) => {
  const materialsCtx = useContext(MaterialsContext);
  const matArray = materialsCtx.materials;

  const families = [...new Set(matArray.map((material) => material.family))];
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
    setXDataArray(matArray.map((material) => material[chartFilters.xProp]));
    setYDataArray(matArray.map((material) => material[chartFilters.yProp]));
    console.log(xDataArray);
    console.log(yDataArray);
  };

  const dataArray = families.map((fam) => ({
    family: fam,
    xData: matArray
      .filter((data) => data.family === fam)
      .map((material) => material[chartFilters.xProp]),
    yData: matArray
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
