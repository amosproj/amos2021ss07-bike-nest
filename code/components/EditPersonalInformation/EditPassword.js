import React, { useState } from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';
import { UserService } from '../../services/UserService';
import { styles } from "./styles";

export default function EditPassword() {
    let userService = new UserService();
    const [isEditing, setIsEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");

    let cancel = () => {
        setIsEditing(false);
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
    }

    let save = () => {
        if (!isInputValid()) {
            cancel();
            return;
        }
        userService.changePassword(oldPassword, newPassword1).then((response) => {
            if (response.success === true) {
                setModalHeadline("Yuhu!");
                setModalText("Dein Passwort wurde erfolgreich geändert.");
            } else {
                setModalHeadline("Oh-oh!");
                setModalText("Da ist leider etwas scheif gelaufen. Versuche es bitte erneut.");
            }
        });
        setModalVisible(true);
    }

    let isInputValid = () => {
        return oldPassword.length > 0 && newPassword1 === newPassword2 && newPassword1.length > 0 && newPassword1 !== oldPassword;
    }

    if (isEditing) {
        return (
            <View style={styles.mainview}>
                <Text style={styles.stdText}>Old Password:</Text>
                <TextInput style={styles.inputField} onChangeText={setOldPassword} value={oldPassword}></TextInput>
                <Text style={styles.stdText}>New Password:</Text>
                <TextInput style={styles.inputField} onChangeText={setNewPassword1} value={newPassword1}></TextInput>

                <Text style={styles.stdText}>New Password Confirmation:</Text>
                <TextInput style={styles.inputField} onChangeText={setNewPassword2} value={newPassword2}></TextInput>
                {isInputValid() ? <Text>Valid Input!</Text> : null}
                <Pressable style={styles.button} onPress={() => cancel()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => save()}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        );
    } else {
        return (
            <View style={styles.mainview}>
                <BikeNest_Modal
                    modalHeadLine={modalHeadline}
                    modalText={modalText}
                    isVisible={modalVisible}
                    onPress={() => onModalPress()}
                    onRequestClose={() => { setModalVisible(!modalVisible); }}
                />
                <View style={styles.cell}><Text style={styles.stdText}>Password:</Text></View>
                <View style={styles.cell}><Text style={styles.stdText}>*****</Text></View>
                <Pressable style={styles.button} onPress={() => setIsEditing(true)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
            </View>
        );
    }
}
