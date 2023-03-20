const Input = (props) => {
  const editPropertyHandler = (event) => {
    props.onChange(event, props.label);
  }
  
  return (
    <div className={props.className}>
      <label>{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        onChange={editPropertyHandler}
      ></input>
    </div>
  );
};

export default Input;
