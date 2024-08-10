import Button from "../../components/Button";
import { useModalActionContext } from "../../context/ModalContext";
import QueueInfo from "./QueueInfo";

export default function QueueModalButton() {
  const { openModal } = useModalActionContext();

  const handleOpenModal = () => {
    openModal(<QueueInfo />);
  };

  return <Button onClick={handleOpenModal}>More Info</Button>;
}
