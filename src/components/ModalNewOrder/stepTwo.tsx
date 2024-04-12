import { setupAPIClient } from "@/services/api";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { FiTrash, FiTrash2 } from "react-icons/fi";
import { IDetailProps } from "@/pages/dashboard";

interface IStepTwoProps {
  issameSuccess: () => void;
  orderId: any;
  categoryList?: ICategoryProps[];
  productList?: IProductProps[];
  orderDetailsEdit?: IDetailProps[];
}

type ICategoryProps = {
  id: number;
  name: string;
};

type IProductProps = {
  id: number;
  name: string;
  price: string;
  categoryId: number;
};

export default function StepTwo({
  issameSuccess,
  orderId,
  categoryList,
  productList,
  orderDetailsEdit,
}: IStepTwoProps) {
  // console.log("Editar", orderDetailsEdit);
  // console.log("orderId", orderId);
  const [category, setCategory] = useState(categoryList || []);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [product, setProduct] = useState(productList || []);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [addedItems, setAddedItems] = useState<any[]>([]);
  // const [newOrderDetailsEdit, setOrderDetailsEdit] = useState<IDetailProps[]>([]);

  async function handleSearchCategory(event: any) {
    const apiClient = setupAPIClient();
    try {
      const response = await apiClient.get("/category");
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function handleSearchProduct(id: string) {
    const apiClient = setupAPIClient();
    try {
      const response = await apiClient.get(`/category/product`, {
        params: {
          categoryId: id,
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching procucts:", error);
    }
  }

  function handleChangeCategory(event: any) {
    setSelectedCategory(event.target.value);
  }

  function handleChangeProduct(event: any) {
    setSelectedProduct(event.target.value);
  }

  function handleAddItem(event: React.FormEvent) {
    event.preventDefault();
    if (quantity === 0) {
      toast.warning("O campo número é obrigatório!");
      return;
    }

    const newItem = {
      productId: product[selectedProduct].id,
      productName: product[selectedProduct].name,
      quantity: quantity,
    };

    setAddedItems([...addedItems, newItem]);
    setQuantity(0);
    setSelectedProduct(0);
  }

  function handleRemoveItem(index: number) {
    const newItems = addedItems.filter((item, i) => i !== index);
    setAddedItems(newItems);
  }

  function handleRemoveSavedItem(index: number) {
    // Crie uma cópia do array orderDetailsEdit
    const newOrderDetailsEdit = [...(orderDetailsEdit || [])];

    // Remova o item do array utilizando o índice fornecido
    newOrderDetailsEdit.splice(index, 1);

    console.log(newOrderDetailsEdit);
    orderDetailsEdit = newOrderDetailsEdit;
  }

  async function handleConfirmItems() {
    const apiClient = setupAPIClient();
    try {
      await Promise.all(
        addedItems.map((item) =>
          apiClient.post("/order/add", {
            orderId: orderId,
            productId: item.productId,
            quantity: item.quantity,
          })
        )
      );
      toast.success("Itens adicionados com sucesso!");
      setAddedItems([]);
      handleConfirmOrder(orderId);
    } catch (error) {
      console.error("Error adding items:", error);
      toast.error("Erro ao adicionar itens. Por favor, tente novamente.");
    }
  }

  async function handleConfirmOrder(id: string) {
    const apiClient = setupAPIClient();
    await apiClient.put("order/send", {
      orderId: id,
    });
    issameSuccess();
  }

  return (
    <div
      className={`${styles.containerSteps} ${
        addedItems.length > 0 || (orderDetailsEdit?.length ?? 0) > 0
          ? styles.containerWithGap
          : ""
      }`}
    >
      <main className={styles.containerStepOne}>
        <h2>Adicionar Itens</h2>

        <div className={styles.containerStepTwo}>
          <button
            className={styles.btnSearchStepTwo}
            onClick={handleSearchCategory}
          >
            buscar categorias
          </button>

          <select
            value={selectedCategory}
            onChange={handleChangeCategory}
            className={styles.selectsStepTwo}
          >
            <option value="">selecione uma categoria</option>
            {category?.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <form className={styles.formStepTwo} onSubmit={handleAddItem}>
          <div className={styles.containerStepTwo}>
            <button
              className={styles.btnSearchStepTwo}
              type="button"
              onClick={() =>
                handleSearchProduct(String(category[selectedCategory].id))
              }
            >
              buscar procutos
            </button>

            <select
              value={selectedProduct}
              onChange={handleChangeProduct}
              className={styles.selectsStepTwo}
            >
              <option value="">selecione seus produtos</option>
              {product?.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            placeholder="Digite a quantidade de itens!"
            className={styles.inputStepOne}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />

          <button className={styles.btnAddStepOne} type="submit">
            Adicionar
          </button>
        </form>
      </main>

      <div className={styles.selectedProducts}>
        {(orderDetailsEdit?.length ?? 0) > 0 && (
          <>
            <h2>Itens já Selecionados</h2>
            <ul className={styles.selectedItemsList}>
              {orderDetailsEdit?.map((item, index) => (
                <li key={index} className={styles.selectedItem}>
                  <span>
                    {item.product.name} - Qtd: {item.quantity}
                  </span>
                  <FiTrash2
                    size={20}
                    className={styles.removeItem}
                    onClick={() => handleRemoveSavedItem(index)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        {addedItems.length > 0 && (
          <>
            <h2>Itens Selecionados</h2>
            <ul className={styles.selectedItemsList}>
              {addedItems.map((item, index) => (
                <li key={index} className={styles.selectedItem}>
                  <span>
                    {item.productName} - Qtd: {item.quantity}
                  </span>
                  <FiTrash2
                    size={20}
                    className={styles.removeItem}
                    onClick={() => handleRemoveItem(index)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        {addedItems.length > 0 && (
          <button className={styles.btnConfirm} onClick={handleConfirmItems}>
            Confirmar itens adicionados
          </button>
        )}
        {addedItems.length <= 0 && (
          <>
            {(orderDetailsEdit?.length ?? 0) > 0 && (
              <button
                className={styles.btnConfirm}
                onClick={handleConfirmItems}
              >
                Confirmar itens adicionados
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
