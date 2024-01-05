import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";

const SocialSignInButtons = () => {
  const onSignInLta = () => {
    console.log("LTA Sign in");
  };

  const onSignInGoogle = () => {
    console.log("Google Sign in");
  };

  const onSignInApple = () => {
    console.log("Apple Sign in");
  };

  return (
    <>
      <CustomButton
        text="Sign In with the LTA"
        onPress={onSignInLta}
        bgColour="#e7eaf4"
        fgColour="#4765a9"
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColour="#fae9ea"
        fgColour="#dd4d44"
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColour="#e3e3e3"
        fgColour="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
