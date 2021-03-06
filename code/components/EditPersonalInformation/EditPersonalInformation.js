import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native';
import { styles } from "./styles";
import { UserService } from '../../services/UserService';
import BikeNest_Modal from '../BikeNest_Modal';
import global from '../GlobalVars';
import JwtDecoder from '../JwtDecoder';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 


export default function EditPersonalInformation() {
    let userService = new UserService();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            global.getAuthenticationToken().then((jwt) => {
                let decodedJwt = JwtDecoder.decode(jwt);
                setFirstName(decodedJwt.FirstName);
                setLastName(decodedJwt.LastName);
                setEmail(decodedJwt.sub);
                setLoading(false);
            })
        }
    })


    let saveData = () => {
        userService.changePersonalInformation(firstName, lastName, email, password).then((jwt) => {
            global.saveAuthenticationToken(jwt).then(() => {
                setModalHeadline("Hurra!");
                setModalText("Deine Informationen wurden erfolgreich geändert.");
            });
        }).catch(error => {
            if (error.display) {
                setModalHeadline("Oops!");
                setModalText(error.message);
            } else {
                setModalHeadline("Oops!")
                setModalText("Da ist wohl etwas schief gelaufen. Bitte versuche es noch einmal.");
            }
        })

        setModalVisible(true);
        setIsEditing(false);
    };


    let cancel = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setIsEditing(false);
    }

    let EditOrShow = (text, setter) =>
        isEditing ?
            <TextInput style={styles.inputField} onChangeText={setter} value={text} />
            :
            <View style={{ justifyContent: 'center' }}><Text style={styles.specialText}>{text}</Text></View>

    if (loading) {
        return null;
    }
    return (
        <View style={styles.container}>
            <BikeNest_Modal
                modalHeadLine={modalHeadline}
                modalText={modalText}
                isVisible={modalVisible}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            />
            <SimpleLineIcons name="user" size={24} color="black" />
            <Text style={styles.stdText}>Nachname:</Text>
            {EditOrShow(lastName, setLastName)}

            <Text style={styles.stdText}>Vorname:</Text>
            {EditOrShow(firstName, setFirstName)}

            <SimpleLineIcons name="envelope" size={24} color="black" />

            <Text style={styles.stdText}>Email:</Text>
            {EditOrShow(email, setEmail)}


            {isEditing ?
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <Pressable style={{ justifyItem: 'flex-start',marginTop: 20,marginBottom: 20,marginRight: 20}} onPress={() => cancel()}>
                        <AntDesign name="close" size={24} color="black" />
                        {/* <Text style={styles.buttonText}>Cancel</Text> */}
                    </Pressable>
                    <Pressable style={{ textAlign:'center', alignItems: 'flex-end',justifyContent: 'flex-end',marginTop: 20,marginBottom: 20,marginRight: 20}} onPress={() => saveData()}>
                        <AntDesign name="check" size={24} color="black" />
                        {/* <Text style={styles.buttonText}>Save</Text> */}
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

