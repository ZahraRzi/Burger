import React, { useState } from "react";
import Style from "./ContactData.module.scss";
import Button from "../../../components/UI/Button/Button";
import instance from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { useHistory } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

interface ContactDataProps {
  ingredients: { [key: string]: number };
  price: number;
}

const ContactData: React.FC<ContactDataProps> = (props): React.ReactElement => {
  const { ingredients, price } = props;
  // console.log(props);
  let formDataObj: Record<string, any> = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      label: "Enter Your name",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      valid: false,
      validation: {},
    },
  };
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // console.log(history);
  const [formData, setFormData] = useState(formDataObj);
  const [formIsValid, setFormIsValid] = useState(false);

  let formElementArray = [];
  for (let key in formData) {
    formElementArray.push({
      id: key,
      config: formData[key],
    });
  }

  const orderHandler = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const formFullData: Record<string, string> = {};
    for (let formElementIdentifier in formData) {
      formFullData[formElementIdentifier] =
        formData[formElementIdentifier].value;
    }
    const order = {
      ingredients: ingredients,
      price: price,
      orderData: formFullData,
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

  const inputChangeHandler = (event: any, inputIdentifier: string) => {
    const updatedFormDataObj = { ...formData };
    const updatedFormData = { ...updatedFormDataObj[inputIdentifier] };
    updatedFormData.value = event.target.value;
    updatedFormData.valid = checkValidity(
      updatedFormData.value,
      updatedFormData.validation
    );
    updatedFormData.touched = true;
    updatedFormDataObj[inputIdentifier] = updatedFormData;
    console.log(updatedFormData);

    let formIsValid = true;

    formIsValid = updatedFormData.valid;

    console.log(updatedFormData.valid);
    setFormData(updatedFormDataObj);
    setFormIsValid(formIsValid);
  };

  const checkValidity = (value: string, rules: any) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.minLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  let form = (
    <form onSubmit={orderHandler}>
      {formElementArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
            changed={(event) => inputChangeHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        );
      })}
      <Button type="submit" btnType="Success" disabled={formIsValid}>
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
