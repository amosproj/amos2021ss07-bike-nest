import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { mainStyles } from "../styles/MainStyles";

export const ButtonStyle = Object.freeze({ "big": 1, "medium": 2, "small": 3, });

export default function BikeNest_Button(props) {

    function onPress() {
        if (props.onPress != null) {
            props.onPress();
        } else {
            console.error("onPress is null");
        }
    }

    let showIcon = () => {
        if (props.iconPath != null) {
            return (
                <View style={mainStyles.buttonImage}>
                    <Image source={props.iconPath} />
                </View>

            )
        }
    }

    let showButton = () => {
        let buttonStyle = mainStyles.buttonSmall;

        if (props.type != null) {
            if (props.type === ButtonStyle.big) {
                buttonStyle = mainStyles.buttonBig;
            }
            else if (props.type === ButtonStyle.medium) {
                buttonStyle = mainStyles.buttonMedium;
            }
            else if (props.type === ButtonStyle.small) {
                buttonStyle = mainStyles.buttonSmall;
            }

            return (
                <TouchableOpacity style={buttonStyle} onPress={() => onPress()}>
                    <View style={mainStyles.nestedButtonView}>
                        {showIcon()}
                        <Text style={mainStyles.buttonText}>{props.text}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    return (
        <View>
            {showButton()}
        </View>
    );
}
