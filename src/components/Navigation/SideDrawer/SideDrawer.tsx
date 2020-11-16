import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Style from "./SideDrawer.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";

interface SideDrawerProps {
  closed: () => void;
  open: boolean;
}
const SideDrawer: React.FC<SideDrawerProps> = (props): React.ReactElement => {
  const { closed, open } = props;
  let attachedClasses = [Style.SideDrawer, Style.Close];
  if (open) {
    attachedClasses = [Style.SideDrawer, Style.Open];
  }
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo mode='rsp' />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
