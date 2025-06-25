import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'user_id_proof_image'
const { height } = Dimensions.get('window')

const IdProof = () => {
  const [imageUri, setImageUri] = useState<string | null>(null)

  useEffect(() => {
    const loadImage = async () => {
      const savedUri = await AsyncStorage.getItem(STORAGE_KEY)
      if (savedUri) setImageUri(savedUri)
    }
    loadImage()
  }, [])

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) return alert('Permission required!')

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setImageUri(uri)
      await AsyncStorage.setItem(STORAGE_KEY, uri)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload ID Proof</Text>
      <Button title="Pick ID Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  image: {
    width: '100%',
    height: height * 0.7,
    marginTop: 10,
    borderRadius: 10,
    resizeMode: 'contain',
    borderColor: 'black',
    borderWidth: 2,
  },
})

export default IdProof
