import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";

const SignInScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noUsernameError, setNoUsernameError] = useState(false);
  const [noPasswordError, setNoPasswordError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { height } = useWindowDimensions();

  const onSignInPress = async (event) => {
    event.preventDefault();

    if (!username) {
      setNoUsernameError(true);
    }

    if (!password) {
      setNoPasswordError(true);
    }

    setLoginLoading(true);
    try {
      const response = await login({ username, password });
      if (response.status === true) {
        setLoginLoading(false);
        navigation.navigate("BottomTabs");
      }
    } catch (error) {
      setLoginLoading(false);
      console.log(error.response);
    }
  };

  const onForgotPasswordPress = () => {
    console.log("Forgot Password");
  };

  const onCreateAccountPress = () => {
    console.log("Create Account Page");
    navigation.navigate("CreateAccountScreen");
  };

  if (loginLoading)
    return (
      <SafeAreaView>
        <Text>
          Loading. Sorry this is a bit shit atm but I promise it's loading. You
          might just have to wait a bit.
        </Text>
      </SafeAreaView>
    );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
          <CustomInput
            placeholder="username"
            value={username}
            setValue={setUsername}
            formIcon="person"
            error={noUsernameError}
          />
          <CustomInput
            placeholder="password"
            value={password}
            setValue={setPassword}
            formIcon="lock"
            secureTextEntry={true}
            error={noPasswordError}
          />
          <CustomButton
            text="Sign In"
            onPress={onSignInPress}
            disabled={false}
          />
          <CustomButton
            text="Forgot Password?"
            onPress={onForgotPasswordPress}
            type="TERTIARY"
          />

          <SocialSignInButtons />

          <CustomButton
            text="Don't have an account? Create one."
            onPress={onCreateAccountPress}
            type="TERTIARY"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 500,
    maxHeight: 150,
    marginBottom: 20,
    marginTop: 50,
  },
});

export default SignInScreen;
