'use client';
import { jwtDecode } from 'jwt-decode';
import { useTokenContext } from './token-provider';
import { useState, useEffect, useContext, createContext } from 'react';

interface User {
  id: string;
  username: string; 
  photo: string;
  email: string;
  password: string;
  role: string;
};

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}  
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }: {children: React.ReactNode}) {
  const { token } = useTokenContext();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      const user = jwtDecode(token) as User;
      setUser(user);
    };
  }, [token]);

  return (
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  );
};
