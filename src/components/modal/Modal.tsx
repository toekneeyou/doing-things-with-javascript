import { ReactNode, useCallback, useEffect, useRef } from "react";
import { classnames } from "../../util/classnames";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../button/Button";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  handleClose: (arg?: any) => void;
}

export default function Modal({ isOpen, children, handleClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className={classnames(
        "modal",
        "focus:border-none focus:outline-none bg-transparent",
        "backdrop:bg-[rgba(0,0,0,0.75)]"
      )}
    >
      <div
        className={classnames(
          "bg-app-dark-blue rounded-xl p-8 text-white relative"
        )}
      >
        <div className="flex justify-end -mt-8 -mr-8">
          <CloseModalButton onClose={handleClose} />
        </div>
        {children}
      </div>
    </dialog>,
    document.body
  );
}

function CloseModalButton({ onClose }: { onClose: () => void }) {
  const Icon = useCallback((props: any) => {
    return <XMarkIcon {...props} />;
  }, []);

  return <Button variant="icon" onClick={onClose} icon={Icon} />;
}
