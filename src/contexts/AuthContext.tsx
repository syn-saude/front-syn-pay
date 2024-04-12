import { destroyCookie, setCookie, parseCookies } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  singIn: (credentials: SingInProps) => Promise<void>;
  singOut: () => void;
  singUp: (credentials: SingUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  cpf: string;
  name: string;
};

type SingInProps = {
  cpf: string;
  senha: string;
};

type SingUpProps = {
  name: string;
  cpf: string;
  senha: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, cpf } = response.data;
          setUser({ id, name, cpf });
        })
        .catch(() => {
          singOut();
        });
    }
  }, []);

  async function singIn({ cpf, senha }: SingInProps) {
    try {
      const response = await api.post("/auth/login", {
        cpf,
        senha,
      });

      const { token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
        // maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        id: "",
        name: "",
        cpf,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success(`Bem Vindo! ` + cpf);

      Router.push("/homepage");
    } catch (error) {
      toast.error("Erro ao acessar");
      console.log("Error ao acessar", error);
    }
  }

  async function singUp({ name, cpf, senha }: SingUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        cpf,
        senha,
      });

      toast.success(`Usuario cadastrado com sucesso! `);

      Router.push("/");
    } catch (error) {
      toast.error("Erro ao cadastrar");
      console.log("Erro ao cadastrar");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, singIn, singOut, singUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function singOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("Erro ao deslogar");
  }
}
