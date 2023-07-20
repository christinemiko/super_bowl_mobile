import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import GetAllFootballMatches from './GetAllFootballMatches';  
import GetOneFootballMatch from './GetOneFootballMatch';






const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Attendre que les polices soient chargées
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Connexion" component={LoginScreen} />
        <Stack.Screen name="Les Matchs / Paris" component={GetAllFootballMatches} />
        <Stack.Screen name="Détails du Match" component={GetOneFootballMatch} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

