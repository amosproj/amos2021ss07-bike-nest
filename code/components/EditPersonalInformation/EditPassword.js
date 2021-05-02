import React, {useState} from 'react';
import { Text, View, TextInput } from 'react-native';
import {UserDataService} from "../../services/UserData";
import {Button} from "react-native";
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
                <View style={styles.table}>
                    <View style={styles.row}>
                        <View style={styles.cell}><Text>Old Password:</Text></View>
                        <View style={styles.cell}><TextInput onChangeText={setOldPassword} value={oldPassword}></TextInput></View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}><Text>New Password:</Text></View>
                        <View style={styles.cell}><TextInput onChangeText={setNewPassword1} value={newPassword1}></TextInput></View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.cell}><Text>New Password Confirmation:</Text></View>
                        <View style={styles.cell}><TextInput onChangeText={setNewPassword2} value={newPassword2}></TextInput></View>
                    </View>

                </View>
                {isInputValid() ? <Text>Valid Input!</Text> : null}
                <View style={[styles.row, {alignSelf: "flex-end"}]}>
                    <Button style={styles.button} onPress={() => cancel()} title="Cancel"/>
                    <Button style={styles.button} onPress={() => save()} title="Save"/>
                </View>
            </View>
        );
    }else{
        return (
            <View style={styles.mainview}>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <View style={styles.cell}><Text>Password:</Text></View>
                        <View style={styles.cell}><Text>*****</Text></View>
                    </View>
                </View>
                <View style={{alignSelf: "flex-end"}}>
                    <Button style={styles.button} onPress={() => setIsEditing(true)} title="Edit"/>
                </View>
            </View>
        );
    }
}
