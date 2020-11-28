import React from "react";
import Style from "./Order.module.scss";
interface OrderProps {
  price: number;
  ingredients?: Record<string, number>;
}

const Order: React.FC<OrderProps> = (props): React.ReactElement => {
  const { price, ingredients } = props;

  const igs = [];
  for (let ingredientName in ingredients) {
    igs.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  const ingredientsOutput = igs.map((ig) => {
    return (
      <span className={Style.Span} key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={Style.Order}>
      <p>ingredients : {ingredientsOutput}</p>
      <p>
        Price : <strong>USD {price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
