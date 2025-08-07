import { Alert, Button, ScrollView, Text, View } from "react-native";
import GlobalStyle from "../../styles/globalStyle";
import { useCallback, useRef, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Produto } from "../../types/Produto";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { getProdutos } from "../../api/service/produtoService";
import { Cliente } from "../../types/Cliente";
import { getClientes } from "../../api/service/clienteService";
import { Pedido } from "../../types/Pedido";
import { createPedido } from "../../api/service/vendaService";

export default function VendaHome() {
  const [clientes, set_clientes] = useState<Cliente[]>([]);
  const [cliente_id, set_cliente_id] = useState<number>(0);
  const [cliente_nome, set_cliente_nome] = useState<string>();
  const [produtos, set_produtos] = useState<Produto[]>([]);
  const [produto_id, set_produto_id] = useState<number>(0);
  const [produto_nome, set_produto_nome] = useState<string>();
  const [quantidade_escolhida, set_quantidade_escolhida] = useState<number>();
  const [pedido, set_pedido] = useState<Pedido[]>([]);
  const id = useRef(0);
  const [loading, set_loading] = useState<boolean>(true);

  const quantidade_total = produtos.find((p) => p.id === produto_id);
  const quantidade = [];

  if (quantidade_total?.quantidade) {
    for (let i = 1; i <= quantidade_total.quantidade; i++) {
      quantidade.push({ label: i.toString(), value: i });
    }
  }

  const fetchData = async () => {
    try {
      set_loading(true);
      const cliente_data = await getClientes();
      const produto_data = await getProdutos();
      set_clientes(cliente_data.cliente);
      set_produtos(produto_data.data.produto);
    } catch (error: any) {
    } finally {
      set_loading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (pedido.length == 0) {
        Alert.alert("Erro", "Nenhum produto foi adicionado", [{ text: "OK" }]);
      } else {
        Alert.alert("Confirmar operação?", "", [
          { text: "Cancelar" },
          { text: "Confirmar", onPress: () => confirmSubmit() },
        ]);
      }
    } catch (error: any) {}
  };

  const confirmSubmit = async () => {
    try {
      set_loading(true);

      const response = await createPedido(pedido);
      if (response.status == 201) {
        Alert.alert("Sucesso", "Pedido registrado com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              set_pedido([]);
              set_cliente_id(0);
              set_produto_id(0);
              set_loading(false);
            },
          },
        ]);
      }
    } catch (error: any) {}
  };

  let quantidade_input = <></>;

  if (produto_id != 0) {
    quantidade_input = (
      <RNPickerSelect
        placeholder={{ label: "Selecione a quantidade...", value: 0 }}
        onValueChange={(value) => set_quantidade_escolhida(value)}
        items={quantidade}
      ></RNPickerSelect>
    );
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <ScrollView style={GlobalStyle.screen}>
      <View style={GlobalStyle.iconGroup}>
        <Button
          color="red"
          title="Limpar"
          onPress={() => {
            set_pedido([]);
            set_cliente_id(0);
            set_produto_id(0);
          }}
        />
        <View style={{ marginRight: 105 }}>
          <Button
            color="gray"
            title="Adicionar"
            onPress={() =>
              set_pedido((prev) => [
                ...prev,
                {
                  id: id.current++,
                  cliente_id: cliente_id!,
                  cliente_nome: cliente_nome!,
                  produto_id: produto_id!,
                  produto_nome: produto_nome!,
                  quantidade: quantidade_escolhida!,
                },
              ])
            }
          />
        </View>
        <Button
          color="black"
          title="Confirmar"
          onPress={() => handleSubmit()}
        ></Button>
      </View>
      <View style={GlobalStyle.line}></View>
      <View>
        <RNPickerSelect
          onValueChange={(value) => {
            set_cliente_id(value);
            const cliente_selecionado = clientes.find(
              (cliente) => cliente.id === value
            );
            if (cliente_selecionado) {
              set_cliente_nome(cliente_selecionado.nome);
            }
          }}
          value={cliente_id}
          placeholder={{ label: "Selecione um cliente...", value: 0 }}
          items={clientes.map((cliente: Cliente) => ({
            label: cliente.nome,
            value: cliente.id,
          }))}
        ></RNPickerSelect>
        <RNPickerSelect
          onValueChange={(value) => {
            set_produto_id(value);
            const produto_selecionado = produtos.find(
              (produto) => produto.id === value
            );
            if (produto_selecionado) {
              set_produto_nome(produto_selecionado.nome);
            }
          }}
          value={produto_id}
          placeholder={{ label: "Selecione um produto...", value: 0 }}
          items={produtos.map((produto: Produto) => ({
            label: produto.nome,
            value: produto.id,
          }))}
        ></RNPickerSelect>
        {quantidade_input}
      </View>
      <View style={GlobalStyle.line}></View>
      {pedido.map((pedido: Pedido) => (
        <View key={pedido.id} style={GlobalStyle.item}>
          <View>
            <Text style={GlobalStyle.item_content}>{pedido.cliente_nome}</Text>
            <Text style={GlobalStyle.item_content}>{pedido.produto_nome}</Text>
            <Text style={GlobalStyle.item_content}>
              Quantidade: {pedido.quantidade}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
