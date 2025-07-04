import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Produto } from "../../types/Produto";
import GlobalStyle from "../../styles/globalStyle";
import { TouchableOpacity } from "react-native";
import IconButton from "../../components/IconButton";
import Loading from "../../components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import { getProdutos } from "../../api/service/produtoService";
import { ProdutoStackScreenProps } from "../../types/ProdutoNavigation";

type Props = ProdutoStackScreenProps<"ProdutoHome">;

export default function ProdutoHome({ navigation }: Props) {
  const [produto, setProduto] = useState<Produto[]>([]);
  const [cadastrarModal, setCadastrarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await getProdutos();
      setProduto(response.data.produto);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProdutos();
    }, [])
  );

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <ScrollView style={GlobalStyle.screen}>
      <IconButton
        iconName={"add-circle"}
        onPress={() => setCadastrarModal(true)}
      ></IconButton>
      <View style={GlobalStyle.line}></View>
      {produto.map((produto: Produto) => (
        <TouchableOpacity key={produto.id} style={GlobalStyle.item}>
          <View>
            <Text style={GlobalStyle.item_title}>{produto.nome}</Text>
            <Text>Preço de compra: R${produto.preco_compra}</Text>
            <Text>Preço de venda: R${produto.preco_venda}</Text>
            <Text>Quantidade: {produto.quantidade}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
