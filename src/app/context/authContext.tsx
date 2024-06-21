// app/context/authContext.tsx
"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { ApiClient } from "@/services/apiClient";
import { users } from "@prisma/client";

interface AuthContextProps {
  user: users | null;
  loading: boolean;
  signIn: (user: users) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<users | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await ApiClient.get<users>("me");
        
        if (response.success && response.data) {
          setUser(response.data as users);
        } else {
          //console.error("Failed to fetch user: ", response.message);
        }
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false); // Ensure loading state is set to false regardless of success or failure
      }
    };

    fetchUser();
  }, []);

  const signIn = (user: users) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
