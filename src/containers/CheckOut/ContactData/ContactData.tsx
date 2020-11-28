import React, { useState } from "react";
import Style from "./ContactData.module.scss";
import Button from "../../../components/UI/Button/Button";
import instance from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { useHistory } from "react-router-dom";

interface ContactDataProps {
  ingredients: { [key: string]: number };
  price: number;
}

const ContactData: React.FC<ContactDataProps> = (props): React.ReactElement => {
  const { ingredients, price } = props;
  console.log(props);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  console.log(history);

  //   const form = {
  //     name: "",
  //     email: "",
  //     address: {
  //       street: "",
  //       postalCode: "",
  //     },
  //   };

  const submitHandler = (event: any) => {
    event.preventDefault();
  };

  const orderHandler = () => {
    // console.log(orderHandler)
    const order = {
      ingredients: ingredients,
      price: price,
      customer: {
        name: "Zahra Rezaei",
        address: {
          street: "masile bakhtar",
          zipcode: "4489165968",
          country: "iran",
        },
        email: "zahra.1994rezaei@gmail.com",
      },
      deliveryMethod: "fastest",
    };

    instance
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        history.push("/");
        // setShowModal(false);
        // console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        // setShowModal(false);
      });
  };

  let form = (
    <form onSubmit={submitHandler}>
      <input type="text" name="name" placeholder="Your Name" />
      <input type="email" name="email" placeholder="Your E-mail" />
      <input type="text" name="street" placeholder="Your Street" />
      <input type="text" name="postal" placeholder="Your Postal Code" />
      <Button type="submit" btnType="Success" clicked={orderHandler}>
        Order
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={Style.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};

export default ContactData;
