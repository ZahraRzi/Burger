import React from "react";
import Logo from "../../Logo/Logo";
import Style from "./Toolbar.module.scss";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

interface ToolbarProps {
  drawerToggleClicked: () => void;
}
const Toolbar: React.FC<ToolbarProps> = (props): React.ReactElement => {
  const { drawerToggleClicked } = props;

  return (
    <header className={Style.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <Logo mode="default" />
      <nav className={Style.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
