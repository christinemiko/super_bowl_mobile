import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 50,
    alignSelf: 'stretch',
  },
  titleContainer2: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 50,
    alignSelf: 'stretch',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 300,
    height: 40,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  text2: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    fontSize: 10,
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    backgroundColor: '#2563EB',
    color: 'white',
    textAlign: 'center',
    marginTop: 10, 
    marginBottom: 20, 
    fontSize: 20,
  
  },
  label2: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    marginTop: 10, 
    marginBottom: 20, 
    fontSize: 20,
  
  },
  nlfLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  logoutContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
   
});

export default styles;
