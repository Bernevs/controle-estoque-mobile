import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProdutoHome from "../screens/produto/ProdutoHome";

export type ProdutoStackParamList = {
  ProdutoHome: undefined;
};

const Stack = createNativeStackNavigator<ProdutoStackParamList>();

export default function ProdutoNavigator<ProdutoStackParamList>() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProdutoHome"
        component={ProdutoHome}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
