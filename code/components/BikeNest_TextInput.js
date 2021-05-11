import React from 'react';
import { mainStyles } from "../styles/MainStyles";
import { TextInput } from 'react-native';


export default function BikeNest_TextInput(props) {

    function onChangeText() {
        if (props.onChangeText != null) {
            props.onChangeText();
        }
    }

    return (
        <TextInput
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            style={mainStyles.inputField}
            onChangeText={() => onChangeText()}
            value={props.value}
        />
    );
}