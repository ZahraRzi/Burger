import React from "react";
import Style from "./BuildControl.module.scss";

interface BuildControlProps {
  label: string;
  added: () => void;
  removed: () => void;
  disabled: any;
}

const BuildControl: React.FC<BuildControlProps> = (
  props
): React.ReactElement => {
  const { label, added, removed, disabled } = props;
  return (
    <div className={Style.BuildControl}>
      <div className={Style.Label}>{label}</div>
      <button className={Style.Less} onClick={removed} disabled={disabled}>
        less
      </button>
      <button className={Style.More} onClick={added}>
        more
      </button>
    </div>
  );
};

export default BuildControl;
