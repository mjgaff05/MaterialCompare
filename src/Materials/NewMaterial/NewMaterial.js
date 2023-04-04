import React, { useState, useContext } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import classes from "./NewMaterial.module.css";
import MaterialForm from "./NewMaterialForm";
import MaterialsContext from "../../store/materials-context";
import NewMaterialCSV from "./NewMaterialCSV";

const NewMaterial = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [alignment, setAlignment] = useState("manual");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const materialsCtx = useContext(MaterialsContext);

  const newMaterialHandler = (material) => {
    materialsCtx.addMaterial(material);
    //handleClose();
    console.log("Submitting new material");
  };

  return (
    <div className={classes["new-material"]}>
      <Grid container m={6} direction="column" alignItems="center">
        <Button
          color="button"
          variant="contained"
          onClick={handleClickOpen}
          className={classes["new-material__Button"]}
        >
          New Material
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="manual">Manual Input</ToggleButton>
            <ToggleButton value="csv">.csv</ToggleButton>
          </ToggleButtonGroup>
          {alignment === "manual" && (
            <div className={classes["new-material__form"]}>
              <MaterialForm
                onSubmitNew={newMaterialHandler}
                onClose={handleClose}
                properties={materialsCtx.properties}
              />
            </div>
          )}
          {alignment === "csv" && (
            <NewMaterialCSV
              onSubmitNew={newMaterialHandler}
              onClose={handleClose}
              properties={materialsCtx.properties}
            ></NewMaterialCSV>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewMaterial;
