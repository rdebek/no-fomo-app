import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

function RegisterScreen({navigation}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    return (
        <SafeAreaView>
            <View style={styles.logoView}>
            <Text style={styles.appName}>
                NO FOMO
            </Text>
            <Image style={styles.logo} source={require('../assets/app_logo.jpg')} />
            </View>

            <Text style={styles.textDescriptors}>
                E-mail address
            </Text>
            <TextInput keyboardType='email-address' autoCorrect={false} spellCheck={false} autoCapitalize='none' selectionColor="black" style={styles.formInput} value={email} onChangeText={setEmail} />
            <Text style={styles.textDescriptors}>
                Password
            </Text>
            <TextInput autoCorrect={false} spellCheck={false} autoCapitalize='none' selectionColor="black" style={styles.formInput} value={password} onChangeText={setPassword} />
            <Text style={styles.textDescriptors}>
                Confirm password
            </Text>
            <TextInput autoCorrect={false} spellCheck={false} autoCapitalize='none' selectionColor="black" style={styles.formInput} value={passwordConfirm} onChangeText={setPasswordConfirm} />
            
            <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
            <View style={styles.register}>
                <Text style={styles.registerText} >
                    REGISTER
                </Text>
            </View>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    appName: {
        color:"#332C29" ,
        fontWeight: 'bold',
        fontSize: 15,
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        paddingBottom: 5,
    },
    logo: {
        width: 100,
        height: 30,
    },
    container: {
        flex: 1,
    },
    formInput: {
        paddingHorizontal: 5,
        margin: 5,
        borderColor: "#332C29",
        borderWidth: 2,
        backgroundColor: "white",
        height: 50,
        fontSize: 20,
        color: "#101820FF",
        borderRadius: 10,
    },
    textDescriptors: {
        paddingHorizontal: 6,
        paddingTop: 5,
    },
    register: {
        backgroundColor: '#332C29',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 200,
        height: 50,
        marginTop: 10,
    },
    registerText: {
        fontSize: 25,
        color: 'white',
    },
})

export default RegisterScreen;