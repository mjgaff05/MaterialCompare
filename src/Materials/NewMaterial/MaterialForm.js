import React, { useState } from "react";
import classes from "./MaterialForm.module.css";
import Button from "../../UI/Button";

const MaterialForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredFamily, setEnteredFamily] = useState("");
  const [enteredYield, setEnteredYield] = useState("");
  const [enteredTensile, setEnteredTensile] = useState("");
  const [enteredElongation, setEnteredElongation] = useState("");
  const [enteredDensity, setEnteredDensity] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const familyChangeHandler = (event) => {
    setEnteredFamily(event.target.value);
  };

  const yieldChangeHandler = (event) => {
    setEnteredYield(event.target.value);
  };

  const tensileChangeHandler = (event) => {
    setEnteredTensile(event.target.value);
  };

  const elongationChangeHandler = (event) => {
    setEnteredElongation(event.target.value);
  };

  const densityChangeHandler = (event) => {
    setEnteredDensity(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const key = `${enteredName[0]}${enteredFamily[0]}_${Math.random(0)} `;
    const material = {
      id: key,
      key: key,
      name: enteredName,
      family: enteredFamily,
      yield: enteredYield,
      tensile: enteredTensile,
      elongation: enteredElongation,
      density: enteredDensity,
    };
    console.log(material);
    props.onSubmitNew(material);

    setEnteredName("");
    setEnteredFamily("");
    setEnteredYield("");
    setEnteredTensile("");
    setEnteredElongation("");
    setEnteredDensity("");

    props.onCancelEdit();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["material-form"]}>
        <div className={classes["material-form__description"]}>
          Enter the material information below to add its properties to the
          database.
        </div>
        <div className={classes["material-form__input"]}>
          <label>Name</label>
          <input
            type="text"
            value={enteredName}
            onChange={nameChangeHandler}
          ></input>
        </div>
        <div className={classes["material-form__input"]}>
          <label>Family</label>
          <input
            type="text"
            value={enteredFamily}
            onChange={familyChangeHandler}
          ></input>
        </div>
        <div className={classes["material-form__input"]}>
          <label>Yield</label>
          <input
            type="number"
            value={enteredYield}
            onChange={yieldChangeHandler}
          ></input>
        </div>
        <div className={classes["material-form__input"]}>
          <label>Tensile</label>
          <input
            type="number"
            value={enteredTensile}
            onChange={tensileChangeHandler}
          ></input>
        </div>
        <div className={classes["material-form__input"]}>
          <label>Elongation</label>
          <input
            type="number"
            value={enteredElongation}
            onChange={elongationChangeHandler}
          ></input>
        </div>
        <div className={classes["material-form__input"]}>
          <label>Density</label>
          <input
            type="number"
            value={enteredDensity}
            onChange={densityChangeHandler}
          ></input>
        </div>
        <div className={classes["material-form__button"]}>
          <Button type="submit">Sumbit</Button>
          <Button onButtonClick={props.onCancelEdit}>Cancel</Button>
        </div>
      </div>
    </form>
  );
};

export default MaterialForm;
