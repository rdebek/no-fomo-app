import React from 'react';
import { View, TextInput, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/EmailConfirmationScreenStyles';
import { footer } from '../components/Footer';

function EmailConfirmationScreen({navigation}) {
    const [confimationCode, setConfirmationCode] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            {footer}
            <View style={styles.containerJustify}>
                <Text style={styles.textDescriptors}>
                    E-mail verification code
                </Text>
            <TextInput autoCorrect={false} textAlign='center' spellCheck={false} autoCapitalize='characters' selectionColor="black" style={styles.codeInput} value={confimationCode} onChangeText={setConfirmationCode} />
            <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={()=> console.log('wtf?')}>
            <View style={styles.verify}>
                <Text style={styles.verifyText} >
                    VERIFY
                </Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    );
}

export default EmailConfirmationScreen;