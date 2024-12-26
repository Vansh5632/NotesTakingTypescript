import {api} from './api';
import {User} from '../types/auth.types';

export const authService = {
    async login(email:string,password:string):Promise<User>{
        const response = await api.post<User>('/auth/login',{email,password});
        const {token,user} = response.data;
        localStorage.setItem('token',token);
        return user;
    },
    async logout(){
        localStorage.removeItem('token');
    },
    async getCurrentUser():Promise<User>{
        const response = await api.get<User>('/auth/me');
        return response.data;
    }
}

