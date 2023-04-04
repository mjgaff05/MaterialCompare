import React, { useState, useContext, useEffect, useCallback } from "react";

import classes from "./MaterialSelector.module.css";
import MaterialsContext from "../store/materials-context";
import AshbyPlot from "./AshbyPlot";
import ChartFilters from "./ChartFilters";
import { Grid } from "@mui/material";

const MaterialSelector = (props) => {
  const materialsCtx = useContext(MaterialsContext);

  const filterOptions = {
    families: materialsCtx.families,
    matProps: materialsCtx.properties,
  };

  const [chartFilters, setChartFilters] = useState({
    xProp: "",
    yProp: "",
    family: "",
  });

  const filterChangeHandler = (filters) => {
    setChartFilters(filters);
  };

  const dataArray = materialsCtx.families.map((fam) => ({
    family: fam,
    xData: materialsCtx.materials
      .filter((data) => data.family === fam)
      .map((material) => material.data[chartFilters.xProp]),
    yData: materialsCtx.materials
      .filter((data) => data.family === fam)
      .map((material) => material.data[chartFilters.yProp]),
    name: materialsCtx.materials
      .filter((data) => data.family === fam)
      .map((material) => material.name),
  }));

  //console.log(dataArray);

  const logMaterials = () => {
    console.log(materialsCtx);
  };

  return (
    <div className={classes["material-selector"]}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <ChartFilters
          className={classes["material-selector__control"]}
          onChangeFilters={filterChangeHandler}
          filterOptions={filterOptions}
        />
        <AshbyPlot filters={chartFilters} data={dataArray} />
        <button onClick={logMaterials}></button>
      </Grid>
    </div>
  );
};

export default MaterialSelector;
