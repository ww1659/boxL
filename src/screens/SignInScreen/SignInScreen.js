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
import { ProgressBar } from "react-native-paper";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
      const formattedUsername = username.trim().toLowerCase();
      const response = await login({ formattedUsername, password });
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
      <SafeAreaView style={styles.loading}>
        <View>
          <Text style={styles.loadingText}>Signing you in...</Text>
          <ProgressBar progress={1} />
        </View>
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
            error={noPasswordError}
            secureTextEntry={!isPasswordVisible}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginVertical: 5,
    fontSize: 24,
    color: "#2B2D42",
  },
});

export default SignInScreen;
