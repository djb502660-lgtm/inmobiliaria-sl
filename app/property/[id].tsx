import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PROPERTIES } from '@/app/data/properties';
import { Property } from '@/app/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      // Primero buscar en propiedades de demostración
      const mockProperty = PROPERTIES.find((p) => p.id === id);
      if (mockProperty) {
        setProperty(mockProperty);
        setLoading(false);
        return;
      }

      // Si no está en demo, buscar en propiedades del usuario
      const userPropertiesJson = await AsyncStorage.getItem('properties') || '[]';
      const userProperties = JSON.parse(userPropertiesJson);
      const userProperty = userProperties.find((p: Property) => p.id === id);
      
      if (userProperty) {
        setProperty(userProperty);
      }
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafb' }}>
        <ActivityIndicator size="large" color="#007A7A" />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Propiedad no encontrada.</ThemedText>
      </ThemedView>
    );
  }

  const formatPrice = (price: number, type: 'sale' | 'rent') => {
    const formatted = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
    return type === 'rent' ? `${formatted}/mes` : formatted;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['bottom']}>
      <Stack.Screen options={{ title: property.title, headerBackTitle: 'Volver' }} />
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
          {property.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.galleryImage} />
          ))}
        </ScrollView>

        <ThemedView style={styles.contentContainer}>
          <ThemedText type="title" style={styles.title}>{property.title}</ThemedText>
          <ThemedText style={styles.address}>{property.address}</ThemedText>

          <ThemedView style={styles.priceContainer}>
            <ThemedText type="subtitle" style={styles.price}>{formatPrice(property.price, property.type)}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.featuresContainer}>
            <View style={styles.feature}>
              <ThemedText type="defaultSemiBold">{property.bedrooms}</ThemedText>
              <ThemedText style={styles.featureText}> Dormitorios</ThemedText>
            </View>
            <View style={styles.feature}>
              <ThemedText type="defaultSemiBold">{property.bathrooms}</ThemedText>
              <ThemedText style={styles.featureText}> Baños</ThemedText>
            </View>
            <View style={styles.feature}>
              <ThemedText type="defaultSemiBold">{property.area}</ThemedText>
              <ThemedText style={styles.featureText}> m²</ThemedText>
            </View>
          </ThemedView>

          <ThemedView style={styles.descriptionContainer}>
            <ThemedText type="subtitle">Descripción</ThemedText>
            <ThemedText style={styles.description}>{property.description}</ThemedText>
          </ThemedView>

        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gallery: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 350,
    height: 250,
    marginRight: 10,
    borderRadius: 8,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
  },
  address: {
    color: '#666',
    marginBottom: 16,
    fontSize: 16,
  },
  priceContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F0F8F8',
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  price: {
    color: '#007A7A',
    fontWeight: 'bold',
    fontSize: 22,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    color: '#666',
  },
  descriptionContainer: {
    
  },
  description: {
    marginTop: 8,
    lineHeight: 24,
    color: '#333',
  }
});
