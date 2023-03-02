import "./Button.css";

const Button = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={`button ${props.className}`}
      onClick={props.onButtonClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
