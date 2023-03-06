import React, { useState } from "react";

import MaterialsProvider from "./store/MaterialsProvider";
import MaterialSelector from "./MaterialSelector/MaterialSelector";
import Materials from "./Materials/Materials";

const App = () => {

  return (
    <MaterialsProvider>
      <Materials />
      <MaterialSelector/>
    </MaterialsProvider>
  );
};

export default App;
