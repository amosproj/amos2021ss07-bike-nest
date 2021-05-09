import React, { useState } from 'react';
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native';
import { UserDataService } from "../services/UserData";
import { styles } from "./EditPersonalInformation/styles";
import { useNavigation } from '@react-navigation/native';
import { Alert, Modal } from 'react-native';
import { mainStyles } from "../styles/MainStyles";
import CheckBox from '@react-native-community/checkbox';

export function CreateAccountManually() {
    let userdata = new UserDataService();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [isValidInput, setIsValidInput] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={stylesTest.modalContainer}>
                    <View style={stylesTest.modalContentContainer}>
                        <Text style={mainStyles.stdText}>{modalText}</Text>
                        <Pressable style={mainStyles.buttonSmall} onPress={() => onModalPress()}>
                            <Text style={styles.buttonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
            <View style={styles.checkBoxContainer}>
                <Text style={styles.checkboxText}
                    onPress={() => Alert.alert("Lorem ipsum")}>Datenschutzrichtlinien gelesen</Text>
                <CheckBox style={styles.checkbox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    value={toggleCheckBox}
                />
            </View>
            <Pressable style={mainStyles.buttonBig} onPress={() => validateInput()}>
                <Text style={styles.buttonText}>Los geht's</Text>
            </Pressable>
        </View>
    );
}

const stylesTest = StyleSheet.create({
    modalContentContainer: {
        width: 288,
        height: 184,
        borderRadius: 15,
        justifyContent: 'center',
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

    }
});