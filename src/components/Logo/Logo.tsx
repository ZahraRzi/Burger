import React from "react";
import Style from "./Logo.module.scss";
import BurgerLogo from "../../assets/Images/BurgerLogo.png";

interface LogoProps {
  mode?: "rsp" | "default";
}

const Logo: React.FC<LogoProps> = (props): React.ReactElement => {
  const { mode } = props;
  return (
    <div className={[Style.Logo, Style[mode || "default"]].join(" ").trim()}>
      <img src={BurgerLogo} alt="Burger-Logo" />
    </div>
  );
};
Logo.defaultProps = {
  mode: "default",
};
export default Logo;
