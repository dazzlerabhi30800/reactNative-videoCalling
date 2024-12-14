import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Tabs } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";

const CallLayout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          name="[id]"
          options={{
            title: "Start a new Call",
            header: () => null,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: -15,
                  bottom: 0,
                  margin: "auto",
                  borderRadius: 50,
                  zIndex: 100,
                  backgroundColor: "white",
                  borderColor: "lightgray",
                  borderWidth: 0.2,
                  borderTopWidth: 0.1,
                  borderBottomWidth: 0,
                  height: 40,
                  width: 80,
                }}
              >
                <FontAwesome
                  name="plus-circle"
                  size={30}
                  style={{ zIndex: 200 }}
                  color="black"
                />
              </View>
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
