import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Cliente } from "../../types/Cliente";
import { getClientes } from "../../api/service/clienteService";
import { ScrollView } from "react-native-gesture-handler";
import GlobalStyle from "../../styles/globalStyle";

export default function ClienteHome() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  async function fetchClientes() {
    const clienteData = await getClientes();
    setClientes(clienteData.cliente);
  }

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <ScrollView style={GlobalStyle.screen}>
      {clientes.map((cliente: Cliente) => (
        <TouchableOpacity key={cliente.id} style={GlobalStyle.item}>
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
