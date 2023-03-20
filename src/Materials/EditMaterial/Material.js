import React, { useContext } from "react";

import Card from "../../UI/Card";
import Button from "../../UI/Button";

import MaterialsContext from "../../store/materials-context";

const Material = (props) => {
  const materialsCtx = useContext(MaterialsContext);

  const clickHandler = () => {
    materialsCtx.removeMaterial(props.item.id);
  };
  const editHandler = () => props.onEdit(props.item.id);

  return (
    <Card>
      {`${props.item.name} - ${props.item.family}`}

      <div>
        <button onClick={editHandler}>Edit</button>
        <button onClick={clickHandler}>Delete</button>
      </div>
    </Card>
  );
};

export default Material;
