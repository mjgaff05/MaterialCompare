import React, { useState } from "react";
import "./NewMaterial.css";
import Button from "../UI/Button";
import MaterialForm from "./MaterialForm";

const NewMaterial = (props) => {
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const editNewHandler = () => {
    setIsEditingNew(true);
  };

  const editHandler = () => {
    setIsEditing(false);
  };

  const cancelNewHandler = () => {
    setIsEditingNew(false);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  const newMaterialHandler = (material) => {
    props.onSubmitNew(material);
  }

  return (
    <div className="new-material">
      {!isEditingNew && !isEditing && (
        <div className="new-material__control">
          <div className="new-material__newButton">
            <Button onButtonClick={editNewHandler}>New Material</Button>
          </div>
          <div className="new-material__editButton">
            <Button onButtonClick={editHandler}>Edit Material Data</Button>
          </div>
        </div>
      )}
      {isEditingNew && <div className="new-material__form"><MaterialForm onSubmitNew={newMaterialHandler} onCancelEdit={cancelNewHandler} /></div>}
    </div>
  );
};

export default NewMaterial;
