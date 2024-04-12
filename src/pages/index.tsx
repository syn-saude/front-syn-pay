import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import doctorImg from "../../public/doctor.png";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "@/services/utils/canSSRGuest";
import Head from "next/head";
import * as S from "./styles";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface LoginRequest {
  email: string;
  cpf: string;
  senha: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
    cpf: yup.string().required(),
    senha: yup.string().required(),
  })
  .required();

export default function Home() {
  const { singIn } = useContext(AuthContext);

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit, watch } = useForm<LoginRequest>();

  async function handleSingIn(form: LoginRequest) {
    // if (cpf === "" || senha === "") {
    //   toast.warning("Preencha todos os campos");
    //   return;
    // }teste

    setLoading(true);
    //teste
    let data = {
      cpf,
      senha,
    };

    await singIn(form);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SynSaude - login</title>
      </Head>
      <S.Container>
        <S.LoginContent>
          <h1>Bem vindo de Volta! </h1>
          <S.FormContent onSubmit={handleSubmit(handleSingIn)}>
            <S.InputContainer>
              <Label>CPF</Label>
              <Input
                type="cpf"
                // inputFormat="X99.999.999-99"
                placeholder="Digite seu cpf"
              />
            </S.InputContainer>
            <S.InputContainer>
              <Label>Email </Label>
              <Input type="email" placeholder="Digite seu email" />
              {/* <S.InputLabel>Email</S.InputLabel>
              <S.InputContent
                placeholder="Digite seu cpf"
                type="text"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
              /> */}
            </S.InputContainer>
            <S.InputContainer>
              <Label>Senha</Label>
              <Input type="password" placeholder="Digite sua senha" />
              {/* <S.InputLabel>Senha</S.InputLabel> */}
              {/* <S.InputContent
                placeholder="Digite sua senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              /> */}
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
        {/* <Image src={doctorImg} alt="SynSaude" width={690} height={690} /> */}
      </S.Container>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
