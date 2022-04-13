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
import { post } from "../components/Api";
import { Alert } from "react-native-web";
import { save, getValueFor } from "../components/SecureStore";

function LoginScreen({ navigation }) {
  const [login, setLogin] = React.useState("Login");
  const [password, setPassword] = React.useState("Password");
  const [passVisibility, setPassVisibility] = React.useState(false);

  React.useEffect(async () => {
    let email = await getValueFor("login");
    let password = await getValueFor("password");
    if (email && password) {
      navigation.navigate("MenuScreen");
    }
  });

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
  async function handleLogin() {
    let res = await post("https://no-fomo-backend.herokuapp.com/login", {
      auth: "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21",
      email: login,
      password: password,
    });

    res = await res.json();

    if (res.login) {
      save("login", login);
      save("password", password);
      navigation.navigate("MenuScreen");
    } else {
      Alert.alert("Wrong username or password.");
    }
  }

  function handlePassword(pass) {
    setPassword(pass);
    setPassVisibility(true);
  }
}

export default LoginScreen;
