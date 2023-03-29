import React from "react";

const MaterialsContext = React.createContext({
  materials: [],
  properties: [],
  families: [],
  addMaterial: (material) => {},
  editMaterial: (material) => {},
  removeMaterial: (id) => {},
});

export default MaterialsContext;
