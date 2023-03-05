import React from "react";

import classes from "./Materials.module.css";

import NewMaterial from "./NewMaterial/NewMaterial";
import EditMaterial from "./EditMaterial/EditMaterial";

const Materials = (props) => {
  return (
    <div className={classes.materials}>
      <NewMaterial onSubmitNew={props.newMaterialHandler} />
      <EditMaterial />
    </div>
  );
};

export default Materials;
