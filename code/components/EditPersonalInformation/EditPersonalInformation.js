import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {UserDataService} from "../../services/UserData";
import {Button} from "react-native";

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
        isEditing ? <TextInput style={styles.Input} onChangeText={setter} value={text}/> : <Text>{text}</Text>

    return (
        <View style={styles.mainview}>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={[styles.cell, {flex:0.5}]}><Text>Last Name:</Text></View>
                    <View style={styles.cell}>{EditOrShow(lastName, setLastName)}</View>
                </View>
                <View style={styles.row}>
                    <View style={[styles.cell, {flex:0.5}]}><Text>First Name:</Text></View>
                    <View style={styles.cell}>{EditOrShow(firstName, setFirstName)}</View>
                </View>
                <View style={styles.row}>
                    <View style={[styles.cell, {flex:0.5}]}><Text>Email Address:</Text></View>
                    <View style={styles.cell}>{EditOrShow(email,setEmail)}</View>
                </View>
                {isEditing ?
                    <View style={[styles.row, {alignSelf: "flex-end"}]}>
                        <Button style={styles.button} onPress={() => cancel()} title="Cancel"/>
                        <Button style={styles.button} onPress={() => saveData()} title="Save"/>
                    </View>
                    :
                    <View style={[styles.row, {alignSelf: "flex-end"}]}>
                        <Button style={styles.button} onPress={() => setIsEditing(true)} title="Edit"/>
                    </View>
                }
            </View>
        </View>
    );
}


export const styles = StyleSheet.create({
    mainview: {
        margin: 20,
        padding: 10,
        flex: 1
    },
    table: {
        padding: 10,
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
        alignSelf: "flex-end"
    },
    input: {
        flex: 1,
        alignSelf: 'stretch',
        borderWidth: 5,
    },
    button: {
        alignSelf: "flex-end",
        flex: 1,
        padding: 5
    },
});
