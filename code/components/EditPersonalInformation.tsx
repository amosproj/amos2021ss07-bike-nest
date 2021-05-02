import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {UserDataService} from "../services/UserData";

export default function EditPersonInformation() {
    let userdata: UserDataService = new UserDataService();
    const [firstName, setFirstName] = useState(userdata.GetFirstName())
    const [lastName, setLastName] = useState(userdata.GetLastName())
    const [email, setEmail] = useState(userdata.GetEmail())
    const [isEditing, setIsEditing] = useState(false)

    let updateData = () => {};

    return (
        <View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Last Name:</Text></View>
                    <View style={styles.cell}><Text>{lastName}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>First Name:</Text></View>
                    <View style={styles.cell}><Text>{firstName}</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}><Text>Email Address:</Text></View>
                    <View style={styles.cell}><Text>{email}</Text></View>
                </View>

            </View>
            <button>Edit</button>
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
    }
});
