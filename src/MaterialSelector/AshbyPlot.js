import React from "react";
import Plot from "react-plotly.js";
import classes from "./AshbyPlot.module.css";

const AshbyPlot = (props) => {
  const colorArray = ["green", "blue", "black", "orange", "red"];
  const filteredData =
    props.filters.family === ""
      ? props.data
      : props.data.filter((data) => data.family === props.filters.family);
  return (
    <div className={classes["ashby-plot"]}>
      <div className={classes["ashby-plot__plot"]}>
        <Plot
          data={filteredData.map((set, index) => ({
            x: set.xData,
            y: set.yData,
            type: "scatter",
            mode: "markers",
            name: set.family,
            marker: { color: colorArray[index] },
          }))}
          layout={{
            autosize: true,
            //width: 600,
            //height: 450,
            title: props.filters.xProp + " vs. " + props.filters.yProp,
            xaxis: {
              title: props.filters.xProp,
            },
            yaxis: {
              title: props.filters.yProp,
            },
          }}
          useResizeHandler={true}
          className={classes["ashby-plot__plotly"]}
          //config={{responsive: true}}
        />
      </div>
    </div>
  );
};

export default AshbyPlot;
