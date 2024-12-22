import {createContext,useContext,useReducer,useCallback} from 'react';
import { AuthState,User } from '../types/auth.types';

interface AuthContextType extends AuthState{
    login:(email:string,password:string)=>Promise<void>;
    register:(email:string,password:string)=>Promise<void>;
    logout:()=>void;
}

type AuthAction =
    |{type:'AUTH_START'}
    |{type:'AUTH_SUCCESS',payload:User}
    |{type:'AUTH_FAILURE',payload:string}
    |{type:'LOGOUT'};

const initialState:AuthState = {
    user:null,
    isAuthenticated:false,
    isLoading:false,
    error:null
}
const authReducer = (state:AuthState,action:AuthAction):AuthState=>{
    switch(action.type){
        case 'AUTH_START':
            return {
                ...state,
                isLoading:true,
                error:null
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                user:action.payload,
                isAuthenticated:true,
                isLoading:false,
                error:null
            }
        case 'AUTH_FAILURE':
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user:null,
                isAuthenticated:false
            }
        default:
            return state;
    }
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [state,dispacth] = useReducer(authReducer,initialState);

    const login = useCallback(async (email:string,password:string)=>{
        try{
            dispacth({type:'AUTH_START'});
            await new Promise((resolve)=>setTimeout(resolve,1000));
            const user:User = {id:'1',email};
            localStorage.setItem('user',JSON.stringify(user));
            dispacth({type:'AUTH_SUCCESS',payload:user});
        }catch(err){
            dispacth({type:'AUTH_FAILURE',payload:err.message});
        }
    },[]);

    const register = useCallback(async (email:string,password:string)=>{
        try{
            dispacth({type:'AUTH_START'});
            await new Promise((resolve)=>setTimeout(resolve,1000));
            const user:User = {id:'1',email};
            localStorage.setItem('user',JSON.stringify(user));
            dispacth({type:'AUTH_SUCCESS',payload:user});
        }catch(err){
            dispacth({type:'AUTH_FAILURE',payload:err.message});
        }
    },[]);
    const logout = useCallback(()=>{
        localStorage.removeItem('user');
        dispacth({type:'LOGOUT'});
    },[]);

    return (
        <AuthContext.Provider value={{...state,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}