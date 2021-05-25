import React from 'react';
import { Text, View } from 'react-native';
import { Modal } from 'react-native';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_Button, { ButtonStyle } from './BikeNest_Button';

export default function BikeNest_Modal(props) {

    function onPress() {
        if (props.onPress != null) {
            props.onPress();
        } else {
            console.error("onPress is null");
        }
    }

    function onRequestClose() {
        if (props.onRequestClose != null) {
            props.onRequestClose();
        } else {
            console.error("onRequestClose is null");
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={() => onRequestClose()}
        >
            <View style={mainStyles.modalContainer}>
                {props.content === undefined ?
                    <View style={mainStyles.modalContentContainer}>
                        <Text style={mainStyles.h3}>{props.modalHeadLine}</Text>
                        <Text style={mainStyles.stdText}>{props.modalText}</Text>
                        <BikeNest_Button
                            type={ButtonStyle.small}
                            text="Ok"
                            onPress={() => onPress()}>
                        </BikeNest_Button>
                    </View>
                    : props.content}
            </View>           
        </Modal >);
}
