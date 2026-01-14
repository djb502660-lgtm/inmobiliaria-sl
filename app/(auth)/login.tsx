import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // TODO: Implement real authentication
    console.log('Login attempt with:', { email, password });
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Iniciar Sesión</ThemedText>
      <ThemedText style={styles.subtitle}>Bienvenido de nuevo.</ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.button} onPress={onLogin}>
        <ThemedText style={styles.buttonText}>Entrar</ThemedText>
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
    gap: 16,
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
  button: {
    backgroundColor: '#007A7A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
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
  }
});
