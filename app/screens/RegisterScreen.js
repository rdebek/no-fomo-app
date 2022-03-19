import React from 'react';
import { Text, TextInput, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/RegisterScreenStyles';
import { footer } from '../components/Footer';

function RegisterScreen({navigation}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');


    return (
        <SafeAreaView style={styles.container}>
            {footer}
            <View style={styles.containerJustify}>
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
            <TouchableOpacity onPress={handleRegister}>
            <View style={styles.register}>
                <Text style={styles.registerText} >
                    REGISTER
                </Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    );
    function handleRegister(){
        console.log(`email: ${email}\n pass: ${password}\n pass_conf: ${passwordConfirm}`);
        navigation.navigate("EmailScreen");
    }
}


export default RegisterScreen;