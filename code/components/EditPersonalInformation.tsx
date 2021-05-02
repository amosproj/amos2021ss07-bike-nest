import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {UserDataService} from "../services/UserData";

export default function EditPersonInformation() {
    let userdata: UserDataService = new UserDataService();
    const [firstName, setFirstName] = useState(userdata.GetFirstName())
    const [lastName, setLastName] = useState(userdata.GetLastName())
    const [email, setEmail] = useState(userdata.GetEmail())
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    let saveData = () => {
        if(newPassword1.length > 0 && newPassword2.length > 0){
            if(newPassword1 !== newPassword2)
                return "New passwords don't match!";
            if(!userdata.UpdatePassword(oldPassword, newPassword1)){
                return "Error updating the password. Maybe your old password is incorrect.";
            }
        }
        let finalResult = [userdata.UpdateFirstName(firstName),
            userdata.UpdateLastName(lastName), userdata.UpdateEmail(email)].every(x => x);

        setIsEditing(false);
        return finalResult ? "Successful updated all User Data!" : "Error updating User Data!";
    };

    let cancel = () => {
        setFirstName(userdata.GetFirstName());
        setLastName(userdata.GetLastName());
        setEmail(userdata.GetEmail());
        setIsEditing(false);
    }

    let EditOrShow = (text, setter) =>
        isEditing ? <TextInput style={styles.Input} onChangeText={setter} value={text}/> : <Text>{text}</Text>

    return (
        <View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Last Name:</Text></View>
                    <View style={styles.cell}>{EditOrShow(lastName, setLastName)}</View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>First Name:</Text></View>
                    <View style={styles.cell}>{EditOrShow(firstName, setFirstName)}</View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Email Address:</Text></View>
                    <View style={styles.cell}>{EditOrShow(email,setEmail)}</View>
                </View>
            </View>
            {isEditing ?
            <View>
                <button onClick={() => cancel()}>Cancel</button>
                <button onClick={() => saveData()}>Save</button>
            </View>
                :
                <button onClick={() => setIsEditing(true)}>Edit</button>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    table: {
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
    }
});
