import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';

const GetOneFootballMatch = () => {
  const navigation = useNavigation();
  const [footballMatch, setFootballMatch] = useState(null);
  const [sportbet, setSportbet] = useState(null);

  const route = useRoute();

  // récupère un footballmatch avec lid passer dans lurl.
  useEffect(() => {
    const fetchFootballMatch = async () => {
      const jwt = await AsyncStorage.getItem('jwt');
     

      const response = await fetch(`https://super-bowl.christine-chau-projets.com/api/footballmatch/${footballMatchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch football match');
      }

      const data = await response.json();

      setFootballMatch(data);
    };

    // Récupère tous les paris pour un footballmatch avec son Id
    const fetchSportbet = async () => {
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await fetch(`https://super-bowl.christine-chau-projets.com/api/footballmatch/${footballMatchId}/getsportbet`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user sport bets');
      }

      const data = await response.json();
      console.log(data);
      setSportbet(data);

    };

    const footballMatchId = route.params.footballMatchId; // Déplacer la déclaration de footballMatchId ici
    fetchFootballMatch();
    fetchSportbet();
  }, []);

  return (
    <View style={styles.container}>
       <Image source={require('./assets/logo4.png')} style={styles.logo} />
      {footballMatch && (
           <View>
          <View style={styles.titleContainer}>       
          <Text style={styles.title}>Détails du Match:</Text>
          </View>

          <Text style={styles.label}>Statut du match : </Text>
          <Text style={styles.text}>{footballMatch.statut}</Text>

          <Text style={styles.label}>Les équipes : </Text>
          <Text style={styles.text}>{footballMatch.team1.teamName} vs {footballMatch.team2.teamName}</Text>
          
          <Text style={styles.label}>Date : </Text>
          <Text style={styles.text}>{footballMatch.matchDate ? new Date(footballMatch.matchDate).toLocaleDateString('fr-FR', {
                   day: '2-digit', 
                   month: '2-digit', 
                   year: 'numeric' 
                  }) : 'undefined'}</Text>
          
          <Text style={styles.label}>Heure de début : </Text>
          <Text style={styles.text}>{footballMatch.hourStart ? `${new Date(footballMatch.hourStart).getHours()}:${new Date(footballMatch.hourStart).getMinutes()}` : 'undefined'}</Text>
          
          <Text style={styles.label}>Heure de fin : </Text>
          <Text style={styles.text}>{footballMatch.hourFinish ? `${new Date(footballMatch.hourFinish).getHours()}:${new Date(footballMatch.hourFinish).getMinutes()}` : 'undefined'}</Text>
          <Text style={styles.label2}>Votre Pari: </Text>
        </View>
      )}

      {sportbet && (
        <View>
          
          <Text style={styles.text}>Mise:{sportbet.wagerMade !== null ? sportbet.wagerMade.toString() : 'NULL'}</Text>
          <Text style={styles.text}>Gains:{sportbet.moneyGain !== null ? sportbet.moneyGain.toString() : 'NULL'}</Text>
          <Text style={styles.text}>Pertes:{sportbet.moneyLose !== null ? sportbet.moneyLose.toString() : 'NULL'}</Text>

           <View style={styles.titleContainer}>       
          <Text style={styles.title}>Votre Pari:</Text>
          </View>

          <Text style={styles.text}>{sportbet.wagerMade !== null ? sportbet.wagerMade.toString() : 'NULL'}</Text>
          <Text style={styles.text}>{sportbet.moneyGain !== null ? sportbet.moneyGain.toString() : 'NULL'}</Text>
          <Text style={styles.text}>{sportbet.moneyLose !== null ? sportbet.moneyLose.toString() : 'NULL'}</Text>

        </View>
      )}
    </View>
  );
};

export default GetOneFootballMatch;
