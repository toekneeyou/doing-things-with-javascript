import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Button from "../../components/button/Button";
import DebounceOptions from "./DebounceOptions";
import { useRef, useState } from "react";
import Modal from "../../components/modal/Modal";

const CogIcon = (props?: any) => <Cog6ToothIcon {...props} />;

export default function DebounceOptionsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div ref={containerRef}>
      <Button onClick={openModal} variant="icon" icon={CogIcon} />
      {isOpen && (
        <Modal isOpen={isOpen} handleClose={closeModal}>
          <DebounceOptions />
        </Modal>
      )}
    </div>
  );
}
