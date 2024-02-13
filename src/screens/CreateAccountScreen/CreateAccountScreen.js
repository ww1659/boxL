import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onCreateAccountPress = () => {
    console.log("Account Created");
  };

  const onTermsOfUsePress = () => {
    console.log("Terms of Use");
  };

  const onPrivacyPolicyPress = () => {
    console.log("Terms of Use");
  };

  const onSignInPress = () => {
    console.log("Back to Sign in Page");
    navigation.navigate("SignInScreen");
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.root}>
          <Text style={styles.title}>Create an Account</Text>
          <CustomInput
            placeholder="username"
            value={username}
            setValue={setUsername}
            formIcon="person"
          />
          <CustomInput
            placeholder="email address"
            value={email}
            setValue={setEmail}
            formIcon="email"
          />
          <CustomInput
            placeholder="password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            formIcon="lock-outline"
          />
          <CustomInput
            placeholder="confirm password"
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            secureTextEntry={true}
            formIcon="lock"
          />
          <CustomButton text="Create Account" onPress={onCreateAccountPress} />
          <Text style={styles.text}>
            By registering, you confirm that you accept our{" "}
            <Text style={styles.link} onPress={onTermsOfUsePress}>
              terms of use
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={onPrivacyPolicyPress}>
              Privacy Policy.
            </Text>
          </Text>

          <CustomButton
            text="Already have an account? Sign in."
            onPress={onSignInPress}
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
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2B2D42",
    marginVertical: 10,
  },
  text: { color: "#2B2D42", marginVertical: 10 },
  link: {
    color: "#FDB075",
  },
});

export default CreateAccountScreen;
