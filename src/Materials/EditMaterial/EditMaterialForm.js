import { useContext, useState } from "react";

import Input from "../../UI/Input";

import MaterialsContext from "../../store/materials-context";

const EditMaterialForm = (props) => {
  const materialCtx = useContext(MaterialsContext);
  const [material, setMaterial] = useState(
    materialCtx.materials.find((material) => material.id === props.matID)
  );

  const propNames = Object.keys(material);
  const propValues = Object.values(material);

  const changeHandler = (event, property) => {
    setMaterial((prev) => ({ ...prev, [property]: event.target.value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    materialCtx.editMaterial(material);
    props.onHide();
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        {material.name}

        {propNames.map(
          (property, index) =>
            property !== "key" &&
            property !== "id" && (
              <Input
                key={index}
                label={property}
                value={propValues[index]}
                type={typeof propValues[index]}
                onChange={changeHandler}
              >
                {property}
              </Input>
            )
        )}
      </div>

      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={props.onHide}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMaterialForm;
