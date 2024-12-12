import { View, Text, StyleSheet } from "react-native";
import React from "react";

const join = () => {
  const { container, textStyle } = styles;
  return (
    <View style={container}>
      <Text style={textStyle}>Join</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    padding: 20,
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default join;
