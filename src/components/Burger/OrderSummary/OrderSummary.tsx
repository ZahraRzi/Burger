import React from "react";
import Button from "../../UI/Button/Button";

interface OrderSummaryProps {
  ingredients: Record<string, number>;
  purchaseCancelled: () => void;
    purchaseContinued: () => void;
    price: number;
}
const OrderSummary: React.FC<OrderSummaryProps> = (
  props
): React.ReactElement => {

  const { ingredients, purchaseCancelled, purchaseContinued, price } = props;
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
        {ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>a delicious burger with the following ingredients:</p>
          <ul>{ingredientSummary}</ul>
          <p><strong>Total Price:{price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
