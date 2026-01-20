import { PROPERTIES } from '@/app/data/properties';
import { Property } from '@/app/types';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { PropertyCard } from '@/components/property-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';

export default function HomeScreen() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      // Obtener propiedades publicadas por usuarios
      const userPropertiesJson = await AsyncStorage.getItem('properties') || '[]';
      const userProperties = JSON.parse(userPropertiesJson);

      // Combinar propiedades mock con propiedades de usuarios
      const combined = [...PROPERTIES, ...userProperties];
      setAllProperties(combined);
      setFilteredProperties(combined);
    } catch (error) {
      console.error('Error loading properties:', error);
      setAllProperties(PROPERTIES);
      setFilteredProperties(PROPERTIES);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProperties(allProperties);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = allProperties.filter((property) =>
      property.title.toLowerCase().includes(lowerQuery) ||
      property.city.toLowerCase().includes(lowerQuery) ||
      property.address.toLowerCase().includes(lowerQuery)
    );
    setFilteredProperties(filtered);
  };

  // Recargar propiedades cuando la pantalla está enfocada
  useEffect(() => {
    const unsubscribe = setInterval(() => {
      loadProperties();
    }, 2000);

    return () => clearInterval(unsubscribe);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F4F8', dark: '#E8F4F8' }}
      headerImage={
        <IconSymbol
          name="house.fill"
          size={200}
          style={styles.headerImage}
          color="rgba(0, 122, 122, 0.1)"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Encuentra tu Hogar Ideal</ThemedText>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          placeholder="Busca por ciudad, dirección..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
          selectionColor="#007A7A"
        />
        <IconSymbol name="magnifyingglass" size={20} color="#666" style={styles.searchIcon} />
      </ThemedView>

      {filteredProperties.length > 0 ? (
        <FlatList
          data={filteredProperties}
          renderItem={({ item }) => <PropertyCard property={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>
            No se encontraron propiedades. Intenta con otras palabras clave.
          </ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingBottom: 24,
  },
  headerImage: {
    bottom: 30,
    right: 30,
    position: 'absolute',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  searchIcon: {
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
});
