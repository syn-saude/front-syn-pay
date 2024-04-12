import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/page.module.scss";
import logoImg from "../../../public/logo.svg";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function SingUp() {
  const { singUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isAuthUser, setIsAuthUser] = useState(true);//arrumar o estado

  async function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await singUp(data);

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      {isAuthUser && <Header />}
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Sujeito Pizza" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSingUp}>
            <Input
              placeholder="Digite seu Nome"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" loading={loading}>
              cadastrar
            </Button>
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
