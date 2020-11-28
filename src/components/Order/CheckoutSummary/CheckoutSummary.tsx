import React from "react";
import Burger from "../../Burger/Burger";
import Style from "./CheckoutSummary.module.scss";
import Button from "../../UI/Button/Button";

interface CheckoutSummaryProps {
  ingredients: { [key: string]: number };
  checkoutCancelled: () => void;
  checkoutContinued: () => void;
}
const CheckoutSummary: React.FC<CheckoutSummaryProps> = (
  props
): React.ReactElement => {
  const { ingredients, checkoutCancelled, checkoutContinued } = props;
  return (
    <div className={Style.CheckoutSummary}>
      <h1>We hope it taste well!!</h1>
      <div>
        <Burger style={{ width: "100%" }} ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
