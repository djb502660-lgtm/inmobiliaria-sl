
import { useRouter, useSegments } from "expo-router";
import React, { useState, createContext, useContext, useEffect } from "react";

// Define the type for the authentication context
interface AuthContextType {
  user: any; // Replace 'any' with your user type
  signIn: (user: any) => void;
  signOut: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null); // Replace 'any' with your user type
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments, router]);

  const signIn = (userData: any) => {
    setUser(userData);
    // You might want to navigate the user to the main screen
    router.replace("/(tabs)");
  };

  const signOut = () => {
    setUser(null);
    // Navigate the user to the login screen
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
