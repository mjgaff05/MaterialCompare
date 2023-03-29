import { useState } from "react";
import { Button, DialogActions, DialogTitle } from "@mui/material";
import classes from "./NewMaterialCSV.module.css"

const NewMaterialCSV = (props) => {
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const materialArray = csvRows.map((material, index) => {
      const dataValues = material.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        if (header.substring(0, 2) === "d_") {
          if (object["data"]) {
            object["data"][header.substring(2, header.length)] =
              dataValues[index];
          } else {
            object["data"] = {};
            object["data"][header.substring(2, header.length)] =
              dataValues[index];
          }
        } else {
          object[header] = dataValues[index];
        }

        return object;
      }, {});
      return obj;
    });
    const newMaterialsArray = materialArray.map((material) => ({
      ...material,
      key: `material${Math.random(0)}`,
      id: `material${Math.random(0)}`,
    }));
    console.log(newMaterialsArray);
    newMaterialsArray.forEach((material) => {if(material.name !== "") {props.onSubmitNew(material)}});
  };

  const changeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };

      fileReader.readAsText(file);
      props.onClose();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["new-material-cs"]}>
        <DialogTitle>Upload a csv file with your material data.</DialogTitle>
        <input type="file" accept=".csv" onChange={changeHandler} className={classes["new-material-csv__input"]}></input>
        <DialogActions className={classes["new-material-csv"]}>
          <Button type="submit">Sumbit</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
      </div>
    </form>
  );
};

export default NewMaterialCSV;
