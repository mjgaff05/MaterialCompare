import React, { useContext } from "react";
import Card from "../../UI/Card";
import Material from "./Material";
import MaterialsContext from "../../store/materials-context";

const MaterialList = (props) => {
  const materialsCtx = useContext(MaterialsContext);
  
    return <Card>{materialsCtx.materials.map((material, index) => <Material key={index} item={material} onEdit={props.onEdit}/>)}</Card>;
};

export default MaterialList;
