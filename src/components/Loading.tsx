import { ActivityIndicator, Text, View } from "react-native";
import GlobalStyle from "../styles/globalStyle";

const Loading = () => {
  return (
    <View style={GlobalStyle.loading}>
      <ActivityIndicator></ActivityIndicator>
      <Text>Carregando...</Text>
    </View>
  );
};

export default Loading;
