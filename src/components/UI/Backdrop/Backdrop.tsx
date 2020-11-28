import React from "react";
import Style from "./Backdrop.module.scss";

interface BackdropProps {
    show: boolean | null;
    clicked?: () => void;
}

const Backdrop:React.FC<BackdropProps> = (props):React.ReactElement => {

    const { show, clicked } = props;
    
    return (
      <>
        {show ? <div className={Style.Backdrop} onClick={clicked}></div> : null}
      </>
    );
}

export default Backdrop;