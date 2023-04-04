import React, { useState, useContext } from "react";
import classes from "./NewMaterialForm.module.css";
import {
  Button,
  DialogActions,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import MaterialsContext from "../../store/materials-context";

const MaterialForm = (props) => {
  const [newMaterial, setNewMaterial] = useState({ family: "" });
  const materialsCtx = useContext(MaterialsContext);

  const changeHandler = (event) => {
    const property = event.target.name;
    if (property === "family" || property === "name") {
      setNewMaterial((prev) => ({ ...prev, [property]: event.target.value }));
    } else {
      setNewMaterial((prev) => {
        return {
          ...prev,
          data: { ...prev.data, [property]: event.target.value },
        };
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const addMat = {
      ...newMaterial,
      key: `material${Math.random(0)}`,
      id: `material${Math.random(0)}`,
    }
    props.onSubmitNew(addMat);
    console.log(addMat);
    setNewMaterial({ family: "" });

    props.onClose();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["material-form"]}>
        <DialogTitle className={classes["new-material__description"]}>
          Enter the material information below to add its properties to the
          database.
        </DialogTitle>
        <div className={classes["material-form__control"]}>
          <TextField
            label="name"
            name="name"
            type="text"
            onChange={changeHandler}
            className={classes["material-form__input"]}
          />
          <TextField
            label="family"
            name="family"
            select
            value={newMaterial.family}
            type="text"
            onChange={changeHandler}
          >
            {materialsCtx.families.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {materialsCtx.properties.map((property, index) => (
            <TextField
              id={`newMaterial${index} `}
              key={`newMaterial${index} `}
              name={property}
              label={property}
              type="text"
              onChange={changeHandler}
              className={classes["material-form__input"]}
            />
          ))}
        </div>
        <DialogActions className={classes["new-material-form"]}>
          <Button type="submit">Sumbit</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
      </div>
    </form>
  );
};

export default MaterialForm;
