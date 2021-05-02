import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {UserDataService} from "../../services/UserData";
import {Button} from "react-native";
import {styles} from "./styles";

export default function EditPersonalInformation() {
    let userdata = new UserDataService();
    const [firstName, setFirstName] = useState(userdata.GetFirstName())
    const [lastName, setLastName] = useState(userdata.GetLastName())
    const [email, setEmail] = useState(userdata.GetEmail())
    const [isEditing, setIsEditing] = useState(false)

    let saveData = () => {
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
        isEditing ? <TextInput style={[styles.Input, styles.cell]} onChangeText={setter} value={text}/> : <Text style={styles.cell}>{text}</Text>

    return (
        <View style={styles.mainview}>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={{flex:0.4}}>Last Name:</Text>
                    {EditOrShow(lastName, setLastName)}
                </View>
                <View style={styles.row}>
                    <Text style={{flex:0.4}}>First Name:</Text>
                    {EditOrShow(firstName, setFirstName)}
                </View>
                <View style={styles.row}>
                    <Text style={{flex:0.4}}>Email Address:</Text>
                    {EditOrShow(email,setEmail)}
                </View>
            </View>
            {isEditing ?
                <View style={{flexDirection: "row", alignSelf: "flex-end"}}>
                    <Button style={styles.button} onPress={() => cancel()} title="Cancel"/>
                    <Button style={styles.button} onPress={() => saveData()} title="Save"/>
                </View>
                :
                <View style={{alignSelf: "flex-end"}}>
                    <Button style={styles.button} onPress={() => setIsEditing(true)} title="Edit"/>
                </View>
            }
        </View>
    );
}

