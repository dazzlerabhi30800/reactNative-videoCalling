import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue', padding: 20}}>
      <View>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </SignedIn>
        <SignedOut>
          <Text style={{fontSize: 30}}>You are signed out</Text>
        </SignedOut>
      </View>
    </SafeAreaView>
  );
}
