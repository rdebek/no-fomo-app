import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/LoginScreenStyles";

function LoginScreen({ navigation }) {
  const [login, setLogin] = React.useState("Login");
  const [password, setPassword] = React.useState("Password");
  const [passVisibility, setPassVisibility] = React.useState(false);
  // test commit
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>NO FOMO</Text>
      <Image style={styles.logo} source={require("../assets/app_logo.jpg")} />

      <TextInput
        keyboardType="email-address"
        textAlign="center"
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize="none"
        clearTextOnFocus={true}
        selectionColor="black"
        style={styles.textInput}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        textAlign="center"
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize="none"
        clearTextOnFocus={true}
        secureTextEntry={passVisibility}
        selectionColor="black"
        value={password}
        style={styles.textInput}
        onChangeText={handlePassword}
      />
      <TouchableOpacity onPress={handleLogin}>
        <View style={styles.logIn}>
          <Text style={styles.logInText}>LOGIN</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text>
          Don't have an account yet?
          <Text
            onPress={() => navigation.navigate("RegisterScreen")}
            style={styles.registerButton}
          >
            {" "}
            Register.
          </Text>
        </Text>
      </View>
    </View>
  );

  function handleLogin() {
    console.log(`login: ${login}`);
    console.log(`pass: ${password}`);
  }

  function handlePassword(pass) {
    setPassword(pass);
    setPassVisibility(true);
  }
}

export default LoginScreen;
