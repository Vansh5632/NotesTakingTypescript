export interface User{
    id:string;
    email:string;
    name:string;
}

export interface AuthState{
    user:User|null;
    isAuthenticated:boolean;
    isLoading:boolean;
    error:string|null;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}