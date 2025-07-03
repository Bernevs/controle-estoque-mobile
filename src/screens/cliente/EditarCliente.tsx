import {
  Button,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { ModalProps } from "../../types/Modal";
import ModalStyle from "../../styles/modalStyle";
import FormStyle from "../../styles/formStyle";
import { useState } from "react";
import { deleteCliente, updateCliente } from "../../api/service/clienteService";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClienteStackParamList } from "../../navigation/ClienteNavigator";

type NavigationProp = StackNavigationProp<ClienteStackParamList>;

export default function EditarCliente({
  id,
  modalVisible,
  onClose,
}: ModalProps) {
  const [nome, setNome] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    try {
      const response = await updateCliente(id, nome);
      if (response.status == 200) {
        Alert.alert("Sucesso", "Cliente alterado com sucesso!", [
          { text: "OK", onPress: () => onClose() },
        ]);
      } else {
        Alert.alert("Error", "Não foi possivel alterar o cliente", [
          { text: "OK", onPress: () => onClose() },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Deletar Cliente?",
      "Isso removerá tudo relacionado a esse cliente",
      [
        { text: "Cancelar" },
        { text: "Confirmar", onPress: () => confirmDelete() },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteCliente(id);

      if (response.status == 204) {
        Alert.alert("Sucesso", "Cliente deletado com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              onClose();
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert("Error", "Não foi possivel deletar o cliente!", [
          { text: "OK", onPress: () => onClose() },
        ]);
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => onClose()}
      >
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.modalView}>
            <Text style={FormStyle.label}></Text>
            <TextInput
              placeholder="Informe o nome do cliente"
              value={nome}
              onChangeText={setNome}
              style={FormStyle.input}
            ></TextInput>

            <Button title="Cancelar" onPress={() => onClose()}></Button>
            <Button
              title="Alterar Cliente"
              onPress={() => handleSubmit()}
            ></Button>
            <Button
              title="Deletar Cliente"
              onPress={() => handleDelete()}
            ></Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
