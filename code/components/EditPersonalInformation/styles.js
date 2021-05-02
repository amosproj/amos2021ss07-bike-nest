import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    mainview: {
        margin: 10,
        padding: 10,
        width: "100%",
        flex: 1
    },
    table: {
        padding: 10,
        flexDirection: "column",
        flex:1,
        backgroundColor: '#fff',
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        borderWidth: 5,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        padding: 10
    },
    cell: {
        flex:1,
    }
});
