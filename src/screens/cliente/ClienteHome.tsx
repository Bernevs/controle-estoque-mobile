import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Cliente } from "../../types/Cliente";
import { getClientes } from "../../api/service/clienteService";
import { ScrollView } from "react-native-gesture-handler";
import GlobalStyle from "../../styles/globalStyle";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { ClienteStackScreenProps } from "../../types/Navigation";
import CadastrarCliente from "./CadastrarCliente";
import IconButton from "../../components/IconButton";
import { Pagamento } from "../../types/Pagamento";
import { getPagamento } from "../../api/service/pagamentoService";

type Props = ClienteStackScreenProps<"ClienteHome">;

export default function ClienteHome({ navigation }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cadastrarModal, setCadastrarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchClientes() {
    try {
      setLoading(true);
      const clienteData = await getClientes();
      setClientes(clienteData.cliente);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchClientes();
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
      <CadastrarCliente
        modalVisible={cadastrarModal}
        onClose={(reload) => {
          setCadastrarModal(false);
          if (reload) {
            fetchClientes();
          }
        }}
      ></CadastrarCliente>
      <View style={GlobalStyle.iconGroup}>
        <IconButton
          iconName={"add-circle"}
          onPress={() => setCadastrarModal(true)}
        ></IconButton>
      </View>

      <View style={GlobalStyle.line}></View>
      {clientes.map((cliente: Cliente) => (
        <TouchableOpacity
          key={cliente.id}
          style={GlobalStyle.item}
          onPress={() =>
            navigation.navigate("ClienteMenu", {
              clienteId: cliente.id,
              nome: cliente.nome,
            })
          }
        >
          <View>
            <Text style={GlobalStyle.item_title}>{cliente.nome}</Text>
            <Text>Total Pago: R$0</Text>
            <Text>Valor Final: R$0</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
