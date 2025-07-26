import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { Produto } from "./Produto";

export type ProdutoStackParamList = {
  ProdutoHome: undefined;
  ProdutoMenu: { produtoId: number };
  ImportarProduto: { produtos_importados: Produto[] };
};

export type ProdutoStackScreenProps<T extends keyof ProdutoStackParamList> =
  NativeStackScreenProps<ProdutoStackParamList, T>;

export type ProdutoStackNavigationProp =
  StackNavigationProp<ProdutoStackParamList>;
