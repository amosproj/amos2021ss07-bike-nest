import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {UserDataService} from "../../services/UserData";
import EditPassword from "./EditPassword";

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
                {isEditing ?
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <button style={{alignSelf: "flex-end"}} onClick={() => cancel()}>Cancel</button>
                            <button style={{alignSelf: "flex-end"}} onClick={() => saveData()}>Save</button>
                        </View>
                    </View>
                    :
                    <button style={{alignSelf: "flex-end"}} onClick={() => setIsEditing(true)}>Edit</button>
                }
            </View>
        </View>
    );
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
