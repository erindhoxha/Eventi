import React, { createContext, useState } from "react";

const AuthContext = createContext({
  user: {
    id: 0,
    name: "John Doe",
    email: "johndoe@gmail.com",
  },
  login: (email: string, password: string) => {},
  logout: () => {},
});

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>({
    id: 0,
    name: "John Doe",
    email: "",
  });

  const login = async (email: string, password: string) => {
    const result = { id: 1, name: "John Doe", email };
    setUser(result);
  };

  const logout = () => {
    // Call API to logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
