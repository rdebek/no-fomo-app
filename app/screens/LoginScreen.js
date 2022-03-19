import React from 'react';
import {TextInput, View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';



function LoginScreen({navigation}) {

    const [login, setLogin] = React.useState("Login");
    const [password, setPassword] = React.useState("Password");
    const [passVisibility, setPassVisibility] = React.useState(false);

    return (
        <View style={styles.container}>            
        <Text style={styles.appName}>
        NO FOMO
        </Text>
            <Image style={styles.logo} source={require('../assets/app_logo.jpg')} />
 
            <TextInput  keyboardType='email-address' textAlign='center' autoCorrect={false} spellCheck={false} autoCapitalize='none' clearTextOnFocus={true} selectionColor="black" style={styles.textInput} value={login} onChangeText={setLogin} />
            <TextInput textAlign='center' autoCorrect={false} spellCheck={false} autoCapitalize='none' clearTextOnFocus={true} secureTextEntry={passVisibility} selectionColor="black" value={password} style={styles.textInput} onChangeText={handlePassword} />
                <TouchableOpacity  onPress={handleLogin}>
            <View style={styles.logIn}>
                <Text style={styles.logInText} >
                    LOGIN
                </Text>
            </View>
                </TouchableOpacity>
            <View style={styles.register}>
                <Text>
                    Don't have an account yet?
                    <Text onPress={() => navigation.navigate("RegisterScreen")}  style={styles.registerButton}>
                         {' '}Register.
                    </Text> 
                    </Text>
            </View>
        </View>
    );

    function handleLogin(){
        console.log(`login: ${login}`);
        console.log(`pass: ${password}`);
    };

    function handlePassword(pass){
        setPassword(pass);
        setPassVisibility(true);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        paddingHorizontal: 5,
        margin: 5,
        borderColor: "#332C29",
        borderWidth: 2,
        backgroundColor: "white",
        width: 250,
        height: 50,
        fontSize: 20,
        color: "#101820FF",
        borderRadius: 10,
    },
    appName: {
        position: 'absolute',
        top: 35,
        color:"#332C29" ,
        fontWeight: 'bold',
        fontSize: 40,
    },
    logo: {
        position: 'absolute',
        width: 250,
        height: 150,
        top: 50,
    },
    logIn: {
        backgroundColor: '#332C29',
        width: 160,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 5,
    },
    logInText: {
        fontSize: 25,
        color: 'white',
    },
    register: {
        marginTop: 10,
    },
    registerButton: {
        color: '#EE4E34',
        fontWeight:  'bold',
    }
})

export default LoginScreen;