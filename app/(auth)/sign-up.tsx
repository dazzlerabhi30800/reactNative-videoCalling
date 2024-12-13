import * as React from "react";
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import StyledButton from "@/components/StyledButton";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error: ", err.message);
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Looks like you've entered the wrong code!!");
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  const { inputStyle } = styles;

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: "#5F5DEC",
          justifyContent: "center",
          gap: 15,
        }}
      >
        <>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 20,
              fontWeight: '500',
              marginBottom: 20,
            }}
          >
            A verification code has been sent to your email, please enter it to
            below.
          </Text>
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
            style={{
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
          <StyledButton title="Verify" onPress={onVerifyPress} />
        </>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#5F5DEC",
        justifyContent: "center",
        gap: 15,
      }}
    >
      <>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Enter your details to get started!
        </Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
          style={inputStyle}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={inputStyle}
        />
        {/* <Button title="Continue" onPress={onSignUpPress} /> */}
        <StyledButton title="Sign Up" onPress={onSignUpPress} />
      </>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    padding: 20,
  },
});
