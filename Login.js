import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    fontSize: 20,
    textAlign:'left',
  },
  textInput: {
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white', //  pour définir le fond blanc
    borderRadius: 8, // pour ajouter des coins arrondis
    paddingHorizontal: 10, // pour ajouter un espacement horizontal
    marginBottom: 10, //  pour ajouter un espacement en bas
    width: 300, // Définir la largeur souhaitée
    height: 40, // Définir la hauteur souhaitée
  },
  button: {
    width: 200, // Définir la largeur souhaitée
    height: 50, // Définir la hauteur souhaitée
    borderRadius: 10, // Définir le rayon des coins pour obtenir des bords arrondis
  },
  text2: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    fontSize: 10,
    
  },
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Obtenez la fonction de navigation
  const navigation = useNavigation();

  const handleSubmit = async() => {
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

