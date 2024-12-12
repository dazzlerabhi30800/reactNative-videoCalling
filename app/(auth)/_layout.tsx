import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href={"/(call)"} />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#5F5DEC" }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitle: "Sign In to get Started",
          }}
          name="sign-in"
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Create a new account",
            headerBackTitle: "Sign In",
            headerStyle: {
              backgroundColor: "#5f5dec",
            },
            headerTintColor: "white",
          }}
          name="sign-up"
        />
      </Stack>
    </SafeAreaView>
  );
}
