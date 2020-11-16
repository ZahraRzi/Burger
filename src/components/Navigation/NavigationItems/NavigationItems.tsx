import React from "react";
import Style from "./NavigationItems.module.scss"
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const NavigationItems: React.FC = (): React.ReactElement => {
  return (
    <ul className={Style.NavigationItems}>
          <NavigationItem link="/" active>Burger Builder</NavigationItem>
          <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
