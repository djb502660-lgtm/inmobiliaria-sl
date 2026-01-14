
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Switch, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AddPropertyScreen() {
  const [isForSale, setIsForSale] = useState(true);
  const [propertyType, setPropertyType] = useState('Casa');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleAddProperty = () => {
    // TODO: Implement property creation logic
    console.log({
      isForSale,
      propertyType,
      city,
      address,
      price,
      description,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Agregar Propiedad</ThemedText>
      <View style={styles.switchContainer}>
        <ThemedText>Arriendo</ThemedText>
        <Switch
          value={isForSale}
          onValueChange={setIsForSale}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isForSale ? '#f5dd4b' : '#f4f3f4'}
        />
        <ThemedText>Venta</ThemedText>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Agregar Propiedad" onPress={handleAddProperty} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
