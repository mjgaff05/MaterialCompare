import { useReducer } from "react";

import MaterialsContext from "./materials-context";

const DUMMY_DATA_MAT = [
  {
    id: "a1_01",
    key: "a1_01",
    name: "1100",
    family: "Aluminum",
    yield: 3.5,
    tensile: 11,
    elongation: 30,
    density: 0.098,
  },
  {
    key: "a6_01",
    id: "a6_01",
    name: "6061",
    family: "Aluminum",
    yield: 8,
    tensile: 18,
    elongation: 26,
    density: 0.098,
  },
  {
    id: "a4_01",
    key: "a4_01",
    name: "4130 Alloy Steel",
    family: "Alloy Steel",
    yield: 70,
    tensile: 90,
    elongation: 20,
    density: 0.283,
  },
  {
    id: "aa_01",
    key: "aa_01",
    name: "ASTM A514",
    family: "Alloy Steel",
    yield: 100,
    tensile: 110,
    elongation: 18,
    density: 0.283,
  },
  {
    id: "ah_01",
    key: "ah_01",
    name: "HY-80",
    family: "Alloy Steel",
    yield: 80,
    tensile: 80,
    elongation: 18,
    density: 0.28,
  },
  {
    id: "ca_01",
    key: "ca_01",
    name: "AISI 1020",
    family: "Carbon Steel",
    yield: 32,
    tensile: 50,
    elongation: 25,
    density: 0.283,
  },
  {
    id: "ca_02",
    key: "ca_02",
    name: "ASTM A516",
    family: "Carbon Steel",
    yield: 38,
    tensile: 70,
    elongation: 17,
    density: 0.283,
  },
  {
    id: "sa_01",
    key: "sa_01",
    name: "AISI 316",
    family: "Stainless Steel",
    yield: 30,
    tensile: 75,
    elongation: 40,
    density: 0.289,
  },
  {
    id: "sa_02",
    key: "sa_02",
    name: "AISI 405",
    family: "Stainless Steel",
    yield: 25,
    tensile: 60,
    elongation: 20,
    density: 0.282,
  },
  {
    id: "s1_01",
    key: "s1_01",
    name: "17-4PH",
    family: "Stainless Steel",
    yield: 170,
    tensile: 190,
    elongation: 10,
    density: 0.282,
  },
];

const defaultMaterialsState = {
  materials: DUMMY_DATA_MAT,
};

const materialsReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedMaterials = state.materials.concat(action.material);
    return { materials: updatedMaterials };
  }
  if (action.type === "EDIT") {
  }
  if (action.type === "REMOVE") {
    const updatedMaterials = state.materials.filter(
      (material) => material.id !== action.id
    );
    return { materials: updatedMaterials };
  }
  return defaultMaterialsState;
};

const MaterialsProvider = (props) => {
  const [materialsState, dispatchMaterialsAction] = useReducer(
    materialsReducer,
    defaultMaterialsState
  );

  const addMaterialHandler = (material) => {
    dispatchMaterialsAction({ type: "ADD", material: material });
  };

  const editMaterialHandler = (id) => {
    dispatchMaterialsAction({ type: "EDIT", id: id });
  };

  const removeMaterialHandler = (id) => {
    dispatchMaterialsAction({ type: "REMOVE", id: id });
  };

  const materialsContext = {
    materials: materialsState.materials,
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
