import MaterialSelector from "./MaterialSelector/MaterialSelector";
import NewMaterial from "./Materials/NewMaterial/NewMaterial";
import React , {useState} from 'react';

const DUMMY_DATA = [
  { name: "1100", family: "Aluminum", yield: 3.5, tensile: 11, elongation: 30, density: 0.098 },
  { name: "6061", family: "Aluminum", yield: 8, tensile: 18, elongation: 26, density: 0.098 },
  { name: "4130 Alloy Steel", family: "Alloy Steel", yield: 70, tensile: 90, elongation: 20, density: 0.283 },
  { name: "ASTM A514", family: "Alloy Steel", yield: 100, tensile: 110, elongation: 18, density: 0.283 },
  { name: "HY-80", family: "Alloy Steel", yield: 80, tensile: 80, elongation: 18, density: 0.280 },
  { name: "AISI 1020", family: "Carbon Steel", yield: 32, tensile: 50, elongation: 25, density: 0.283 },
  { name: "ASTM A516", family: "Carbon Steel", yield: 38, tensile: 70, elongation: 17, density: 0.283 },
  { name: "AISI 316", family: "Stainless Steel", yield: 30, tensile: 75, elongation: 40, density: 0.289 },
  { name: "AISI 405", family: "Stainless Steel", yield: 25, tensile: 60, elongation: 20, density: 0.282 },
  { name: "17-4PH", family: "Stainless Steel", yield: 170, tensile: 190, elongation: 10, density: 0.282 },
  
];

const App = () => {
  const [matData, setMatData] = useState(DUMMY_DATA);
  
  const newMaterialHandler = (newMaterial) => {
    console.log(newMaterial);
    setMatData(prevData => [newMaterial, ...prevData]);
  }
  
  return (
    <div>
      <NewMaterial onSubmitNew={newMaterialHandler}/>
      <MaterialSelector data={matData}/>
    </div>
  );
};

export default App;
