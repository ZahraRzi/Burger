import React from "react";
import Style from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";

interface ModalProps {
  children: JSX.Element;
  show: boolean;
  modalClosed: () => void;
}

const Modal: React.FC<ModalProps> = (props): React.ReactElement => {
  const { children, show, modalClosed } = props;

  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={[Style.Modal, show ? Style.showModal : Style.hideModal]
          .join(" ")
          .trim()}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
