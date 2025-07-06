export interface ModalProps {
  id?: number;
  modalVisible: boolean;
  onClose: (reload?: boolean) => void;
}
