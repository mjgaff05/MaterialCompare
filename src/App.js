import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import MaterialsProvider from "./store/MaterialsProvider";
import MaterialSelector from "./MaterialSelector/MaterialSelector";
import NewMaterial from "./Materials/NewMaterial/NewMaterial";
import MaterialTable from "./Materials/MaterialTable/MaterialTable";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7d9d9c',
      darker: '#576f72',
    },
    neutral: {
      main: '#F0EBE3',
      contrastText: '#E4DCCF',
    },
    button: {
      main: '#f0ebe3',
      contrastText:'#7d9d9c'
    }
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <MaterialsProvider>
        <NewMaterial />
        <MaterialSelector />
        <MaterialTable />
      </MaterialsProvider>
    </ThemeProvider>
  );
};

export default App;
