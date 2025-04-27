import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    username: string,
    phone: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage first
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Then check Supabase session
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        const userData = {
          id: session.user.id,
          email: session.user.email || "",
          role: "customer",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    })();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email || "",
            role: "customer",
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    username: string,
    phone: string
  ) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // Create profile
    if (data.user) {
      await supabase
        .from("profiles")
        .insert([{ id: data.user.id, username, phone }]);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
