import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Header } from "@/components/Header";
import { toast } from "react-toastify";

import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleCreateCategory(event: React.FormEvent) {
    event.preventDefault();
    if (name === "") {
      toast.warning("O campo nome é obrigatório!");
      return;
    }
    const apiClient = setupAPIClient();
    await apiClient.post("/category", { name: name });

    toast.success("Categoria cadastrada com sucesso!");
    setName("");
  }

  return (
    <>
      <Head>
        <title>Nova categoria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastror categorias</h1>
          <form className={styles.form} onSubmit={handleCreateCategory}>
            <input
              type="text"
              placeholder="Digite o nome da categoria!"
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <button className={styles.btnAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
