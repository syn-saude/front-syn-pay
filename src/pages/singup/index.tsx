// import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "../../../public/logo.svg";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { InputE } from "@/components/ui/InputE";
import { ButtonE } from "@/components/ui/ButtonE";

export default function SingUp() {
  const { singUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(true);

  async function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || cpf === "" || password === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    setLoading(true);

    let data = {
      name,
      cpf,
      password,
    };

    // await singUp(data);

    setLoading(false);
  }

  function handleCpfChange(event: { target: { value: any } }) {
    const inputCpf = event.target.value;
    const formattedCpf = formatCpf(inputCpf);
    setCpf(formattedCpf);
  }

  function formatCpf(value: string) {
    let cpfFormatted = value.replace(/\D/g, "");

    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d)/, "$1.$2");
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d)/, "$1.$2");
    cpfFormatted = cpfFormatted.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpfFormatted;
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      {/* {isAuthUser && <Header />} */}
      <div className={styles.containerCenter}>
        {/* <Image src={logoImg} alt="Sujeito Pizza" /> */}
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSingUp}>
            <InputE
              placeholder="Digite seu Nome"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <InputE
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputE
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <ButtonE type="submit">cadastrar</ButtonE>
          </form>
          <div className={styles.boxLink}>
            <span className={styles.text}> Já possui uma conta?</span>
            <Link href="/">
              <span className={styles.textLink}> Faça login!</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
