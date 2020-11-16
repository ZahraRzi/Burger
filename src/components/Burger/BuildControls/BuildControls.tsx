import React from "react";
import Style from "./BuildControls.module.scss";
import BuildControl from "./BuildControl/BuildControl";

const Controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
interface BuildControlsProps {
  ingredientAdded: (type: string) => void;
  ingredientRemoved: (type: string) => void;
  disabled: any;
  price: number;
  purchasable: boolean;
  showModal: () => void;
}

const BuildControls: React.FC<BuildControlsProps> = (
  props
): React.ReactElement => {
  const {
    ingredientAdded,
    ingredientRemoved,
    disabled,
    price,
    purchasable,
    showModal,
  } = props;
  return (
    <div className={Style.BuildControls}>
      <p>
        current price: <strong>{price.toFixed(2)}</strong>
      </p>
      {Controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => ingredientAdded(ctrl.type)}
            removed={() => ingredientRemoved(ctrl.type)}
            disabled={disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={Style.OrderButton}
        disabled={purchasable}
        onClick={showModal}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
