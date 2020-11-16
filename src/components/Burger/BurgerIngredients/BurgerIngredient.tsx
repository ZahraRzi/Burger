import React from "react";
import Style from "../BurgerIngredients/BurgerIngredient.module.scss";

interface BurgerIngerdientProps {
  type: string;
}
const BurgerIngerdient: React.FC<BurgerIngerdientProps> = (
  props
): React.ReactElement => {
  const { type } = props;
  let ingredient;

  switch (type) {
    case "bread-bottom":
      ingredient = <div className={Style.BreadBottom} />;
      break;
    case "bread-top":
      ingredient = (
        <div className={Style.BreadTop}>
          <div className={Style.Seeds1} />
          <div className={Style.Seeds2} />
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={Style.Meat} />;
      break;
    case "cheese":
      ingredient = <div className={Style.Cheese} />;
      break;
    case "salad":
      ingredient = <div className={Style.Salad} />;
      break;
    case "bacon":
      ingredient = <div className={Style.Bacon} />;
      break;
    default:
      ingredient = <></>;
  }
  return ingredient;
};

export default BurgerIngerdient;
