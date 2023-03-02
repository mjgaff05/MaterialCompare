import React from "react";
import Plot from "react-plotly.js";
import "./AshbyPlot.css";

const AshbyPlot = (props) => {
  const colorArray = ["green", "blue", "black", "orange", "red"];
  return (
    <div className="ashby-plot">
      <div className="ashby-plot__plot">
        <Plot
          data={props.data.map((set, index) => ({
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
          className='ashby-plot__plotly'
          //config={{responsive: true}}
        />
      </div>
    </div>
  );
};

export default AshbyPlot;
