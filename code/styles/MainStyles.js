import { StyleSheet } from 'react-native';
import colors from './Colors';

export const mainStyles = StyleSheet.create({
  //Text
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 30,
    padding: 15
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

  stdText: {
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 328,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: colors.UI_Light_2
  },
  label:{
    fontSize: 18,
    display: 'flex',
    width: 150,
    alignSelf: 'flex-start',
  },
  inputField: {
    width: 328,
    height: 55,
    color: '#333333',
    backgroundColor: colors.UI_Light_4,
    borderRadius: 15,
    margin: 9,
    paddingLeft: 12,
  },
  checkbox: {
    borderRadius: 2,
    alignSelf: "center",
  },
  checkboxText: {
    margin: 8,
  },

  //Modal
  modalContentContainer: {
    width: 288,
    height: 184,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    padding: 18,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090',

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
    backgroundColor: colors.UI_Light_2,
    padding: 18,
  },
  buttonMedium: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 198,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: colors.UI_Light_2,
    padding: 18
  },
  buttonSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 128,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: colors.UI_Light_2,
    padding: 18
  },

  buttonText: {
    fontSize: 14,
    color: colors.UI_Light_4,
    textAlign: 'center',
    height: '100%',
    width: '100%',
    // flex: 1,
  },
  buttonImageRow: {
    position: 'absolute',
    width: 32,
    height: 32,
    left: 18,
    top: 0
  },
  buttonImageColumn: {
    margin: 5,
  },
  nestedButtonViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nestedButtonViewColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  navigationBar: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'flex-start'
  },

  buttonNavigationBar: {
    flex: 1,
    backgroundColor: colors.UI_Light_2,
    padding: 5,
  },

  //For ImageBackground needed
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  scrollview: {
    backgroundColor: 'transparent'
  },

});