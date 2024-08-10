import Button from "../../components/Button";
import { useModalActionContext } from "../../context/ModalContext";
import StackInfo from "./StackInfo";

export default function StackModalButton() {
  const { openModal } = useModalActionContext();

  const handleOpenModal = () => {
    openModal(<StackInfo />);
  };

  return <Button onClick={handleOpenModal}>More Info</Button>;
}
