import React from "react";
import Style from "./NavigationItems.module.scss";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const NavigationItems: React.FC = (): React.ReactElement => {
  return (
    <ul className={Style.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
};
export default NavigationItems;
