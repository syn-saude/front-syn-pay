import { FormEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import doctorImg from "../../public/img/logo-2.png";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "@/utils/canSSRGuest";
import Head from "next/head";
import * as S from "./styles";
import InputWithMask from "@/components/InputMask";
import { Input } from "@/components/ui/input";
import { NavigationMenuDemo } from "@/components/NavigationMenuT";
import { SingInProps } from "@/services/auth/types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { pt } from "yup-locales";
import * as yup from "yup";
yup.setLocale(pt);

const schema = yup
  .object({
    cpf: yup.string().required(),
    email: yup.string(),
    senha: yup.string().required(),
  })
  .required();

export default function Home() {
  const { singIn } = useContext(AuthContext);

  const { register, watch, handleSubmit, setValue, formState, control } =
    useForm<SingInProps>({
      resolver: yupResolver(schema),
    });

  const form = watch();
  const { errors } = formState;

  const [cpf, setCpf] = useState("");
  // const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSingIn(form: SingInProps) {
    try {
      setLoading(true);
      await singIn(form);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    register("cpf");
  }, [register]);

  return (
    <>
      <Head>
        <title>SynSaude - login</title>
      </Head>
      <S.Container>
        <NavigationMenuDemo />
        <S.LoginContent>
          <Image src={doctorImg} alt="SynSaude" width={120} />

          <h1>Bem vindo de Volta!</h1>
          <S.FormContent onSubmit={handleSubmit(handleSingIn)}>
            <S.InputContainer>
              <S.InputLabel>Cpf</S.InputLabel>
              <Input
                control={control}
                errors={errors}
                controlName="cpf"
                placeholder="Digite seu cpf"
                type="text"
              />

              <Input
                control={control}
                errors={errors}
                mask="(99) 99999-9999"
                controlName="email"
                placeholder="Digite seu telefone"
                type="text"
              />
            </S.InputContainer>
            {/* 
            <S.InputContainer>
              <S.InputLabel>Cpf</S.InputLabel>

              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <InputWithMask
                    mask="999.999.999-99"
                    {...field}
                    // {...register("cpf")}
                    placeholder="Digite seu cpf"
                    // value={form.cpf}
                    type="text"
                    // onChange={(event) => setValue("cpf", event.target.value)}
                  />
                )}
              />

              <p>{errors.cpf?.message}</p>
            </S.InputContainer>

            <S.InputContainer>
              <S.InputLabel>Senha</S.InputLabel>

              <S.InputContent
                placeholder="Digite sua senha"
                {...register("senha")}
                type="password"
                // value={senha}
                // onChange={(event: any) => setSenha(event.target.value)}
              />
              <p>{errors.senha?.message}</p>
            </S.InputContainer> */}

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
                Cadastre-se!
              </S.InputLabel>
            </Link>
          </div>
        </S.LoginContent>
        {/* <Image src={doctorImg} alt="SynSaude" width={690} height={690}/> */}
        <DevTool control={control} />
      </S.Container>
    </>
  );
}

// export const getServerSideProps = canSSRGuest(async (ctx) => {
//   return {
//     props: {},
//   };
// });
