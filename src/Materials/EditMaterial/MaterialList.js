import React, { useContext } from "react";
import Card from "../../UI/Card";
import Material from "./Material";
import MaterialsContext from "../../store/materials-context";

const MaterialList = () => {
  const materialsCtx = useContext(MaterialsContext);
  
    return <Card>{materialsCtx.materials.map(material => <Material item={material}/>)}</Card>;
};

export default MaterialList;
