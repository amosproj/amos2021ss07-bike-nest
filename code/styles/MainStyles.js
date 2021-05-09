import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const mainStyles = StyleSheet.create({

  //Text
  h1: {
    fontSize: 39,
    letterSpacing: 4,
    fontWeight: "500",
    marginBottom: 16,
  },

  h2: {
    fontSize: 27,
    letterSpacing: 2,
    fontWeight: "400",
  },

  h3: {
    fontSize: 18,
    fontWeight: "300",
  },

  stdText:{
    fontSize: 14
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  inputField: {
    width: 328,
    height: 55,
    color: '#333333',
    backgroundColor: Colors.UI_Light_4,
    borderRadius: 15,
    margin: 9,
    paddingLeft: 12,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.UI_Light_4
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 30
  },
  checkbox: {
    borderRadius: 2,
    alignSelf: "center",
  },
  checkboxText: {
    margin: 8,
  },

  //Buttons
  buttonBig: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 328,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: Colors.UI_Light_2
  },
  buttonMedium: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 198,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: Colors.UI_Light_2
  },
  buttonSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 128,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: Colors.UI_Light_2
  },

});