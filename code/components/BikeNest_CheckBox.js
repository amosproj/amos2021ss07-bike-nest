import React, { useState } from 'react';
import { mainStyles } from "../styles/MainStyles";
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function BikeNest_CheckBox(props) {
    const [toggleCheckBox, setToggleCheckBox] = useState(props.initialValue);

    function onPressTxt() {
        if (props.onPressText != null) {
            props.onPressText();
        }
    }

    return (
        <View style={mainStyles.checkBoxContainer}>
            <Text style={mainStyles.checkboxText}
                onPress={() => onPressTxt()}>{props.toggleText}</Text>
            <CheckBox
                style={mainStyles.checkbox}
                onPress={() => setToggleCheckBox(!toggleCheckBox)}
                checked={toggleCheckBox}
            />
        </View>
    );
}