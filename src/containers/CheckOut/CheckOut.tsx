import React, { useEffect, useState } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const CheckOut: React.FC = (props): React.ReactElement => {
  // const { price } = props;
  // console.log(props);
  const ingredients: Record<string, number> = {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0,
  };
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  // console.log(match);

  const [displayIngredients, setDisplayIngredients] = useState(ingredients);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const ingredient: Record<string, number> = {};
    const query = new URLSearchParams(location.search);
    let price = 0;
    for (let param of query.entries()) {
      // console.log(param[0], param[1]);
      if (param[0] === "Price") {
        price = +param[1];
      } else {
        // ["salad", "1"]
        ingredient[param[0]] = +param[1];
      }
      console.log(ingredient);
    }
    setDisplayIngredients(ingredient);
    setPrice(price);
  }, []);

  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={displayIngredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
        path={match.url + "/contact-data"}
        // component={ContactData}
        render={() => (
          <ContactData ingredients={displayIngredients} price={price} />
        )}
      />
    </div>
  );
};
export default CheckOut;
