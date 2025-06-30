import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendaHome from "../screens/venda/VendaHome";

export type VendaStackParamList = {
  VendaHome: undefined;
};

const Stack = createNativeStackNavigator<VendaStackParamList>();

export default function VendaNavigator<VendaStackParamList>() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendaHome"
        component={VendaHome}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
