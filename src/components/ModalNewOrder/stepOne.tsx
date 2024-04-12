import React, { useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/services/api";
import { IDetailProps } from "@/pages/dashboard";

interface IStepOneProps {
  issameSuccess: () => void;
  onOrderIdReceived: any;
  orderDetailsEdit?: IDetailProps[];
}
export default function StepOne({
  issameSuccess,
  onOrderIdReceived,
  orderDetailsEdit,
}: IStepOneProps) {
  const [table, setTable] = useState(0);

  async function handleCreateCategory(event: React.FormEvent) {
    event.preventDefault();
    if (table === 0) {
      toast.warning("O campo numero é obrigatório!");
      return;
    }
    const apiClient = setupAPIClient();

    try {
      const response = await apiClient.post("/order", { table: table });
      const orderId = response.data.id;
      setTable(0);
      issameSuccess();
      onOrderIdReceived(orderId);
    } catch (error) {
      console.error("Erro ao abrir mesa:", error);
      toast.error("Erro ao abrir mesa. Por favor, tente novamente.");
    }
  }
  return (
    <div className={styles.containerSteps}>
      <main className={styles.containerStepOne}>
        <h2>Abrir Mesa</h2>
        <form className={styles.formStepOne} onSubmit={handleCreateCategory}>
          <input
            type="number"
            placeholder="Digite o numero da Mesa!"
            className={styles.inputStepOne}
            value={table}
            onChange={(event) => setTable(Number(event.target.value))}
          />
          <button className={styles.btnAddStepOne} type="submit">
            Abrir
          </button>
        </form>
      </main>
    </div>
  );
}
