import { StyleSheet, View, TextInput, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PROPERTIES } from '@/app/data/properties';
import { PropertyCard } from '@/components/property-card';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          name="house.fill"
          size={200}
          style={styles.headerImage}
          color="rgba(255,255,255,0.5)"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Encuentra tu Hogar Ideal</ThemedText>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          placeholder="Busca por ciudad, dirección..."
          style={styles.searchInput}
        />
        <IconSymbol name="magnifyingglass" size={20} color="#666" style={styles.searchIcon} />
      </ThemedView>
      
      <FlatList
        data={PROPERTIES}
        renderItem={({ item }) => <PropertyCard property={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false} // Important to disable scrolling on FlatList inside ParallaxScrollView
      />

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
  },
  searchIcon: {
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
  }
});
