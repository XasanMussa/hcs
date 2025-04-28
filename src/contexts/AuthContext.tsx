import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { createProfile } from "../utils/profile";
import { supabase } from "../lib/supabase";
import { Box, CircularProgress, Typography } from "@mui/material";

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  signUp: (
    email: string,
    password: string,
    username: string,
    phone: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthError {
  message: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      return data?.role || null;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  }, []);

  const handleAuthStateChange = useCallback(
    async (session: Session | null) => {
      try {
        if (session?.user) {
          setUser(session.user);
          const role = await fetchUserRole(session.user.id);
          setUserRole(role);
        } else {
          setUser(null);
          setUserRole(null);
        }
      } catch (err) {
        const authError = err as AuthError;
        setError(authError.message || "Authentication error occurred");
        console.error("Auth state change error:", err);
      }
    },
    [fetchUserRole]
  );

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the initial session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (mounted) {
          await handleAuthStateChange(session);
          setIsInitialized(true);
        }
      } catch (err) {
        const authError = err as AuthError;
        if (mounted) {
          setError(authError.message || "Failed to initialize authentication");
          console.error("Auth initialization error:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted && isInitialized) {
        await handleAuthStateChange(session);
      }
    });

    initialize();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange, isInitialized]);

  const signUp = async (
    email: string,
    password: string,
    username: string,
    phone: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (!user) throw new Error("User creation failed");

      await createProfile({
        id: user.id,
        username,
        phone,
      });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || "Sign up failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || "Sign in failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserRole(null);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || "Sign out failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Only show loading screen during initial load
  if (loading && !isInitialized) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#fff"
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#fff"
      >
        <Typography color="error">
          Authentication Error: {error}. Please refresh the page.
        </Typography>
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        signUp,
        signIn,
        signOut,
        loading,
        error,
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
