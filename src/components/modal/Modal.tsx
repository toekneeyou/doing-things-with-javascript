import { useEffect, useRef } from "react";
import { classnames } from "../../util/classnames";
import {
  useModalActionContext,
  useModalStateContext,
} from "../../context/ModalContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../Button";

interface ModalProps {}

export default function Modal({}: ModalProps) {
  const { isOpen, content } = useModalStateContext();
  const { closeModal } = useModalActionContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className={classnames(
        "modal",
        "focus:border-none focus:outline-none bg-transparent",
        "backdrop:bg-[rgba(0,0,0,0.5)]"
      )}
    >
      <div
        className={classnames(
          "bg-app-dark-blue rounded-xl p-8 text-white relative"
        )}
      >
        <Button
          variant="icon"
          onClick={closeModal}
          className="absolute right-4 top-4"
        >
          <XMarkIcon className="size-6 text-app-yellow" />
        </Button>
        {content}
      </div>
    </dialog>
  );
}
