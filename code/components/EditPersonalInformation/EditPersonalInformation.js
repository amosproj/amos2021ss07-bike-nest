import React, { useState } from 'react';
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native';
import { styles } from "./styles";
import { UserService } from '../../services/UserService';
import BikeNest_Modal from '../BikeNest_Modal';
import global from '../GlobalVars';

export default function EditPersonalInformation() {
    let userService = new UserService();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");

    let saveData = () => {
        userService.changePersonalInformation(firstName, lastName, email, password).then((jwt) => {
            console.log("okay 1");
            global.saveAuthenticationToken(jwt).then(() => {
                console.log("okay 2");
                setModalHeadline("Hurra!");
                setModalText("Deine Informationen wurden erfolgreich geändert.");
            });
        }).catch(error => {
            console.log("fehler");
            if (error.display) {
                setModalHeadline("Oops!");
                setModalText(error.message);
            } else {
                setModalHeadline("Oops!")
                setModalText("Da ist wohl etwas schief gelaufen. Bitte versuche es noch einmal.");
            }
        })

        setModalVisible(true);
        setIsEditing(false);
    };


    let cancel = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setIsEditing(false);
    }

    let EditOrShow = (text, setter) =>
        isEditing ?
            <TextInput style={styles.inputField} onChangeText={setter} value={text} />
            :
            <View style={{ justifyContent: 'center' }}><Text style={styles.specialText}>{text}</Text></View>


    return (
        <View style={styles.container}>
            <BikeNest_Modal
                modalHeadLine={modalHeadline}
                modalText={modalText}
                isVisible={modalVisible}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            />
            <Text style={styles.stdText}>Nachname:</Text>
            {EditOrShow(lastName, setLastName)}

            <Text style={styles.stdText}>Vorname:</Text>
            {EditOrShow(firstName, setFirstName)}

            <Text style={styles.stdText}>Email:</Text>
            {EditOrShow(email, setEmail)}

            <Text style={styles.stdText}>Passwort:</Text>
            {EditOrShow(password, setPassword)}

            {isEditing ?
                <View>
                    <Pressable style={styles.button} onPress={() => cancel()}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => saveData()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                </View>
                :
                <View>
                    <Pressable style={styles.button} onPress={() => setIsEditing(true)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </Pressable>
                </View>
            }
        </View>
    );
}

