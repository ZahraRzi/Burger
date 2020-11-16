import React from "react";
import Style from "./Button.module.scss";

interface ButtonProps {
    children: string;
    clicked: () => void;
    btnType: string;
}

const Button: React.FC<ButtonProps> = (props): React.ReactElement => {
    const {clicked, children, btnType} = props
    return (
        <button className={[Style.Button, Style[btnType]].join(' ')} onClick={clicked}>{children}</button>
    )
}
export default Button;