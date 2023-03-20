import React from "react";

const MaterialsContext = React.createContext({
  materials: [],
  addMaterial: (material) => {},
  editMaterial: (material) => {},
  removeMaterial: (id) => {},
});

export default MaterialsContext;
