import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type ProdutoStackParamList = {
  ProdutoHome: undefined;
  ProdutoMenu: { produtoId: number };
};

export type ProdutoStackScreenProps<T extends keyof ProdutoStackParamList> =
  NativeStackScreenProps<ProdutoStackParamList, T>;

export type ProdutoStackNavigationProp =
  StackNavigationProp<ProdutoStackParamList>;
