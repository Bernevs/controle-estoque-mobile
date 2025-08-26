import { Alert, Button, ScrollView, Text, View } from "react-native";
import { ProdutoStackScreenProps } from "../../types/ProdutoNavigation";
import { useFocusEffect } from "@react-navigation/native";
import GlobalStyle from "../../styles/globalStyle";
import { Produto } from "../../types/Produto";
import { useCallback, useState } from "react";
import { createProduto } from "../../api/service/produtoService";
import Loading from "../../components/Loading";
import IconButton from "../../components/IconButton";

type Props = ProdutoStackScreenProps<"ImportarProduto">;

export default function ImportarProduto({ navigation, route }: Props) {
  const [produtos_importados, set_produtos_importados] = useState<Produto[]>(
    []
  );
  const [loading, set_loading] = useState<boolean>(false);

  const confirm = async () => {
    try {
      Alert.alert("Confirmar operação?", "", [
        { text: "Cancelar" },
        { text: "Confirmar", onPress: () => handleSubmit() },
      ]);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      set_loading(true);
      const promise = produtos_importados.map((produto: Produto) =>
        createProduto(produto)
      );

      const response = await Promise.all(promise);
    } catch (error: any) {
      console.error(error);
    } finally {
      set_loading(false);
      navigation.navigate("ProdutoHome");
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      Alert.alert("Remover Produto?", "", [
        { text: "Cancelar" },
        { text: "Confirmar", onPress: () => handleDelete(id) },
      ]);
    } catch (error: any) {}
  };

  const handleDelete = async (id: number) => {
    try {
      const produto = produtos_importados.filter((p: Produto) => p.id !== id);

      set_produtos_importados(produto);
    } catch (error: any) {}
  };

  useFocusEffect(
    useCallback(() => {
      set_produtos_importados(route.params.produtos_importados);
    }, [])
  );

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <ScrollView
      style={GlobalStyle.screen}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={GlobalStyle.iconGroup}>
        <View style={{ marginRight: 190 }}>
          <Button
            color="red"
            title="Cancelar"
            onPress={() => navigation.navigate("ProdutoHome")}
          />
        </View>

        <Button color="black" title="Continuar" onPress={() => confirm()} />
      </View>

      <View style={GlobalStyle.line}></View>
      {produtos_importados.map((produto: Produto) => (
        <View key={produto.id} style={GlobalStyle.item}>
          <View>
            <View style={GlobalStyle.iconGroup}>
              <IconButton
                iconName={"trash-outline"}
                margin={280}
                onPress={() => confirmDelete(produto.id!)}
              ></IconButton>
            </View>
            <Text style={GlobalStyle.item_title}>{produto.nome}</Text>
            <Text>Preço de compra: R${produto.preco_compra}</Text>
            <Text>Preço de venda: R${produto.preco_venda}</Text>
            <Text>Quantidade: {produto.quantidade}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
