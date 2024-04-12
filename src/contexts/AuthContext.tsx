import { destroyCookie, setCookie, parseCookies } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  singIn: (credentials: SingInProps) => Promise<void>;
  singOut: () => void;
  singUp: (credentials: SingUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SingInProps = {
  email: string;
  password: string;
};

type SingUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  useEffect(() => {
    const {'@nextauth.token': token} = parseCookies();
    if(token) {
      api.get("/me").then(response => {
        const { id, name, email } = response.data;
        setUser({ id, name, email });
      }).catch(() => {
        singOut();
      });
    }
  }, []);

  async function singIn({ email, password }: SingInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
        // maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/", //quais caminhos tem acesso ao cookie
      });

      setUser({
        id,
        name,
        email,
      });

      //passar o token para proximas requests
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success(`Bem Vindo! ` + name);

      Router.push("/dashboard");
      // console.log(response.data);
    } catch (error) {
      toast.error("Erro ao acessar");
      console.log("Error ao acessar", error);
    }
  }

  async function singUp({ name, email, password }: SingUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });
      
      toast.success(`Usuario cadastrado com sucesso! `);

      Router.push("/");

      
    } catch(error) {
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
