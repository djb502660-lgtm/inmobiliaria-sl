import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    // TODO: Implement real registration
    console.log('Registering with:', { name, email, password });
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Crear Cuenta</ThemedText>
      <ThemedText style={styles.subtitle}>Únete a nuestra comunidad.</ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre completo"
          style={styles.input}
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />
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

      <Pressable style={styles.button} onPress={onRegister}>
        <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
      </Pressable>

      <View style={styles.footer}>
        <ThemedText>¿Ya tienes una cuenta? </ThemedText>
        <Link href="/login">
          <ThemedText style={styles.link}>Inicia Sesión</ThemedText>
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
