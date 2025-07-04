import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProdutoHome from "../screens/produto/ProdutoHome";
import { ProdutoStackParamList } from "../types/ProdutoNavigation";

const Stack = createNativeStackNavigator<ProdutoStackParamList>();

export default function ProdutoNavigator() {
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
