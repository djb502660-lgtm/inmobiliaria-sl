import { Property } from '@/app/types';
import { PropertyCard } from '@/components/property-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [userProperties, setUserProperties] = useState<Property[]>([]);

  useEffect(() => {
    loadUserProperties();
  }, []);

  const loadUserProperties = async () => {
    try {
      const propertiesJson = await AsyncStorage.getItem('properties') || '[]';
      const properties = JSON.parse(propertiesJson);
      const filtered = properties.filter((p: Property) => p.userId === user?.id);
      setUserProperties(filtered);
    } catch (error) {
      console.error('Error loading properties:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    // Guardar cambios del perfil
    const updatedUser = { ...user!, name: name.trim(), phone: phone.trim() };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    Alert.alert('Éxito', 'Perfil actualizado correctamente');
  };

  const onLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí', onPress: () => signOut() },
    ]);
  };

  const deleteProperty = async (propertyId: string) => {
    Alert.alert('Eliminar propiedad', '¿Estás seguro de que deseas eliminar esta propiedad?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            const propertiesJson = await AsyncStorage.getItem('properties') || '[]';
            const properties = JSON.parse(propertiesJson);
            const filtered = properties.filter((p: Property) => p.id !== propertyId);
            await AsyncStorage.setItem('properties', JSON.stringify(filtered));
            loadUserProperties();
            Alert.alert('Éxito', 'Propiedad eliminada');
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la propiedad');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Mi Perfil</ThemedText>

        {/* User Info Section */}
        <View style={styles.profileCard}>
          {isEditing ? (
            <View style={styles.editForm}>
              <ThemedText style={styles.label}>Nombre</ThemedText>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nombre completo"
              />

              <ThemedText style={styles.label}>Teléfono</ThemedText>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Teléfono"
                keyboardType="phone-pad"
              />

              <ThemedText style={styles.label}>Email</ThemedText>
              <ThemedText style={styles.emailText}>{user?.email}</ThemedText>

              <View style={styles.editButtonContainer}>
                <Pressable
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => {
                    setName(user?.name || '');
                    setPhone(user?.phone || '');
                    setIsEditing(false);
                  }}
                >
                  <ThemedText style={styles.secondaryButtonText}>Cancelar</ThemedText>
                </Pressable>

                <Pressable style={styles.button} onPress={handleSaveProfile}>
                  <ThemedText style={styles.buttonText}>Guardar</ThemedText>
                </Pressable>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.label}>Nombre:</ThemedText>
                <ThemedText style={styles.value}>{user?.name}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.label}>Email:</ThemedText>
                <ThemedText style={styles.value}>{user?.email}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.label}>Teléfono:</ThemedText>
                <ThemedText style={styles.value}>{user?.phone}</ThemedText>
              </View>

              <Pressable
                style={[styles.button, styles.editButton]}
                onPress={() => setIsEditing(true)}
              >
                <ThemedText style={styles.buttonText}>Editar Perfil</ThemedText>
              </Pressable>
            </View>
          )}
        </View>

        {/* Properties Section */}
        <ThemedText type="subtitle" style={styles.propertiesTitle}>
          Mis Propiedades ({userProperties.length})
        </ThemedText>

        {userProperties.length > 0 ? (
          <FlatList
            data={userProperties}
            renderItem={({ item }) => (
              <View>
                <PropertyCard property={item} />
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteProperty(item.id)}
                >
                  <ThemedText style={styles.deleteButtonText}>Eliminar</ThemedText>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <ThemedText style={styles.emptyText}>
                No tienes propiedades publicadas. ¡Publica la primera!
              </ThemedText>
            }
          />
        ) : (
          <ThemedText style={styles.emptyText}>
            No tienes propiedades publicadas.
          </ThemedText>
        )}

        <Pressable style={styles.logoutButton} onPress={onLogout}>
          <ThemedText style={styles.logoutButtonText}>Cerrar Sesión</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafb',
  },
  title: {
    marginBottom: 20,
    fontSize: 28,
    color: '#1a1a1a',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  editForm: {
    gap: 12,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
    fontSize: 14,
    color: '#1a1a1a',
  },
  emailText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007A7A',
  },
  editButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#007A7A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: '#e8e8e8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 12,
  },
  propertiesTitle: {
    marginBottom: 12,
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
