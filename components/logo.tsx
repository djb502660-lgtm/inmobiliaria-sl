import { ThemedText } from '@/components/themed-text';
import { View, StyleSheet } from 'react-native';

export function Logo() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.logoText}>Inmo</ThemedText>
      <ThemedText style={[styles.logoText, styles.highlight]}>SL</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
  highlight: {
    color: '#007A7A',
  },
});
