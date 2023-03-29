import classes from "./Dropdown.module.css";
import { Select , InputLabel, MenuItem} from "@mui/material";

const Dropdown = (props) => {
  const selectionHandler = (event) => {
    props.onSelect(event.target.value);
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes["dropdown__control"]}>
        <InputLabel>{props.label}</InputLabel>
        <Select color="button" label={props.selected} value={props.selected} onChange={selectionHandler}>
          <MenuItem key="" value="">Choose an option</MenuItem>
          {props.list.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Dropdown;
