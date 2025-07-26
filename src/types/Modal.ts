export interface ModalProps {
  id?: number;
  modalVisible: boolean;
  objeto?: object;
  onClose: (reload?: boolean) => void;
}
