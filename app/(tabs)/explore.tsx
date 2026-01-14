import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  const onLogout = () => {
    // Navigate back to the login screen
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Mi Perfil
        </ThemedText>

        {/* User info can go here */}

        <Pressable style={styles.button} onPress={onLogout}>
          <ThemedText style={styles.buttonText}>Cerrar Sesión</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#E53935', // A red color for logout
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto', // Push to the bottom
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
