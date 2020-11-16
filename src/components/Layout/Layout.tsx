import React, { useState } from "react";
import Style from "./Layout.module.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout: React.FC = ({ children }): React.ReactElement => {
  const [showSideDrawer, setShowSideDrawer] = useState<boolean>(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };
  
  const drawerToggleClickedHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState;
    })
  }

  return (
    <>
      <Toolbar drawerToggleClicked={drawerToggleClickedHandler} />
      <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      <main className={Style.content}>{children}</main>
    </>
  );
};  

export default Layout;
