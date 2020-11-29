import React from "react";
import Style from "./Input.module.scss";

type InputTypeProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    elementType: string;
    label?: string;
    value?: string;
    elementConfig: { [key: string]: any };
    changed: (
      event: React.ChangeEvent<HTMLInputElement> &
        React.ChangeEvent<HTMLTextAreaElement> &
        React.ChangeEvent<HTMLSelectElement>
    ) => void;
    invalid: boolean;
    shouldValidate: boolean;
    touched: boolean;
  };
const Input: React.FC<InputTypeProps> = (props): React.ReactElement => {
  const {
    invalid,
    shouldValidate,
    touched,
    elementType,
    label,
    value,
    changed,
    elementConfig,
  } = props;
//   console.log(elementConfig);
  const inputClasses = [Style.InputElement];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(Style.Invalid);
  }

  let inputElement;
  switch (elementType) {
    case "Input":
      inputElement = (
        <input
          {...elementConfig}
          className={inputClasses.join(" ")}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "Textarea":
      inputElement = (
        <textarea
          {...elementConfig}
          className={inputClasses.join(" ")}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(
            (option: { value: string; displayValue: string }) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            )
          )}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...elementConfig}
          className={inputClasses.join(" ")}
          value={value}
          onChange={changed}
        />
      );
  }

  return (
    <div className={Style.Input}>
      <label className={Style.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
