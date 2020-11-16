import React, { useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

type obj = Record<string, number>;
const INGREDIENT_PRICES: obj = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7,
};

const BurgerBuilder: React.FC = (props): React.ReactElement => {
  let ingredients = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  };

  const [ig, setIg] = useState<obj>(ingredients);
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    alert("You continue!");
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
        {memoOrder}
      </Modal>
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
};

export default BurgerBuilder;
