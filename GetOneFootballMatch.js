import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const GetOneFootballMatch = () => {
  const [footballMatch, setFootballMatch] = useState(null);
  const [sportbet, setSportbet] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchFootballMatch = async () => {
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await fetch('http://127.0.0.1:8000/api/getfootballmatchesuser', {
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

    const fetchUserSportbets = async () => {
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await fetch('http://127.0.0.1:8000/api/usersportbets', {
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

      setSportbet(data);
    };

    fetchFootballMatch();
    fetchUserSportbets();
  }, []);

  return (
    <View>
      {footballMatch && (
        <View>
          <Text>Détails du Match:</Text>
          <Text>statut: {footballMatch.statut}</Text>
          <Text>{footballMatch.team1} vs {footballMatch.team2}</Text>
          <Text>Date: {footballMatch.matchDate}</Text>
          <Text>Heure de début: {footballMatch.hourStart}</Text>
          <Text>Heure de fin: {footballMatch.hourFinish}</Text>
        </View>
      )}

      {sportbet && (
        <View>
          <Text>Votre Pari:</Text>
          <Text>Mise: {sportbet.wagerMade}</Text>
          <Text>Gains: {sportbet.moneyGain}</Text>
          <Text>Pertes: {sportbet.moneyLose}</Text>
        </View>
      )}
    </View>
  );
};

export default GetOneFootballMatch;
