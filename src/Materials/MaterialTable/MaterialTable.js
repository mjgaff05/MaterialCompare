import { useState, useContext, useEffect } from "react";
import classes from "./MaterialTable.module.css";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import MaterialsContext from "../../store/materials-context";

const MaterialTable = () => {
  const materialsCtx = useContext(MaterialsContext);
  const matArray = materialsCtx.materials.map((material) => {
    const propData = material.data;
    const propDatas = materialsCtx.properties.reduce((obj, property) => {
      return { ...obj, [property]: propData[property] };
    }, {});
    return {
      id: material.id,
      name: material.name,
      family: material.family,
      ...propDatas,
    };
  });
  console.log(matArray);

  const initialRows = [...matArray];

  // useEffect(() => {
  //   setRows(initialRows);
  // }, [initialRows]);
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    materialsCtx.removeMaterial(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    const editedMaterial = Object.entries(updatedRow).reduce(
      (object, value) => {
        if (value[0] === "name" || value[0] === "family" || value[0] === "id") {
          object[value[0]] = value[1];
        } else if (value[0] !== "isNew") {
          if (object["data"]) {
            object["data"][value[0]] = value[1];
          } else {
            object["data"] = {};
            object["data"][value[1]] = value[0];
          }
        }

        return object;
      },
      {}
    );
    materialsCtx.editMaterial(editedMaterial);
    console.log(editedMaterial);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const colArray = materialsCtx.properties.map((property, index) => {
    return {
      field: `${property}`,
      headerName: property,
      width: 150,
      editable: true,
    };
  });
  //console.log(colArray);

  const columns = [
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "family", headerName: "Family", width: 150, editable: true },
    ...colArray,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const dataRefreshHandler = () => {
    setRows(initialRows);
  };

  return (
    <div
      className={classes["material-table"]}
      style={{ height: 300, width: "90%" }}
    >
      <Button startIcon={<AutorenewOutlinedIcon />} color="button" variant="contained" onClick={dataRefreshHandler} className={classes["material-table__Button"]}>
          Refresh
        </Button>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // slots={{
          //   toolbar: EditToolbar,
          // }}
          // slotProps={{
          //   toolbar: { setRows, setRowModesModel },
          // }}
        />
      </Box>
    </div>
  );
};

export default MaterialTable;
