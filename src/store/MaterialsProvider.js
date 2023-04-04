import { useEffect, useReducer, useState, useCallback } from "react";

import MaterialsContext from "./materials-context";

const defaultMaterialsState = {
  materials: [],
  properties: [],
  families: [],
};

async function addMaterialHandler(material) {
  console.log(material);
  const response = await fetch(
    "https://materialcompare-default-rtdb.firebaseio.com/materials.json",
    {
      method: "POST",
      body: JSON.stringify(material),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
}

async function deleteMaterialHandler(key) {
  const destination =
    "https://materialcompare-default-rtdb.firebaseio.com/materials/" + key;
  console.log(destination);

  const response = await fetch(destination, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
}

const materialsReducer = (state, action) => {
  if (action.type === "LOAD") {
    console.log(action.dataset);
    const updatedMaterials = action.dataset;
    const updatedProperties = Array.from(
      new Set(
        action.dataset.map((material) => Object.keys(material.data)).flat()
      )
    );
    const updatedFamilies = Array.from(
      new Set(action.dataset.map((material) => material.family))
    );

    return {
      materials: updatedMaterials,
      properties: updatedProperties,
      families: updatedFamilies,
    };
  }

  if (action.type === "ADD") {
    const updatedMaterials = state.materials.concat(action.material);
    addMaterialHandler(action.material);

    const familyArray = state.families;
    const updatedFamilies = familyArray.includes(action.material.family)
      ? familyArray
      : [...familyArray, action.material.family];

    const propertyArray = state.properties;
    const matProperties = Object.keys(action.material.data);
    const updatedProperties = Array.from(
      new Set([...propertyArray, ...matProperties])
    );

    return {
      materials: updatedMaterials,
      properties: updatedProperties,
      families: updatedFamilies,
    };
  }
  if (action.type === "EDIT") {
    const someMaterials = state.materials.filter(
      (material) => material.id !== action.material.id
    );
    const updatedMaterials = someMaterials.concat(action.material);
    return {
      materials: updatedMaterials,
      properties: state.properties,
      families: state.families,
    };
  }
  if (action.type === "REMOVE") {
    const [removed] = state.materials.filter(
      (material) => material.id === action.id
    );
    console.log(removed);
    const updatedMaterials = state.materials.filter(
      (material) => material.key !== action.key
    );
    //deleteMaterialHandler(removed.key);
    return {
      materials: updatedMaterials,
      properties: state.properties,
      families: state.families,
    };
  }
  return defaultMaterialsState;
};

const MaterialsProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [materials, setMaterials] = useState([]);

  const fetchMaterialsHandler = useCallback(async () => {
    console.log("Getting materials from database...");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://materialcompare-default-rtdb.firebaseio.com/materials.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      let matArray = [];
      for (const key in data) {
        matArray.push({ key: key, ...data[key] });
      }
      console.log(matArray);
      setMaterials(matArray);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMaterialsHandler();
  }, [fetchMaterialsHandler]);

  useEffect(() => {
    dispatchMaterialsAction({ type: "LOAD", dataset: materials });
  }, [materials]);

  const [materialsState, dispatchMaterialsAction] = useReducer(
    materialsReducer,
    defaultMaterialsState
  );

  const addMaterialHandler = (material) => {
    dispatchMaterialsAction({ type: "ADD", material: material });
  };

  const editMaterialHandler = (material) => {
    dispatchMaterialsAction({ type: "EDIT", material: material });
  };

  const removeMaterialHandler = (id) => {
    dispatchMaterialsAction({ type: "REMOVE", id: id });
  };

  const materialsContext = {
    materials: materialsState.materials,
    properties: materialsState.properties,
    families: materialsState.families,
    addMaterial: addMaterialHandler,
    editMaterial: editMaterialHandler,
    removeMaterial: removeMaterialHandler,
  };
  return (
    <MaterialsContext.Provider value={materialsContext}>
      {props.children}
    </MaterialsContext.Provider>
  );
};

export default MaterialsProvider;
