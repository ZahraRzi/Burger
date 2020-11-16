import React from "react";
import Style from "./DrawerToggle.module.scss";

interface DrawerToggleProps {
  clicked: () => void;
}
const DrawerToggle: React.FC<DrawerToggleProps> = (
  props
): React.ReactElement => {
  const { clicked } = props;
  return (
    <div className={Style.DrawerToggle} onClick={clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
