
import { User } from "@/app/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the authentication context
const AuthContext = createContext<{
  user: User | null;
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (user: User, password: string) => Promise<void>;
  isLoading: boolean;
} | undefined>(undefined);

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (e) {
        console.error('Error loading user:', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Validación de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de contraseña (mínimo 6 caracteres)
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup && !isLoading) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments, router, isLoading]);

  const signIn = async (userData: User) => {
    if (!isValidEmail(userData.email)) {
      throw new Error('Email inválido');
    }

    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    router.replace("/(tabs)");
  };

  const signUp = async (userData: User, password: string) => {
    if (!isValidEmail(userData.email)) {
      throw new Error('Email inválido');
    }
    if (!userData.phone) {
      throw new Error('Teléfono es requerido');
    }
    if (!isValidPassword(password)) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Verificar si el email ya existe
    const usersJson = await AsyncStorage.getItem('users') || '[]';
    const users = JSON.parse(usersJson);
    
    if (users.some((u: any) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('El email ya está registrado');
    }

    // Generar ID único para el usuario
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    // Guardar usuario con contraseña (en producción usar hashing)
    users.push({ ...newUser, password });
    await AsyncStorage.setItem('users', JSON.stringify(users));

    // Hacer login automático
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    router.replace("/(tabs)");
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
