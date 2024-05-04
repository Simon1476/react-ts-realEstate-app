import { createContext, useEffect, useState } from "react";

type UserInfo = {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
};

type AuthContextValue = {
  currentUser: UserInfo | null;
  updateUser: (data: UserInfo) => void;
};

// const initialValue = {
//   id: "",
//   email: "",
//   username: "",
//   avatar: "",
//   createdAt: "",
// };

const getInitialState = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {};
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<UserInfo>(getInitialState);

  const updateUser = (data: UserInfo) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
