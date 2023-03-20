import React, { useContext } from "react";
import Card from "../../UI/Card";
import Material from "./Material";
import MaterialsContext from "../../store/materials-context";

const MaterialList = (props) => {
  const materialsCtx = useContext(MaterialsContext);
  const sortedMaterials = materialsCtx.materials.sort((a, b) => {
    const aSummary = `${a.family} ${a.name}`;
    const bSummary = `${b.family} ${b.name}`;
    return aSummary.localeCompare(bSummary);
  });

  return (
    <Card>
      {sortedMaterials.map((material, index) => (
        <Material key={index} item={material} onEdit={props.onEdit} />
      ))}
      <button type="button" onClick={props.onHide}>
        Cancel
      </button>
    </Card>
  );
};

export default MaterialList;
