import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_CheckBox from './BikeNest_CheckBox';
import BikeNest_Modal from './BikeNest_Modal';
import BikeNest_Button, { ButtonStyle } from './BikeNest_Button';
import BikeNest_TextInput from './BikeNest_TextInput';
import {UserService} from "../services/UserService";

export function CreateAccountManually() {
    let userSerivce = new UserService();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);
    const navigation = useNavigation();

    //TODO: real Validation + Checkbox
    let validateInput = () => {
        let isValid = (firstName.length > 0) && (lastName.length > 0) && (email.length > 0) && (password.length > 0);

        if (isValid) {
            tryCreateAccount();
        }
        else {
            setModalInfo(false,
                "Oops da ist etwas schief gelaufen. Fülle bitte alle Felder mit den passenden Infos aus.");
        }
    }

    let onModalPress = () => {
        if (accountCreated) {
            setModalVisible(false);
            navigation.navigate("Login");
        }
        else
            setModalVisible(false);
    }

    //TODO: real check
    // let newEmail = () => {
    //     let isNewEmail = true;

    //     if (email === '1')
    //         isNewEmail = false;

    //     return isNewEmail;
    // }

    let setModalInfo = (success, message) => {
        if(success){
            setModalHeadline("Hurra!");
            setModalText("Dein Account wurde erfolgreich erstellt.")
        } else {
            setModalHeadline("Oops!");
            setModalText(message);
        }

        setModalVisible(true);
    }

    let tryCreateAccount = () => {
        let name = firstName;
        let lastname = lastName;
        let data = { name, lastname, email, password };
        userSerivce.registerUser(email, password, name, lastName).then(response =>{
            setAccountCreated(true);
            setModalInfo(true, "Dein Account wurde erfolgreich erstellt!");
        }).catch(error =>{
            setAccountCreated(false);
            if(error.display){
                setModalInfo(false, error.message);
            }else{
                setModalInfo(false, "Ein unbekannter Fehler ist aufgetreten!");
            }
        })
    }

    //TODO: Replace Modal (not working in web)
    return (
        <View style={[mainStyles.container, { backgroundColor: 'transparent' }]}>
            <BikeNest_Modal
                modalHeadLine={modalHeadline}
                modalText={modalText}
                isVisible={modalVisible}
                onPress={() => onModalPress()}
                onRequestClose={() => { setModalVisible(!modalVisible); }}
            />
            <BikeNest_TextInput
                placeholder='Vorname'
                onChangeText={(firstName) => setFirstName(firstName)}
                value={firstName}
            />
            <BikeNest_TextInput
                placeholder='Name'
                onChangeText={(lastName) => setLastName(lastName)}
                value={lastName}
            />
            <BikeNest_TextInput
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
                value={email}
            />
            <BikeNest_TextInput
                placeholder="Passwort"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                value={password}
            />
            <BikeNest_CheckBox
                onPressText={() => Alert.alert("Lorem ipsum")}
                toggleText={"Datenschutzrichtlinien gelesen"}
                initialValue={false}
            />
            <BikeNest_Button
                type={ButtonStyle.big}
                text="Los geht's!"
                onPress={() => validateInput()}
            />
        </View>
    );
}

