// import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/page.module.scss";
import logoImg from "../../../public/logo.svg";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";


export default function SingUp() {
  const { singUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
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

  function handleCpfChange(event: { target: { value: any; }; }) {
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
      <div>
        {/* <Image src={logoImg} alt="Sujeito Pizza" /> */}
        <div>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSingUp}>
            <input
              placeholder="Digite seu Nome"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              placeholder="Digite seu cpf"
              type="text"
              value={cpf}
              // onChange={(event) => setCpf(event.target.value)}
              onChange={handleCpfChange}
              maxLength={14}
            />
            <input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">
              cadastrar
            </button>
          </form>
          <div>
            <span > Já possui uma conta?</span>
            <Link href="/">
              <span> Faça login!</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
