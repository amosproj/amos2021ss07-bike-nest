import React, {useState} from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';
import {UserDataService} from "../../services/UserData";
import {styles} from "./styles";

export default function EditPassword(){
    let userdata = new UserDataService();
    const [isEditing, setIsEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    let cancel = () => {
        setIsEditing(false);
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
    }

    let save = () => {
        if(!isInputValid()) {
            cancel();
            return;
        }
        userdata.UpdatePassword(oldPassword, newPassword1);
        //TODO: Display Result of Update Password?
        cancel();
    }

    let isInputValid = () => {
        return oldPassword.length > 0 && newPassword1 === newPassword2 && newPassword1.length > 0 && newPassword1 !== oldPassword;
    }

    if(isEditing){
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
    }else{
        return (
            <View style={styles.mainview}>
                <View style={styles.cell}><Text style={styles.stdText}>Password:</Text></View>
                <View style={styles.cell}><Text style={styles.stdText}>*****</Text></View>
                <Pressable style={styles.button} onPress={() => setIsEditing(true)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
            </View>
        );
    }
}
