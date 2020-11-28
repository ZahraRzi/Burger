import React from "react";
import { NavLink } from "react-router-dom";
import Style from "./NavigationItem.module.scss";

interface NavigationItemProps {
    children: React.ReactNode;
  link: string;
  exact?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = (
  props
): React.ReactElement => {
  const { children, link ,exact } = props;
  return (
    <li className={Style.NavigationItem}>
      <NavLink to={link} activeClassName={Style.active} exact = {exact}>{children}</NavLink>
      {/* className={active ? Style.active : " "} ==> NavLink automatically adds active class */}
    </li>
  );
};

export default NavigationItem;
