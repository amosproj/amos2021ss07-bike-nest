import React, {useState} from 'react';
import {Pressable, Text, View, TextInput, StyleSheet} from 'react-native';
import {UserDataService} from "../../services/UserData";
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
        isEditing ?
            <TextInput style={styles.inputField} onChangeText={setter} value={text}/>
            :
            <View style={{justifyContent: 'center'}}><Text style={styles.specialText}>{text}</Text></View>


    return (
        <View style={styles.container}>

                    <Text style={styles.stdText}>Last Name:</Text>
                    {EditOrShow(lastName, setLastName)}

                    <Text style={styles.stdText}>First Name:</Text>
                    {EditOrShow(firstName, setFirstName)}

                    <Text style={styles.stdText}>Email Address:</Text>
                    {EditOrShow(email,setEmail)}

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

