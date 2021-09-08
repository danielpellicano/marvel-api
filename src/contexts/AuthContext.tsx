import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";
type User = {
  email: string;
  permissions: string[];
  roles: string[]
}

type SignInCredenciais = { 
  email: string,
  password: string
}

type AuthContextData = {
  signIn(credencials: SignInCredenciais): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ( { children }:AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;
  async function signIn({ email, password}: SignInCredenciais) {
    try {
    const response = await api.post('sessions', {
      email, password
    })

    const { permissions, roles } = response.data;

    setUser({
      email,
      permissions,
      roles,
    })

    Router.push('/dashboard')
  } catch (err) { 
    console.log(err)
  }
}

  return (
    <AuthContext.Provider value={{signIn, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}