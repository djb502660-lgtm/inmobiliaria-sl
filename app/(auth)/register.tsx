import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{7,}$/.test(phone.replace(/[\s\-()]/g, ''))) {
      newErrors.phone = 'Teléfono inválido (mínimo 7 dígitos)';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await signUp(
        {
          id: '',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          createdAt: new Date().toISOString(),
        },
        password
      );
    } catch (error) {
      Alert.alert('Error en registro', error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Crear Cuenta</ThemedText>
      <ThemedText style={styles.subtitle}>Únete a nuestra comunidad.</ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre completo"
          style={[styles.input, errors.name && styles.inputError]}
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />
        {errors.name && <ThemedText style={styles.errorText}>{errors.name}</ThemedText>}

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
          placeholder="Teléfono"
          style={[styles.input, errors.phone && styles.inputError]}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          editable={!isLoading}
        />
        {errors.phone && <ThemedText style={styles.errorText}>{errors.phone}</ThemedText>}

        <TextInput
          placeholder="Contraseña"
          style={[styles.input, errors.password && styles.inputError]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />
        {errors.password && <ThemedText style={styles.errorText}>{errors.password}</ThemedText>}

        <TextInput
          placeholder="Confirmar Contraseña"
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!isLoading}
        />
        {errors.confirmPassword && <ThemedText style={styles.errorText}>{errors.confirmPassword}</ThemedText>}
      </View>

      <Pressable 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={onRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
        )}
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
