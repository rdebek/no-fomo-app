import React from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "../styles/EmailConfirmationScreenStyles";
import { footer } from "../components/Footer";
import { Colors } from "../styles/Colors";

function EmailConfirmationScreen({ route, navigation }) {
  const [confimationCode, setConfirmationCode] = React.useState("");
  const [resendCode, setResendCode] = React.useState(false);
  const { emailAddress } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {footer}
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>
          In order to confirm your email, please head over to your inbox at:
          {"\n\n"}
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            {emailAddress}
          </Text>
        </Text>
      </View>
      <View style={styles.containerJustify}>
        <Text style={styles.textDescriptors}>E-mail verification code</Text>
        <TextInput
          autoCorrect={false}
          textAlign="center"
          spellCheck={false}
          autoCapitalize="characters"
          selectionColor="black"
          style={styles.codeInput}
          value={confimationCode}
          onChangeText={setConfirmationCode}
        />
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("MenuScreen")}
        >
          <View style={styles.verify}>
            <Text style={styles.verifyText}>VERIFY</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.resendInfo}>
          If you haven't received your confimation code, click the button below
          for another code.
        </Text>
        <TouchableOpacity
          disabled={resendCode}
          onPress={() => {
            Alert.alert("Confimation code resent.");
            setResendCode(true);
          }}
        >
          <View
            style={[
              styles.resend,
              { backgroundColor: resendCode ? Colors.disabled : Colors.primary },
            ]}
          >
            <Text style={styles.resendText}>RESEND</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default EmailConfirmationScreen;
