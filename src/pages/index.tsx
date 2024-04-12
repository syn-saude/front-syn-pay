import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/page.module.scss";
import logoImg from "../../public/logo.svg";
import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "@/utils/canSSRGuest";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const { singIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSingIn(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    setLoading(true);
    //teste
    let data = {
      email,
      password,
    };

    await singIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - faça seu login 1</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Sujeito Pizza" />
        <div className={styles.login}>
          <form onSubmit={handleSingIn}>
            <Label>Nome fulano</Label>
            <Input />
            <Label>Nome fulano</Label>
            <Input />
            <Label>Nome fulano</Label>
            <Input />
            <Label>Nome fulano</Label>
            <Input />

            {/* <Input
              placeholder="Digite seu email "
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            /> */}
            <Button type="submit">Acessar</Button>
          </form>
          <div className={styles.boxLink}>
            <span className={styles.text}> Não possui uma conta?</span>
            <Link href="/singup">
              <span className={styles.textLink}> Cadastre-se!</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
