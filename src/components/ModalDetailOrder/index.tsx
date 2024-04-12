import Modal from "react-modal";
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";
import { IDetailProps } from "@/pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  orderDetails: IDetailProps[];
  handleConfirmOrder: (id: string) => void;
}

export function ModalDetailOrder({
  isOpen,
  onRequestClose,
  orderDetails,
  handleConfirmOrder,
}: ModalOrderProps) {
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      background: `var(--dark-900)`,
      color: `var(--white)`,
      borderRadius: "8px",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button type="button" onClick={onRequestClose} className={styles.button}>
        <FiX size={24} />
      </button>
      <div className={styles.container}>
        <h2>DETALHES DO PEDIDO</h2>
        <span className={styles.table}>
          Mesa: <strong>{orderDetails[0].order.table}</strong>
        </span>
        <>
          {orderDetails.map((item) => (
            <section key={item.id} className={styles.comander}>
              <span>
                {item.quantity} - {item.product.name}
              </span>
              <span>R$ {item.product.price}</span>
            </section>
          ))}
        </>
        <button
          className={styles.confirmOrder}
          onClick={() => handleConfirmOrder(orderDetails[0].orderId)
          }
        >
          {" "}
          Confirmar pedido
        </button>
      </div>
    </Modal>
  );
}
