import { Text, View } from "react-native";

export const ErrorConnection = ({ text }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '500' }}>{text}</Text>
    </View>
  );
}