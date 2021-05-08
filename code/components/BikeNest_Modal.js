import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Alert, Modal } from 'react-native';
import { mainStyles } from "../styles/MainStyles";

export default function BikeNest_Modal(props) {
    //const [modalVisible, setModalVisible] = useState(props.isVisible);

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
                <View style={mainStyles.modalContentContainer}>
                    <Text style={mainStyles.stdText}>{props.modalText}</Text>
                    <Pressable style={mainStyles.buttonSmall} onPress={() => onPress()}>
                        <Text style={mainStyles.buttonText}>OK</Text>
                    </Pressable>
                </View>
            </View>
        </Modal >);
}
