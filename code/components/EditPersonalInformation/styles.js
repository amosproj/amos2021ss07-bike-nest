import {StyleSheet} from "react-native";

export default class Colors {

    static get UI_Light_0() { return "#D6F2C9"; }
    static get UI_Light_1() { return "#B5D99C"; }
    static get UI_Light_2() { return "#F28D35"; }
    static get UI_Light_3() { return "#732C02"; }
    static get UI_Light_4() { return "#F2F2F2"; }
    static get Facebook_Blue() { return "#4267B2"; }
    static get Google_Grey() { return "#EBEAEC"; }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        width: 328,
        height: 55,
        borderRadius: 38,
        margin: 9,
        backgroundColor: Colors.UI_Light_2
    },
    stdText: {
        width: 328,
        color: '#333333',
        margin: 5,
        paddingLeft: 12,
        textAlignVertical: 'center',
        justifyContent: 'center'
    },
    specialText: {
        width: 328,
        color: '#333333',
        margin: 5,
        fontWeight: 'bold',
        paddingLeft: 12,
        justifyContent: 'center',
        textAlignVertical: 'center'
    },
    inputField: {
        width: 328,
        height: 55,
        color: '#333333',
        backgroundColor: Colors.UI_Light_4,
        borderRadius: 15,
        margin: 9,
        paddingLeft: 12,
    },
    buttonText: {
        fontSize: 14,
        color: Colors.UI_Light_4
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 30
    }

});
