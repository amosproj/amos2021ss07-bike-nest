import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { mainStyles } from "../styles/MainStyles";

export const ButtonStyle = Object.freeze({ "big": 1, "medium": 2, "small": 3, "navigationBar": 4 });

export default function BikeNest_Button(props) {

    function onPress() {
        if (props.onPress != null) {
            props.onPress();
        } else {
            console.error("onPress is null");
        }
    }

    let showIcon = (iconStyle) => {
        if ((props.iconPath != null) && (iconStyle != null)) {
            return (
                <View style={iconStyle}>
                    <Image source={props.iconPath} />
                </View>
            )
        }
    }

    let setButtonStyle = () => {
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
            else if (props.type === ButtonStyle.navigationBar) {
                buttonStyle = mainStyles.buttonNavigationBar;
            }

            if (props.overrideButtonColor != null) {
                buttonStyle = [buttonStyle, { backgroundColor: props.overrideButtonColor }];
            }
        }

        return buttonStyle;
    }

    let setTextStyle = () => {
        let textStyle = mainStyles.buttonText;

        if (props.overrideTextColor != null) {
            textStyle = [textStyle, { color: props.overrideTextColor }];
        }

        return textStyle;
    }

    let setViewStyle = () => {
        let viewStyle = mainStyles.nestedButtonViewRow;

        if ((props.type != null) && (props.type === ButtonStyle.navigationBar)) {
            viewStyle = mainStyles.nestedButtonViewColumn;
        }

        return viewStyle;
    }

    let setIconStyle = () => {
        let imageStyle = mainStyles.buttonImageRow;

        if ((props.type != null) && (props.type === ButtonStyle.navigationBar)) {
            imageStyle = mainStyles.buttonImageColumn;
        }

        return imageStyle;
    }

    let showButton = () => {
        let buttonStyle = setButtonStyle();
        let textStyle = setTextStyle();
        let viewStyle = setViewStyle();
        let iconStyle = setIconStyle()

        return (
            <TouchableOpacity style={buttonStyle} onPress={() => onPress()}>
                <View style={viewStyle}>
                    {showIcon(iconStyle)}
                    <Text style={textStyle}>{props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }


    return (
        showButton()
    );
}
