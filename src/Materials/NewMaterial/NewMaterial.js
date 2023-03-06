import React, { useState, Fragment, useContext } from "react";

import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

import classes from "./NewMaterial.module.css";
import MaterialForm from "./MaterialForm";
import MaterialsContext from "../../store/materials-context";

const NewMaterial = (props) => {
  const [isEditingNew, setIsEditingNew] = useState(false);

  const materialsCtx = useContext(MaterialsContext);

  const editNewHandler = () => {
    setIsEditingNew(true);
  };

  const cancelNewHandler = () => {
    setIsEditingNew(false);
  };

  const newMaterialHandler = (material) => {
    //props.onSubmitNew(material);
    materialsCtx.addMaterial(material);
  };

  return (
    <Fragment>
      <Button onButtonClick={editNewHandler}>New Material</Button>
      {isEditingNew && (
        <Modal onHide={cancelNewHandler}>
          <div className={classes["new-material__form"]}>
            <MaterialForm
              onSubmitNew={newMaterialHandler}
              onCancelEdit={cancelNewHandler}
            />
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default NewMaterial;
