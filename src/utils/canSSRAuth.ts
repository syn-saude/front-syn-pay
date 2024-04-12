// import { AuthTokenError } from "@/services/errors/AuthTokenError";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";

//funcao para paginas que podem ser acessadas por usuarios que estiverem autenticado

export function canSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["@nextauth.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, "@nextauth.token");
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }

    return await fn(ctx);
  };
}
