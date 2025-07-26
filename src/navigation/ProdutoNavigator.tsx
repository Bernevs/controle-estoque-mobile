import { ProdutoStackParamList } from "../types/ProdutoNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import ProdutoHome from "../screens/produto/ProdutoHome";
import ProdutoMenu from "../screens/produto/ProdutoMenu";
import ImportarProduto from "../screens/produto/ImportarProduto";

const Stack = createStackNavigator<ProdutoStackParamList>();

export default function ProdutoNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProdutoHome"
        component={ProdutoHome}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name={"ProdutoMenu"}
        component={ProdutoMenu}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name={"ImportarProduto"}
        component={ImportarProduto}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
