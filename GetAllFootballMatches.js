import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const GetAllFootballMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await fetch('http://127.0.0.1:8000/api/getfootballmatchesuser', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }

      const data = await response.json();

      setMatches(data);
    };

    fetchMatches();
  }, []);

  return (
    <View>
      <FlatList
        data={matches}
        keyExtractor={item => item.id.toString()}  // Assure que chaque match est retouvé avec la propriété 'id' unique
        renderItem={({ item }) => (
          <View>
             <Text>{item.team1} vs {item.team2}</Text>  // Affiche les noms des deux équipes
             <Text>{item.date}</Text>  // Affiche la date du match
             <Text>{item.hourStart}</Text>  // Affiche lheure de début du match
             <Text>{item.hourFinish}</Text>  // Affiche lheure de fin du match
             <Text>{item.scoreGame}</Text>  // Affiche le score du match
          </View>
        )}
      />
    </View>
  );
};

export default GetAllFootballMatches;
