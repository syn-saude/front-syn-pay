import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import doctorImg from "../../public/doctor.png";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "@/utils/canSSRGuest";
import Head from "next/head";
import * as S from "./styles";
import InputWithMask from "@/components/InputMask";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { singIn } = useContext(AuthContext);

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSingIn(event: FormEvent) {
    event.preventDefault();

    if (cpf === "" || senha === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    setLoading(true);
    //teste
    let data = {
      // email: "", // Add the email property with an empty string value
      cpf,
      senha,
    };

    await singIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SynSaude - login</title>
      </Head>
      <S.Container>
        <S.LoginContent>
          <h1>Bem vindo de Volta!</h1>
          <S.FormContent onSubmit={handleSingIn}>
            <S.InputContainer>
              <S.InputLabel>Cpf</S.InputLabel>
              <InputWithMask
                mask="999.999.999-99"
                placeholder="Digite seu cpf"
                value={cpf}
                type="text"
                onChange={(event) => setCpf(event.target.value)}
              />
            </S.InputContainer>

            <S.InputContainer>
              <S.InputLabel>Email</S.InputLabel>
              <Input type="email" />
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>Senha</S.InputLabel>

              <S.InputContent
                placeholder="Digite sua senha"
                type="password"
                value={senha}
                onChange={(event: any) => setSenha(event.target.value)}
              />
            </S.InputContainer>
            <S.InputLabel style={{ color: "var(--purple-300)" }}>
              Esqueceu sua senha?
            </S.InputLabel>
            <S.ButtonContent type="submit">Acessar</S.ButtonContent>
          </S.FormContent>
          <div>
            <S.InputLabel> Não possui uma conta?</S.InputLabel>
            <Link href="/singup">
              <S.InputLabel
                style={{ color: "var(--purple-300)", fontWeight: "700" }}
              >
                {" "}
                Cadastre-se!
              </S.InputLabel>
            </Link>
          </div>
        </S.LoginContent>
        {/* <Image src={doctorImg} alt="SynSaude" width={690} height={690}/> */}
      </S.Container>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
