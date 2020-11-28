import React, { useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instance from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/withErrorHandler/withErrorHandler";
import { useHistory } from "react-router-dom";

type obj = Record<string, number>;
const INGREDIENT_PRICES: obj = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7,
};

const BurgerBuilder: React.FC = (props): React.ReactElement => {
  // let ingredients: obj;

  const [ig, setIg] = useState<obj>({ salad: 0, cheese: 0, bacon: 0, meat: 0 });
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // console.log(props);
    getIngredients();
  }, []);

  const getIngredients = async () => {
    try {
      let rsp = await instance.get("/ingredients.json");
      setIg(rsp.data);
    } catch {
      setError(true);
      // console.log(error);
    }
  };

  const addIngredientHandler = (type: string): void => {
    // console.log("this isss", ig[type]);
    const oldCount = ig[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ig,
    };
    // console.log(updatedIngredients);
    updatedIngredients[type] = updatedCount;
    // console.log(updatedIngredients[type]);
    setIg(updatedIngredients);
    // console.log(updatedIngredients);
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice(newPrice);
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = (type: string): void => {
    // console.log("this isss", ig[type]);
    // console.log(ig[type]);
    const oldCount = ig[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ig,
    };
    // console.log(updatedIngredients);
    updatedIngredients[type] = updatedCount;
    setIg(updatedIngredients);
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setTotalPrice(newPrice);
    updatePurchaseState(updatedIngredients);
  };

  const disabledInfo: Record<string, any> = {
    ...ig,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  // console.log(disabledInfo);

  const updatePurchaseState = (ingredients: obj) => {
    // TODO:skjdkdjwkdjkefnekd
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((total, item) => {
        return total + item;
      }, 0);
    // console.log(sum);
    if (sum > 0) {
      setPurchasable(true);
    } else {
      setPurchasable(false);
    }
  };

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const purchaseCancelHandler = () => {
    setShowModal(false);
  };

  const purchaseContinueHandler = () => {
    // setLoading(true);
    // const order = {
    //   ingredients: ig,
    //   price: totalPrice,
    //   customer: {
    //     name: "Zahra Rezaei",
    //     address: {
    //       street: "masile bakhtar",
    //       zipcode: "4489165968",
    //       country: "iran",
    //     },
    //     email: "zahra.1994rezaei@gmail.com",
    //   },
    //   deliveryMethod: "fastest",
    // };

    // instance
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     setLoading(false);
    //     setShowModal(false);
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     setShowModal(false);
    //   });
    const queryParams = [];
    let price = totalPrice;
    for (let i in ig) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(ig[i]));
    }
    queryParams.push("Price=" + price);

    const queryString = queryParams.join("&");
    // console.log(totalPrice);

    history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
    console.log(ig);
  };
  

  const memoOrder = React.useMemo(
    () => (
      <OrderSummary
        ingredients={ig}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={totalPrice}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showModal]
  );

  let orderSummary: JSX.Element = <p>nadari !!!!</p>;
  let burger = error ? <p>Ingredients cant be loaded!</p> : <Spinner />;
  if (ig) {
    burger = (
      <>
        <Burger ingredients={ig} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={!purchasable}
          showModal={showModalHandler}
        />
      </>
    );
    orderSummary = memoOrder;
  }
  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <>
      {/* <Modal show={showModal} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={ig}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={totalPrice}
        />
      </Modal> */}
      <Modal show={showModal} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, instance);
