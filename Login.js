import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    fontSize: 16,
  },
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Obtenez la fonction de navigation
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      const data = await response.json();

        // Stocker le jeton JWT dans AsyncStorage
        await AsyncStorage.setItem('jwt', data.token);

      // Naviguer vers l'écran suivant
      navigation.navigate('MainScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Échec de la connexion');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.text}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.text}
      />
      <Button title="Se Connecter" onPress={handleSubmit} />
     
    </View>
  );
};

export default LoginScreen;

