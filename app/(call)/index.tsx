import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default function Page() {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
        }}
        onPress={() => setOpenDialog(true)}
      >
        <MaterialCommunityIcons name="exit-run" size={30} color="#5F5DEC" />
      </TouchableOpacity>
      <Dialog.Container visible={openDialog}>
        <Dialog.Title>Sign Out</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to sign out?
        </Dialog.Description>
        <Dialog.Button onPress={() => setOpenDialog(false)} label="Cancel" />
        <Dialog.Button
          onPress={async () => {
            await signOut();
            setOpenDialog(false);
          }}
          label="Sign Out"
        />
      </Dialog.Container>
      <SignedIn>
        <Text style={{ textAlign: "center" }}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
      </SignedIn>
    </View>
  );
}
