const Input = (props) => {
  return (
    <div className={props.className}>
      <label>{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      ></input>
    </div>
  );
};

export default Input;
