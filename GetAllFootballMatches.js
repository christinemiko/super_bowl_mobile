import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';

const GetAllFootballMatches = () => {
  
  // Obtenez la fonction de navigation
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await fetch('https://super-bowl.christine-chau-projets.com/api/getfootballmatchesuser', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }

      const data = await response.json();
      console.log(data);

      setMatches(data);
    };

    fetchMatches();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwt');
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
  
         <View style={styles.logoutContainer}>
         <Button 
        title="Déconnexion" 
        onPress={handleLogout}
        color="black" 
        style={styles.logoutButton}
        />
        </View>

        <Image source={require('./assets/logo4.png')} style={styles.logo} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>LES MATCHS / PARIS </Text>
       </View>

      <FlatList
         data={matches}
         keyExtractor={item => item.id ? item.id.toString() : 'undefined'} 
         renderItem={({ item }) => (
          
          <View>
                <Image source={require('./assets/NLF.png')} style={styles.nlfLogo} />
                 <View style={styles.titleContainer2}>
                 <Text style={styles.title}>LE MATCH</Text>
                </View>
          <Text style={styles.label}>Les équipes : </Text>
          <Text style={styles.text}>{item.team1 && item.team2 ? `${item.team1.teamName} vs ${item.team2.teamName}` : 'undefined'}</Text>

          <Text style={styles.label}>Date : </Text>
          <Text style={styles.text}> {item.matchDate ? new Date(item.matchDate).toLocaleDateString('fr-FR', {
                   day: '2-digit', 
                   month: '2-digit', 
                   year: 'numeric' 
                  }) : 'undefined'}</Text>

          <Text style={styles.label}>Heure de début : </Text>
          <Text style={styles.text}>{item.hourStart ? `${new Date(item.hourStart).getHours()}:${new Date(item.hourStart).getMinutes()}` : 'undefined'}</Text>

          <Text style={styles.label}>Heure de fin : </Text>
          <Text style={styles.text}>{item.hourFinish ? `${new Date(item.hourFinish).getHours()}:${new Date(item.hourFinish).getMinutes()}` : 'undefined'}</Text>

          <Text style={styles.label}>Score du Match : </Text>
          <Text style={styles.text}>{item.scoreGame ? item.scoreGame.toString() : 'undefined'}</Text>

          <Text style={styles.label}>Statut du match : </Text>
          <Text style={styles.text}>{item.statut ? item.statut.toString() : 'undefined'}</Text>

          <Button 
          title="Détails" 
          color="orange" 
          onPress={() => navigation.navigate('Détails du Match', { footballMatchId: item.id })}
          />
          
          </View>

        )}
      />
      
    </View>
  );
};

export default GetAllFootballMatches;
