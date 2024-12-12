import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

const CallLayout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#5F5DEC",
          tabBarStyle: {
            display: route.name === "[id]" ? "none" : "flex",
          },
          tabBarLabelStyle: {
            zIndex: 100,
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "All Calls",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "call" : "call-outline"}
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="join"
          options={{
            title: "Join Call",
            // headerShown: true,
            headerTitle: "Enter the Room ID",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "enter" : "enter-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default CallLayout;
