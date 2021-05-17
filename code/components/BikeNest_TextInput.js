import React from 'react';
import { mainStyles } from "../styles/MainStyles";
import { TextInput } from 'react-native';


export default function BikeNest_TextInput(props) {

    function onChangeText(value) {
        if (props.onChangeText != null) {
            props.onChangeText(value);
        }
    }

    return (
        <TextInput
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            style={mainStyles.inputField}
            onChangeText={(value) => onChangeText(value)}
            value={props.value}
        />
    );
}