import React, { useState } from "react";
import classes from "./ChartFilters.module.css";
import Dropdown from "../UI/Dropdown";
import { Button, Grid } from "@mui/material";

const ChartFilters = (props) => {
  const [selectedX, setSelectedX] = useState("");
  const [selectedY, setSelectedY] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("");

  const xPropChangeHandler = (newX) => {
    setSelectedX(newX);
  };

  const yPropChangeHandler = (newY) => {
    setSelectedY(newY);
  };

  const familyChangeHandler = (newFamily) => {
    setSelectedFamily(newFamily);
  };

  const updateProps = () => {
    const chartProps = {
      xProp: selectedX,
      yProp: selectedY,
      family: selectedFamily,
    };
    props.onChangeFilters(chartProps);
  };

  const clearProps = () => {
    const chartProps = {
      xProp: "",
      yProp: "",
      family: "",
    };
    props.onChangeFilters(chartProps);
    setSelectedX("");
    setSelectedY("");
    setSelectedFamily("");
  };

  return (
    <div className={classes["chart-filter"]}>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <Dropdown
          label="Choose the x-axis units:"
          list={props.filterOptions.matProps}
          selected={selectedX}
          onSelect={xPropChangeHandler}
        />
        <Dropdown
          label="Choose the y-axis units:"
          list={props.filterOptions.matProps}
          selected={selectedY}
          onSelect={yPropChangeHandler}
        />
        <Dropdown
          label="(Optional) Choose a material family:"
          list={props.filterOptions.families}
          onSelect={familyChangeHandler}
          selected={selectedFamily}
        />
        <Button
          color="button"
          variant="contained"
          onClick={updateProps}
          className={classes["chart-filter__Button"]}
        >
          Update
        </Button>
        <Button
          color="button"
          variant="contained"
          onClick={clearProps}
          className={classes["chart-filter__Button"]}
        >
          Clear
        </Button>
      </Grid>
    </div>
  );
};

export default ChartFilters;
