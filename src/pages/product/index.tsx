import React, { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import { api } from "./../../services/apiClient";

interface CategoryProps {
  categoryList: ItemProps[];
}

type ItemProps = {
  id: number;
  name: string;
};

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [productUrl, setProductUrl] = useState("");
  const [productImg, setProductImg] = useState(null);

  const [category, setCategory] = useState(categoryList || []);
  const [selectedCategory, setSelectedCategory] = useState(0);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const file: any = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type === "image/png" || file.type === "image/jpeg") {
      setProductImg(file);
      setProductUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  function handleChangeCategory(event: any) {
    setSelectedCategory(event.target.value);
  }

  async function handleregister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();
      if (
        productImg === null ||
        name === "" ||
        price === "" ||
        description === ""
      ) {
        toast.warning("Preencha todos os campos!");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("categoryId", String(category[selectedCategory].id));
      data.append("file", productImg);

      const apiClient = setupAPIClient();
      await apiClient.post("/product", data);

      toast.success("Produto cadastrado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrado produto");
    }
    setProductUrl("");
    setProductImg(null);
    setName("");
    setPrice("");
    setDescription("");
  }

  return (
    <>
      <Head>
        <title>Novo Produto</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Produto</h1>

          <form className={styles.form} onSubmit={handleregister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={35} color={`var(--white)`} />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />
              {productUrl && (
                <Image
                  src={productUrl}
                  className={styles.previewImg}
                  alt="Foto do Produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={selectedCategory} onChange={handleChangeCategory}>
              {category.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Digite o preço do produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              name=""
              id=""
              placeholder="Descreva seu produto!"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button type="submit" className={styles.btnAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/category");
  // console.log("da request", response);
  return {
    props: {
      categoryList: response.data,
    },
  };
});
