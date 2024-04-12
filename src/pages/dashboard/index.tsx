import Link from "next/link";
import styles from "./styles.module.scss";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import { FiEdit3, FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Header } from "@/components/Header";
import { ModalDetailOrder } from "@/components/ModalDetailOrder";
import ModalNewOrder from "@/components/ModalNewOrder";

interface OrderProps {
  orderList: ItemProps[];
  detailList: IDetailProps[];
}

type ItemProps = {
  id: number;
  table: number;
  status: boolean;
  draft: boolean;
  name: string;
};

export type IDetailProps = {
  id: string;
  quantity: number;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

export default function Dashboard({ orderList }: OrderProps) {
  const [orders, setOrders] = useState(orderList || []);
  const [orderDetail, setOrderDetail] = useState<IDetailProps[]>();
  const [modalDetailIsOpen, setModalDetailIsOpen] = useState(false);
  const [modalNewOrderIsOpen, setModalNewOrderIsOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(false);
  const [idOrder, setIdOrder] = useState("");
 

  function handleCloseModal() {
    setModalNewOrderIsOpen(false);
    setModalDetailIsOpen(false);
    setEditOrder(false);
    handlerefresh();
  }

  async function handleEditOrder(event: any, id: number) {
    event.stopPropagation();
    setEditOrder(true);
    setIdOrder(String(id));
    const apiClient = setupAPIClient();
    const response = await apiClient.get(`/order/detail`, {
      params: {
        orderId: id,
      },
    });
    setOrderDetail(response.data);
  }

  async function handleOpemModalView(id: number) {
    const apiClient = setupAPIClient();
    const response = await apiClient.get(`/order/detail`, {
      params: {
        orderId: id,
      },
    });

    setOrderDetail(response.data);
    setModalDetailIsOpen(true);
  }

  async function handleConfirmOrder(id: string) {
    toast.success("Pedido confirmado com sucesso!" + id);
    const apiClient = setupAPIClient();
    await apiClient.put("order/finish", {
      orderId: id,
    });
    const response = await apiClient.get("/order/list");

    setOrders(response.data);
    setModalDetailIsOpen(false);
  }

  async function handlerefresh() {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("/order/list");

    setOrders(response.data);
  }

  const handleOpenNewOrder = () => {
    setModalNewOrderIsOpen(true);
  };

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Bem vindo ao painel</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handlerefresh} className={styles.btnRefresh}>
              <FiRefreshCcw size={20} />
            </button>
            <button onClick={handleOpenNewOrder} className={styles.btnNewOrder}>
              <span>Novo Pedido</span>
            </button>
          </div>

          <article className={styles.listOrders}>
            {orders.length === 0 && (
              <span className={styles.empty}>
                Não possui pedidos no momento!
              </span>
            )}

            {orders.map((item) => (
              <section
                key={item.id}
                className={styles.orderItem}
                onClick={() => handleOpemModalView(item.id)}
              >
                <div className={styles.containerTag}>
                  <div className={styles.tag}></div>
                  <span>Mesa: {item.table}</span>
                </div>
                <FiEdit3
                  className={styles.iconEdit}
                  // onClick={handleEditOrder}
                  onClick={(event) => handleEditOrder(event, item.id)}
                  size={20}
                />
              </section>
            ))}
          </article>
        </main>

        {modalDetailIsOpen && (
          <ModalDetailOrder
            isOpen={modalDetailIsOpen}
            onRequestClose={handleCloseModal}
            orderDetails={orderDetail ?? []}
            handleConfirmOrder={handleConfirmOrder}
          />
        )}

        {modalNewOrderIsOpen && (
          <ModalNewOrder
            onRequestClose={handleCloseModal}
            isEdit={false}
            // orderDetailsEdit={modalItem ?? []}
          />
        )}

        {editOrder && (
          <ModalNewOrder
            onRequestClose={handleCloseModal}
            idOrderEdit={idOrder}
            isEdit={true}
            orderDetailsEdit={orderDetail ?? []}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/order/list");

  return {
    props: {
      orderList: response.data,
    },
  };
});
