import React, { useState } from "react";
import {
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();

  const onSignInPress = () => {
    console.log("Sign In");
    navigation.navigate("BottomTabs");
  };

  const onForgotPasswordPress = () => {
    console.log("Forgot Password");
  };

  const onCreateAccountPress = () => {
    console.log("Create Account Page");
    navigation.navigate("CreateAccountScreen");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
        />
        <CustomInput
          placeholder="password"
          value={password}
          setValue={setPassword}
          formIcon="lock"
          secureTextEntry={true}
        />
        <CustomButton text="Sign In" onPress={onSignInPress} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 500,
    maxHeight: 150,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default SignInScreen;
