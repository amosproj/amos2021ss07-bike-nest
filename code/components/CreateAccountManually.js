import React, { useState } from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';
import { UserDataService } from "../services/UserData";
import { styles } from "./EditPersonalInformation/styles";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_CheckBox from './BikeNest_CheckBox';
import BikeNest_Modal from './BikeNest_Modal';

export function CreateAccountManually() {
    let userdata = new UserDataService();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [isValidInput, setIsValidInput] = useState(false);
    const navigation = useNavigation();

    //TODO: real Validation + Checkbox
    let validateInput = () => {
        let isValid = newEmail() && (firstName.length > 0) && (lastName.length > 0) && (email.length > 0) && (password.length > 0);
        setIsValidInput(isValid);

        if (!newEmail()) {
            setModalText("Ein Account mit der Email " + email + " existiert bereits.");
        } else {
            if (isValid)
                setModalText("Hurra! Dein Account wurde erfolgreich eingerichtet");
            else
                setModalText("Oops da ist etwas schief gelaufen. Fülle bitte alle Felder aus.")
        }
        setModalVisible(true);
    }

    let onModalPress = () => {
        if (isValidInput) {
            setModalVisible(false);
            navigation.navigate("FindBikeNest");
        }
        else
            setModalVisible(false);
    }

    //TODO: real check
    let newEmail = () => {
        let isNewEmail = true;

        if (email === '1')
            isNewEmail = false;

        return isNewEmail;
    }

    //TODO: Replace Modal (not working in web)
    return (
        <View style={styles.container}>
            <BikeNest_Modal
                modalText={modalText}
                isVisible={modalVisible}
                onPress={() => onModalPress()}
                onRequestClose={() => { setModalVisible(!modalVisible); }}
            />
            <TextInput
                placeholder='Vorname'
                style={styles.inputField}
                onChangeText={setFirstName}
                value={firstName}
            />
            <TextInput
                placeholder='Name'
                style={styles.inputField}
                onChangeText={setLastName}
                value={lastName}
            />
            <TextInput
                placeholder='Email'
                style={styles.inputField}
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                placeholder="Passwort"
                secureTextEntry={true}
                style={styles.inputField}
                onChangeText={setPassword}
                value={password}
            />
            <BikeNest_CheckBox
                onPressText={() => Alert.alert("Lorem ipsum")}
                toggleText={"Datenschutzrichtlinien gelesen"}
                initialValue={false}
            />
            <Pressable style={mainStyles.buttonBig} onPress={() => validateInput()}>
                <Text style={styles.buttonText}>Los geht's</Text>
            </Pressable>
        </View>
    );
}

