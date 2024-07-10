// import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View style={{flex: 1, flexDirection:"row"}}>
      <View style={{flex:1, backgroundColor:"tomato"}}></View>
      <View style={{flex:3, backgroundColor:"teal"}}></View>
      <View style={{flex:1, backgroundColor:"orange"}}></View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: "30px",
//     color: "#fff",
//   },
// });
