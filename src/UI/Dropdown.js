import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
  const selectionHandler = (event) => {
    props.onSelect(event.target.value);
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes["dropdown__control"]}>
        <label>{props.label}</label>
        <select value={props.selected} onChange={selectionHandler}>
          <option key="" value="">Choose an option</option>
          {props.list.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
