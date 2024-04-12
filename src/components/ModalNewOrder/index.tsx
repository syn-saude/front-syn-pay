import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import { IDetailProps } from "@/pages/dashboard";

interface ImodalNewOrderProps {
  onRequestClose: () => void;
  idOrderEdit?: string;
  isEdit?: boolean;
  orderDetailsEdit?: IDetailProps[];
}

export default function ModalNewOrder({
  onRequestClose,
  idOrderEdit,
  isEdit,
  orderDetailsEdit,
}: ImodalNewOrderProps) {
  const [orderId, setOrderId] = useState("");
  const [stepOne, setStepOne] = useState(isEdit ? false : true);
  const [stepTwo, setStepTwo] = useState(isEdit ? true : false);

  // console.log(orderDetailsEdit);
  function handleActivateStepOne() {
    setStepOne(true);
    setStepTwo(false);
  }

  function handleActivateStepTwo() {
    setStepOne(false);
    setStepTwo(true);
  }

  function handleSuccess() {
    if (stepOne) {
      setStepOne(false);
      setStepTwo(true);
    } else {
      setStepOne(false);
      setStepTwo(false);
      onRequestClose();
    }
  }
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.btnContent}>
          <button
            className={stepOne ? styles.activeButton : ""}
            onClick={handleActivateStepOne}
          >
            Criar Ordem
          </button>
          <button
            className={stepTwo ? styles.activeButton : ""}
            onClick={handleActivateStepTwo}
          >
            Adicionar item a ordem
          </button>
        </div>

        {stepOne && (
          <StepOne
            issameSuccess={() => handleSuccess()}
            onOrderIdReceived={setOrderId}
          />
        )}

        {stepTwo && (
          <>
            {isEdit ? (
              <StepTwo
                issameSuccess={() => handleSuccess()}
                orderId={idOrderEdit}
                orderDetailsEdit={orderDetailsEdit}
              />
            ) : (
              <StepTwo
                issameSuccess={() => handleSuccess()}
                orderId={orderId}
              />
            )}
          </>
        )}
      </div>
      <button className={styles.btnClose} onClick={onRequestClose}>
        <FiX size={20} />
      </button>
    </section>
  );
}
