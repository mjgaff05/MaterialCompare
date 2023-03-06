import React from "react";

const MaterialsContext = React.createContext({
  materials: [],
  addMaterial: (material) => {},
  editMaterial: (id) => {},
  removeMaterial: (id) => {},
});

export default MaterialsContext;
