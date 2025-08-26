import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { Pagamento } from "../../types/Pagamento";
import { getPagamento } from "../../api/service/pagamentoService";
import { ClienteStackScreenProps } from "../../types/Navigation";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import GlobalStyle from "../../styles/globalStyle";
import { DataTable } from "react-native-paper";
import IconButton from "../../components/IconButton";
import { formataData } from "../../utils/functions";
import CadastrarPagamento from "./CadastrarPagamento";

type Props = ClienteStackScreenProps<"PagamentoHome">;

export default function PagamentoHome({ route }: Props) {
  const [pagamento, SetPagamento] = useState<Pagamento[]>([]);
  const [cadastrarModal, setCadastrarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPagamento = async () => {
    try {
      setLoading(true);
      const response = await getPagamento(route.params.clienteId);
      SetPagamento(response.data.pagamento);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPagamento();
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
      <CadastrarPagamento
        modalVisible={cadastrarModal}
        id={route.params.clienteId}
        onClose={(reload) => {
          setCadastrarModal(false);
          if (reload) {
            fetchPagamento();
          }
        }}
      ></CadastrarPagamento>
      <View style={GlobalStyle.iconGroup}>
        <IconButton
          iconName={"add-circle"}
          margin={200}
          onPress={() => setCadastrarModal(true)}
        ></IconButton>
      </View>
      <View style={GlobalStyle.line}></View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Valor Pago</DataTable.Title>
          <DataTable.Title>Data de Pagamento</DataTable.Title>
        </DataTable.Header>
        {pagamento.map((pagamento: Pagamento) => (
          <DataTable.Row key={pagamento.id}>
            <DataTable.Cell>{pagamento.valor_pago}</DataTable.Cell>
            <DataTable.Cell>
              {formataData(pagamento.data_pagamento)}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}
