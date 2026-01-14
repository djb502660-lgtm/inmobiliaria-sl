import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Property } from '@/app/types';
import { ThemedView } from './themed-view';
import { Link } from 'expo-router';

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number, type: 'sale' | 'rent') => {
    const formatted = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
    return type === 'rent' ? `${formatted}/mes` : formatted;
  };

  return (
    <Link href={`/property/${property.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <ThemedView style={[styles.card, pressed && styles.cardPressed]}>
            <Image source={{ uri: property.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <ThemedText type="subtitle" style={styles.title} numberOfLines={1}>{property.title}</ThemedText>
              <ThemedText style={styles.address} numberOfLines={1}>{property.address}</ThemedText>
              <ThemedText type="title" style={styles.price}>
                {formatPrice(property.price, property.type)}
              </ThemedText>
            </View>
          </ThemedView>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.05,
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 4,
  },
  address: {
    color: '#666',
    marginBottom: 12,
  },
  price: {
    color: '#007A7A',
  },
});
