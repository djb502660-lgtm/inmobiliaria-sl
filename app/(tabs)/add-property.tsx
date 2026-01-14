
import { Property } from '@/app/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function AddPropertyScreen() {
  const { user } = useAuth();
  const [isForSale, setIsForSale] = useState(true);
  const [propertyType, setPropertyType] = useState('Casa');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const propertyTypes = ['Casa', 'Apartamento', 'Oficina', 'Terreno', 'Otro'];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'El título es requerido';
    if (!city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!address.trim()) newErrors.address = 'La dirección es requerida';
    if (!price || isNaN(Number(price))) newErrors.price = 'El precio debe ser un número válido';
    if (!bedrooms || isNaN(Number(bedrooms)) || Number(bedrooms) < 0) newErrors.bedrooms = 'Número de dormitorios inválido';
    if (!bathrooms || isNaN(Number(bathrooms)) || Number(bathrooms) < 0) newErrors.bathrooms = 'Número de baños inválido';
    if (!area || isNaN(Number(area)) || Number(area) <= 0) newErrors.area = 'El área debe ser un número válido y mayor que 0';
    if (!description.trim()) newErrors.description = 'La descripción es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProperty = async () => {
    if (!validateForm()) {
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Debes estar autenticado para publicar propiedades');
      return;
    }

    setIsLoading(true);
    try {
      // Crear nueva propiedad
      const newProperty: Property = {
        id: Date.now().toString(),
        title: title.trim(),
        address: address.trim(),
        city: city.trim(),
        price: Number(price),
        type: isForSale ? 'sale' : 'rent',
        image: imageUrl || 'https://picsum.photos/seed/property' + Date.now() + '/700/500',
        description: description.trim(),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        images: [imageUrl || 'https://picsum.photos/seed/property' + Date.now() + '/1024/768'],
        userId: user.id,
        publishedAt: new Date().toISOString(),
        propertyType: propertyType as any,
      };

      // Obtener propiedades existentes y agregar la nueva
      const propertiesJson = await AsyncStorage.getItem('properties') || '[]';
      const properties = JSON.parse(propertiesJson);
      properties.push(newProperty);
      await AsyncStorage.setItem('properties', JSON.stringify(properties));

      // Limpiar formulario
      setTitle('');
      setCity('');
      setAddress('');
      setPrice('');
      setBedrooms('');
      setBathrooms('');
      setArea('');
      setDescription('');
      setImageUrl('');
      setErrors({});

      Alert.alert('Éxito', 'Propiedad publicada correctamente', [
        { text: 'OK' }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo publicar la propiedad');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Publicar Propiedad</ThemedText>

        {/* Type Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>¿Deseas vender o alquilar?</ThemedText>
          <View style={styles.switchContainer}>
            <ThemedText style={[styles.typeLabel, !isForSale && styles.activeLabel]}>
              Alquiler
            </ThemedText>
            <Switch
              value={isForSale}
              onValueChange={setIsForSale}
              trackColor={{ false: '#E0E0E0', true: '#E0E0E0' }}
              thumbColor={isForSale ? '#007A7A' : '#999'}
            />
            <ThemedText style={[styles.typeLabel, isForSale && styles.activeLabel]}>
              Venta
            </ThemedText>
          </View>
        </View>

        {/* Property Type */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Tipo de Propiedad</ThemedText>
          <View style={styles.typeButtonsContainer}>
            {propertyTypes.map((type) => (
              <Pressable
                key={type}
                style={[
                  styles.typeButton,
                  propertyType === type && styles.typeButtonActive,
                ]}
                onPress={() => setPropertyType(type)}
              >
                <Text style={[
                  styles.typeButtonText,
                  propertyType === type && styles.typeButtonTextActive,
                ]}>
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Título de la Propiedad</ThemedText>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Ej: Villa Moderna con Vistas al Mar"
            value={title}
            onChangeText={setTitle}
            editable={!isLoading}
          />
          {errors.title && <ThemedText style={styles.errorText}>{errors.title}</ThemedText>}

          <ThemedText style={styles.label}>Ciudad</ThemedText>
          <TextInput
            style={[styles.input, errors.city && styles.inputError]}
            placeholder="Ej: Madrid, Barcelona"
            value={city}
            onChangeText={setCity}
            editable={!isLoading}
          />
          {errors.city && <ThemedText style={styles.errorText}>{errors.city}</ThemedText>}

          <ThemedText style={styles.label}>Dirección</ThemedText>
          <TextInput
            style={[styles.input, errors.address && styles.inputError]}
            placeholder="Ej: Calle Principal 123"
            value={address}
            onChangeText={setAddress}
            editable={!isLoading}
          />
          {errors.address && <ThemedText style={styles.errorText}>{errors.address}</ThemedText>}
        </View>

        {/* Price and Details */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>
            Precio ({isForSale ? '€' : '€/mes'})
          </ThemedText>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            placeholder="Ej: 250000"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            editable={!isLoading}
          />
          {errors.price && <ThemedText style={styles.errorText}>{errors.price}</ThemedText>}

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <ThemedText style={styles.label}>Dormitorios</ThemedText>
              <TextInput
                style={[styles.input, errors.bedrooms && styles.inputError]}
                placeholder="0"
                value={bedrooms}
                onChangeText={setBedrooms}
                keyboardType="number-pad"
                editable={!isLoading}
              />
              {errors.bedrooms && <ThemedText style={styles.errorText}>{errors.bedrooms}</ThemedText>}
            </View>

            <View style={styles.halfInput}>
              <ThemedText style={styles.label}>Baños</ThemedText>
              <TextInput
                style={[styles.input, errors.bathrooms && styles.inputError]}
                placeholder="0"
                value={bathrooms}
                onChangeText={setBathrooms}
                keyboardType="number-pad"
                editable={!isLoading}
              />
              {errors.bathrooms && <ThemedText style={styles.errorText}>{errors.bathrooms}</ThemedText>}
            </View>
          </View>

          <ThemedText style={styles.label}>Área (m²)</ThemedText>
          <TextInput
            style={[styles.input, errors.area && styles.inputError]}
            placeholder="Ej: 150"
            value={area}
            onChangeText={setArea}
            keyboardType="decimal-pad"
            editable={!isLoading}
          />
          {errors.area && <ThemedText style={styles.errorText}>{errors.area}</ThemedText>}
        </View>

        {/* Description and Image */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Descripción</ThemedText>
          <TextInput
            style={[styles.descriptionInput, errors.description && styles.inputError]}
            placeholder="Describe los detalles, características especiales, etc."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            editable={!isLoading}
          />
          {errors.description && <ThemedText style={styles.errorText}>{errors.description}</ThemedText>}

          <ThemedText style={styles.label}>URL de la Imagen (Opcional)</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="https://ejemplo.com/imagen.jpg"
            value={imageUrl}
            onChangeText={setImageUrl}
            editable={!isLoading}
          />
        </View>

        {/* Submit Button */}
        <Pressable
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleAddProperty}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.submitButtonText}>Publicar Propiedad</ThemedText>
          )}
        </Pressable>

        <View style={{ height: 20 }} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafb',
  },
  container: {
    padding: 16,
    backgroundColor: '#f8fafb',
  },
  title: {
    marginBottom: 24,
    fontSize: 28,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  typeLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#007A7A',
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  typeButtonActive: {
    backgroundColor: '#007A7A',
    borderColor: '#007A7A',
  },
  typeButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 14,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  descriptionInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  submitButton: {
    backgroundColor: '#007A7A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
