import React, { useState, Fragment } from "react";
import classes from "./EditMaterial.module.css";

import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

import MaterialList from "./MaterialList";

const EditMaterial = () => {
  const [isEditing, setIsEditing] = useState(false);

  const editHandler = () => {
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  return (
    <Fragment>
      <Button onButtonClick={editHandler}>Edit Material Data</Button>
      {isEditing && <Modal onHide={cancelEditHandler}><MaterialList /></Modal>}
    </Fragment>
  );
};

export default EditMaterial;
