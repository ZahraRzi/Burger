import React from "react";
import Style from "./Burger.module.scss";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface BurgerProps extends RouteComponentProps {
  style?: React.CSSProperties;
  ingredients: { [key: string]: number };
}
const Burger: React.FC<BurgerProps> = (props): React.ReactElement => {
  const { ingredients, style } = props;
  // console.log(props);

  let transformedIngredients = Object.keys(ingredients)
    .map((igkey) => {
      // console.log([...Array(ingredients[igkey])]);
      return [...Array(ingredients[igkey])].map((_: any, i: number) => {
        return <BurgerIngredient key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  // console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = [<p key="0">Please select some ingredients!</p>];
  }
  return (
    <div className={Style.Burger} style={style}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
