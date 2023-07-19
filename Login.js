import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'; // Importez les styles depuis styles.js


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('username:', email);
  console.log('password:', password);

  // Obtenez la fonction de navigation
  const navigation = useNavigation();
  

  const handleSubmit = async() => {
    try {
      const response = await fetch('https://super-bowl.christine-chau-projets.com/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData); // Log the error response data
        throw new Error('Échec de la connexion');
      }
  
      const data = await response.json();
      console.log('Response data:', data); // Log the success response data
  
        // Stocker le jeton JWT dans AsyncStorage
        await AsyncStorage.setItem('jwt', data.token);

      // Naviguer vers l'écran suivant
      navigation.navigate("Les Matchs / Paris");
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Échec de la connexion');
    }
  };
  return (
    <View style={styles.container}>
       <Image source={require('./assets/logo4.png')} style={styles.logo} />
      <Text style={[styles.title, { marginTop: 50 }]}>Connexion</Text>
      <Text style={[styles.text, { marginTop: 20 }]}>Email</Text>
      <TextInput style={[styles.textInput, { marginTop: 10 }]}
        placeholder="Entrez votre email"
        value={email}
        onChangeText={setEmail}
      
      />
      <Text style={[styles.text, { marginTop: 20 }]}>Mot de passe</Text>
      <TextInput
        style={[styles.textInput, { marginTop: 10, marginBottom: 50 }]}
        placeholder="Entrez votre Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      
      />
        <Button
        title="Se Connecter"
        onPress={handleSubmit}
        color="#2563EB"
        buttonStyle={styles.button}
        />

       <Text style={[styles.text2, { marginTop: 20 }]}>Informations légales © Tous Droits réservés</Text>
     
    </View>
  );
};

export default LoginScreen;

