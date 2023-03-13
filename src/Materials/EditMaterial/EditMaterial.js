import React, { useState, Fragment } from "react";
import classes from "./EditMaterial.module.css";

import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

import MaterialList from "./MaterialList";
import EditMaterialForm from "./EditMaterialForm";

const EditMaterial = () => {
  const [displayMaterials, setDisplayMaterials] = useState(false);
  const [selectedMaterialID, setSelectedMaterialID] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const displayMatsHandler = () => {
    setDisplayMaterials(true);
  };

  const hideMatsHandler = () => {
    setDisplayMaterials(false);
  };

  const editHandler = (id) => {
    setIsEditing(true);
    setDisplayMaterials(false);
    setSelectedMaterialID(id);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    setDisplayMaterials(true);
  };

  return (
    <Fragment>
      <Button onButtonClick={displayMatsHandler}>Edit Material Data</Button>
      {displayMaterials && !isEditing && (
        <Modal onHide={hideMatsHandler}>
          <MaterialList onEdit={editHandler} onCancelEdit={cancelEditHandler} />
        </Modal>
      )}
      {isEditing && (
        <Modal onHide={cancelEditHandler}>
          <EditMaterialForm onHide={cancelEditHandler} matID={selectedMaterialID}/>
        </Modal>
      )}
    </Fragment>
  );
};

export default EditMaterial;
