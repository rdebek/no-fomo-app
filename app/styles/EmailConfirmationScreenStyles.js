import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerJustify: {flex: 1,
    justifyContent: "center"},
    codeInput: {
        paddingHorizontal: 5,
        margin: 5,
        borderColor: "#332C29",
        borderWidth: 2,
        backgroundColor: "white",
        height: 70,
        fontSize: 45,
        color: "#101820FF",
        borderRadius: 10,
    },
    textDescriptors: {
        paddingHorizontal: 6,
    },
    verify: {
        backgroundColor: '#332C29',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 200,
        height: 50,
        marginTop: 15,
    },
    verifyText: {
        fontSize: 25,
        color: 'white',
    },
})