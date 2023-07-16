import { create } from "zustand";
import { Modal } from "src/containers/Modals";

type ModalState = {
  [key in Modal]: boolean;
};

interface ModalActions {
  setVisible: (modal: Modal) => (visible: boolean) => void;
}

const initialStates: ModalState = {
  clear: false,
  download: false,
  import: false,
  node: false,
  settings: false,
  share: false,
  premium: false,
  jwt: false,
  schema: false,
  cancelPremium: false,
};

const useModal = create<ModalState & ModalActions>()(set => ({
  ...initialStates,
  setVisible: modal => visible => {
    set({ [modal]: visible });
  },
}));

export default useModal;
