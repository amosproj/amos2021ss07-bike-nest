import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {UserDataService} from "../../services/UserData";

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
            <View>
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
                    {isInputValid() && <Text>Valid Input!</Text>}
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <button style={{alignSelf: "flex-end"}} onClick={() => cancel()}>Cancel</button>
                            <button style={{alignSelf: "flex-end"}} onClick={() => save()}>Save</button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }else{
        return (
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Password:</Text></View>
                    <View style={styles.cell}><Text>*****</Text></View>
                    <button style={{alignSelf: "flex-end"}} onClick={() => setIsEditing(true)}>Edit</button>
                </View>
            </View>
        );
    }
}


export const styles = StyleSheet.create({
    table: {
        margin: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        alignSelf: 'stretch'
    },
    input: {
        flex: 1,
        alignSelf: 'stretch',
        borderWidth: 5,
    },
    button: {
        flex: 0.5,
        alignSelf: "flex-end"
    },
});
