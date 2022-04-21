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
import { Footer } from "../components/Footer";
import { Colors } from "../styles/Colors";
import { post } from "../components/Api";

function EmailConfirmationScreen({ route, navigation }) {
  const [confimationCode, setConfirmationCode] = React.useState("");
  const [resendCode, setResendCode] = React.useState(false);
  const { emailAddress } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {Footer}
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>
          In order to confirm your email, please head over to your inbox at:
          {"\n\n"}
          <Text style={styles.boldTextCenter}>{emailAddress}</Text>
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
          onPress={verifyEmail}
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
          onPress={resendConfirmationEmail}
        >
          <View
            style={[
              styles.resend,
              {
                backgroundColor: resendCode ? Colors.disabled : Colors.primary,
              },
            ]}
          >
            <Text style={styles.resendText}>RESEND</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  async function verifyEmail() {
    let res = await post("https://no-fomo-backend.herokuapp.com/email", {
      auth: "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21",
      email: emailAddress,
      token: confimationCode,
    });

    res = await res.json();

    console.log(res);

    if (res.verify) {
      navigation.navigate("MenuScreen");
    } else {
      Alert.alert("Verification code is inavild.");
    }
  }

  async function resendConfirmationEmail() {
    post("https://no-fomo-backend.herokuapp.com/email", {
      auth: "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21",
      email: emailAddress,
    });
    Alert.alert("Confimation code resent.");
    setResendCode(true);
  }
}

export default EmailConfirmationScreen;
