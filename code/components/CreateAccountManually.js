import React, { useState } from 'react';
import { View } from 'react-native';
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
    const [accountCreated, setAccountCreated] = useState(false);
    const navigation = useNavigation();

    //TODO: real Validation + Checkbox
    let validateInput = () => {
        let isValid = (firstName.length > 0) && (lastName.length > 0) && (email.length > 0) && (password.length > 0);
        setIsValidInput(isValid);

        if (isValid) {
            tryCreateAccount();
        }
        else {
            setModalHeadline("Sorry!");
            setModalText("Oops da ist etwas schief gelaufen. Fülle bitte alle Felder mit den passenden Infos aus.");
            setModalVisible(true);
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

    let setModalInfo = (json) => {
        //setAccountCreated(json.accountCreated);
        //setAccountCreated(json.mockAccountCreated);

        //TODO: Refactor when backend is ready
        if (json.error != null) {
            setModalHeadline("Oops!");
            setModalText(json.error);
            setAccountCreated(false);
        }
        else if (json.message === "Error: Username is already taken!") {
            setModalHeadline("Oops!");
            setModalText("Der Benutzername existiert bereits!");
            setAccountCreated(false);
        }
        else if (json.message === "User registered successfully!") {
            setModalHeadline("Hurra!");
            setModalText("Dein Account wurde erfolgreich eingerichtet");
            setAccountCreated(true);
        }
        else if (json.message === "Error: Email is already in use!") {
            setModalHeadline("Oops!!");
            setModalText("Die Email wird schon verwendet, versuche es mit einer anderen Email.");
            setAccountCreated(true);
        }
        else {
            setModalHeadline("Oops!!");
            setModalText("Etwas ist schief gelaufen versuche es nochmale");
            setAccountCreated(false);
        }

        setModalVisible(true);
    }

    let tryCreateAccount = () => {
        let username = firstName;
        let data = { username, email, password };

        return fetch("http://192.168.2.129:9000/usermanagement/signup", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setModalInfo(json);
            })
            .catch((error) => {
                setModalHeadline("Sorry!");
                setModalText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
                setModalVisible(true);
                console.error(error);
            });
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

