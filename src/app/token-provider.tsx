'use client';
import { useState, useEffect, useContext, createContext } from 'react';

interface TokenContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const TokenContext = createContext<TokenContextType>({
  token: '',
  setToken: () => {},
});

export const useTokenContext = () => {
  return useContext(TokenContext);
};

export default function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token') ?? '';
    setToken(storedToken);
  }, []);

  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>
};
