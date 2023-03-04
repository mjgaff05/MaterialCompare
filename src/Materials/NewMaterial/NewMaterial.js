import React, { useState } from "react";
import "./NewMaterial.css";
import Button from "../../UI/Button";
import MaterialForm from "./MaterialForm";
import Modal from "../../UI/Modal";

const NewMaterial = (props) => {
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const editNewHandler = () => {
    setIsEditingNew(true);
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const cancelNewHandler = () => {
    setIsEditingNew(false);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  const newMaterialHandler = (material) => {
    props.onSubmitNew(material);
  };

  return (
    <div className="new-material">
      <div className="new-material__control">
        <div className="new-material__newButton">
          <Button onButtonClick={editNewHandler}>New Material</Button>
        </div>
        <div className="new-material__editButton">
          <Button onButtonClick={editHandler}>Edit Material Data</Button>
        </div>
      </div>
      {isEditingNew && (
        <Modal onHide={cancelNewHandler}>
          <div className="new-material__form">
            <MaterialForm
              onSubmitNew={newMaterialHandler}
              onCancelEdit={cancelNewHandler}
            />
          </div>
        </Modal>
      )}
      {isEditing && (
        <Modal onHide={cancelEditHandler}>
          <div className="new-material__form">
            <MaterialForm
              onCancelEdit={cancelEditHandler}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewMaterial;
