import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    backgroundColor: 'white', //  pour définir le fond blanc
    borderRadius: 8, // pour ajouter des coins arrondis
    paddingHorizontal: 10, // pour ajouter un espacement horizontal
    marginBottom: 10, //  pour ajouter un espacement en bas
  },
});
