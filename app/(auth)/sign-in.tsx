import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import StyledButton from "@/components/StyledButton";

const SignInScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Whoops!, looks like you entered wrong credentials");
    }
  }, [isLoaded, emailAddress, password]);

  const { inputStyle } = styles;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#5F5DEC",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <MaterialIcons
        name="video-chat"
        size={160}
        color="white"
        style={{
          alignSelf: "center",
          paddingBottom: 20,
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        style={inputStyle}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        style={inputStyle}
        onChangeText={(password) => setPassword(password)}
      />
      {/* Divider */}
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      ></View>
      <StyledButton title="Sign In" onPress={onSignInPress} />
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 18,
          marginVertical: 5,
        }}
      >
        OR
      </Text>
      {/* TODO: sign in with OAuth */}
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      ></View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ color: "white" }}>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text
            style={{
              color: "white",
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    padding: 20,
  },
});

export default SignInScreen;
