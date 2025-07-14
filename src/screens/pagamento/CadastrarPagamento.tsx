import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import ModalStyle from "../../styles/modalStyle";
import { ModalProps } from "../../types/Modal";
import FormStyle from "../../styles/formStyle";
import { useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { createPagamento } from "../../api/service/pagamentoService";
import { Pagamento } from "../../types/Pagamento";

export default function CadastrarPagamento({
  id,
  modalVisible,
  onClose,
}: ModalProps) {
  const [data, setData] = useState<Date>(new Date());
  const [valor_pago, setValor_pago] = useState<string>("");
  const [dataModal, setDataModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const pagamento: Pagamento = {
        cliente_id: id!,
        valor_pago: Number(valor_pago),
        data_pagamento: data,
      };
      const response = await createPagamento(pagamento);

      if (response.status == 201) {
        Alert.alert("Sucesso", "Pagamento registrado com sucesso", [
          { text: "OK", onPress: () => onClose(true) },
        ]);
      } else {
        Alert.alert("Error", "Erro ao registrar pagamento", [{ text: "OK" }]);
      }
    } catch (error: any) {}
  };
  return (
    <SafeAreaView>
      <Modal
        visible={modalVisible}
        onRequestClose={() => onClose()}
        animationType="fade"
        transparent={true}
      >
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.modalView}>
            <Text style={FormStyle.label}>Valor Pago:</Text>
            <TextInput
              style={FormStyle.input}
              value={valor_pago}
              onChangeText={setValor_pago}
            ></TextInput>
            <Button title="Data" onPress={() => setDataModal(true)}></Button>
            <DateTimePicker
              isVisible={dataModal}
              mode={"date"}
              date={data}
              onCancel={() => setDataModal(false)}
              onConfirm={(date) => {
                setData(date);
                setDataModal(false);
              }}
            ></DateTimePicker>
            <View style={FormStyle.buttonGroup}>
              <Button title="Cancelar" onPress={() => onClose()}></Button>
              <Button title="Confirmar" onPress={() => handleSubmit()}></Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
