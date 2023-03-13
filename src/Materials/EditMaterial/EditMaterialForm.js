import { useContext } from "react";

import Input from "../../UI/Input";

import MaterialsContext from "../../store/materials-context";

const EditMaterialForm = (props) => {
  const materialCtx = useContext(MaterialsContext);
  const id = props.matID;
  const sel = materialCtx.materials.find((material) => material.id === id);
  const propNames = Object.keys(sel);
  const propValues = Object.values(sel);
  return (
    <div>
      {sel.name}
      <button onClick={props.onHide}>Back</button>
      {propNames.map((prop, index) => <Input label={prop} value={propValues[index]} type="string">{prop}</Input>)}
      
    </div>
  );
};

export default EditMaterialForm;
