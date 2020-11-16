import React from "react";
import Style from "./Burger.module.scss";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

interface BurgerProps {
  ingredients: { [key: string]: number };
}
const Burger: React.FC<BurgerProps> = (props): React.ReactElement => {
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients)
    .map((igkey) => {
      //   console.log(
      //     "sdsd",
      //     ingredients[igkey],
      //     Array(ingredients[igkey]),
      //     [Array(ingredients[igkey])],
      //     [...Array(ingredients[igkey])]
      //   );
      return [...Array(ingredients[igkey])].map((_: any, i: number) => {
        return <BurgerIngredient key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  // console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = [<p>Please select some ingredients!</p>];
  }
  return (
    <div className={Style.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}  
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
