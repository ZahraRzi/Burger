import React from "react";
import Style from "./Button.module.scss";

interface ButtonProps {
  children: string;
  clicked?: () => void;
  btnType: string;
  type?: "submit" | "reset" | "button";
}

const Button: React.FC<ButtonProps> = (props): React.ReactElement => {
  const { clicked, children, btnType, ...otherProps } = props;
  return (
    <button
      className={[Style.Button, Style[btnType]].join(" ")}
      onClick={clicked}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default Button;
