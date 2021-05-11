import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { UserDataService } from "../services/UserData";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_CheckBox from './BikeNest_CheckBox';
import BikeNest_Modal from './BikeNest_Modal';
import BikeNest_Button, { ButtonStyle } from './BikeNest_Button';
import BikeNest_TextInput from './BikeNest_TextInput';

export function CreateAccountManually() {
    let userdata = new UserDataService();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");
    const [isValidInput, setIsValidInput] = useState(false);
    const navigation = useNavigation();

    //TODO: real Validation + Checkbox
    let validateInput = () => {
        let isValid = newEmail() && (firstName.length > 0) && (lastName.length > 0) && (email.length > 0) && (password.length > 0);
        setIsValidInput(isValid);

        if (!newEmail()) {
            setModalHeadline("Sorry!");
            setModalText("Ein Account mit der Email " + email + " existiert bereits.");
        } else {
            if (isValid) {
                setModalHeadline("Hurra!");
                setModalText("Dein Account wurde erfolgreich eingerichtet");
            }
            else {
                setModalHeadline("Sorry!");
                setModalText("Oops da ist etwas schief gelaufen. Fülle bitte alle Felder aus.")
            }
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
        <View style={mainStyles.container}>
            <BikeNest_Modal
                modalHeadLine={modalHeadline}
                modalText={modalText}
                isVisible={modalVisible}
                onPress={() => onModalPress()}
                onRequestClose={() => { setModalVisible(!modalVisible); }}
            />
            <BikeNest_TextInput
                placeholder='Vorname'
                onChangeText={setFirstName}
                value={firstName}
            />
            <BikeNest_TextInput
                placeholder='Name'
                onChangeText={setLastName}
                value={lastName}
            />
            <BikeNest_TextInput
                placeholder='Email'
                onChangeText={setEmail}
                value={email}
            />
            <BikeNest_TextInput
                placeholder="Passwort"
                secureTextEntry={true}
                onChangeText={setPassword}
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
