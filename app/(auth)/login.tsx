import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Obtener todos los usuarios registrados
      const usersJson = await AsyncStorage.getItem('users') || '[]';
      const users = JSON.parse(usersJson);

      // Buscar usuario que coincida
      const user = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        Alert.alert('Error', 'Usuario no encontrado. Por favor, regístrate primero.');
        return;
      }

      // En una app real, verificarías la contraseña hasheada
      // Por ahora hacemos una validación simple
      if (user.password !== password) {
        Alert.alert('Error', 'Contraseña incorrecta');
        return;
      }

      // Iniciar sesión sin guardar contraseña
      const { password: _, ...userWithoutPassword } = user;
      await signIn(userWithoutPassword);
    } catch (error) {
      Alert.alert('Error en login', error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Iniciar Sesión</ThemedText>
      <ThemedText style={styles.subtitle}>Bienvenido de nuevo.</ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Correo electrónico"
          style={[styles.input, errors.email && styles.inputError]}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
        />
        {errors.email && <ThemedText style={styles.errorText}>{errors.email}</ThemedText>}

        <TextInput
          placeholder="Contraseña"
          style={[styles.input, errors.password && styles.inputError]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />
        {errors.password && <ThemedText style={styles.errorText}>{errors.password}</ThemedText>}
      </View>

      <Pressable 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={onLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>Entrar</ThemedText>
        )}
      </Pressable>

      <View style={styles.footer}>
        <ThemedText>¿No tienes una cuenta? </ThemedText>
        <Link href="/register">
          <ThemedText style={styles.link}>Regístrate</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  inputContainer: {
    gap: 8,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: -6,
    marginBottom: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#007A7A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    color: '#007A7A',
    fontWeight: 'bold',
  },
});
