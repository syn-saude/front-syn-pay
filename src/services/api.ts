import axios, { AxiosError } from 'axios';
import {AuthTokenError} from './errors/AuthTokenError';
import { singOut } from '@/contexts/AuthContext';
import { parseCookies } from 'nookies';

// import { singOut } from '@/contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        // baseURL: 'http://localhost:3300',
        baseURL: 'https://synsaude-dev.azurewebsites.net/api',
        headers:{
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response && error.response.status === 401){
            //qualquer erro 401 (nao autorizado) o usuario sera deslogado
            if(typeof window !== undefined){
                //chamar funcao para deslogar
                singOut();
            } else {
                return Promise.reject(new AuthTokenError);
            }
        }

        return Promise.reject(error);
    })

    return api;
}