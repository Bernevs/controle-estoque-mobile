import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type ClienteStackParamList = {
  ClienteHome: undefined;
  ClienteMenu: { clienteId: number; nome: string };
};

export type ClienteStackScreenProps<T extends keyof ClienteStackParamList> =
  NativeStackScreenProps<ClienteStackParamList, T>;

export type ClienteStackNavigationProp =
  StackNavigationProp<ClienteStackParamList>;
