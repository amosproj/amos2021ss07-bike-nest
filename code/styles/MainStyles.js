import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const mainstyles = StyleSheet.create({
  container:{
    backgroundColor: '#ffffff',
    padding: "10px",
    // fontFamily: "montserrat",
    flex: 1,
    alignItems: 'center',
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 30
  },
  h2: {
    fontSize: 20,
  },
  h3: {
    fontSize: 18,
  },
  p: {
    fontSize: 16,
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
    backgroundColor: Colors.UI_Light_2
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
    backgroundColor: Colors.UI_Light_4,
    borderRadius: 15,
    margin: 9,
    paddingLeft: 12,
  },
  inputFieldHalf:{
    display: 'flex',
    alignSelf: 'flex-end',
    width: 200,
    height: 55,
    color: Colors.UI_Light_3,
    backgroundColor: Colors.UI_Light_4,
    borderRadius: 15,
    marginLeft: 120,
    margin: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.UI_Light_4
  },
  checkbox: {
    borderRadius: 2,
    alignSelf: "center",
  },
  checkboxText: {
    margin: 8,
  }


});