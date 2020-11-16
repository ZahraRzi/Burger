import React from "react";
import Style from "./NavigationItem.module.scss";

interface NavigationItemProps {
    children: React.ReactNode;
    link: string;
    active?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = (
  props
): React.ReactElement => {
  const { children, link, active } = props;
  return (
    <li className={Style.NavigationItem}>
      <a href={link} className={active ? Style.active : " "}>{children}</a>
    </li>
  );
};

export default NavigationItem;
