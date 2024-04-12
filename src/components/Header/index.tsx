import { useContext, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import logoImg from "../../../public/logo.svg";

import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export function Header({ isSameUSer = false }) {
  const router = useRouter();
  const { singOut } = useContext(AuthContext);

  // const handleChange = (event: any) => {
  //   const selectedPage = event.target.value;
  //   router.push(`/${selectedPage}`);
  // };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image src={logoImg} alt={""} width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          {/* <select onChange={handleChange}>
            <option value="">Selecione...</option>
            <option value={"/singup"}>Usuários</option>
            <option value="/category">Categorias</option>
            <option value="/product">Produtos</option>
          </select> */}
          <Link href="/category">
              <span>Categoria</span>
            </Link>

            <Link href="/product">
              <span>Produtos</span>
            </Link>

          <button onClick={singOut} className={styles.btnSingOut}>
            <FiLogOut size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
