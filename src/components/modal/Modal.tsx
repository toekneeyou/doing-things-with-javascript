import { PropsWithChildren, useEffect, useRef } from "react";
import { classnames } from "../../lib/util/classnames";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../button/Button";
import { createPortal } from "react-dom";
/**
 *
 *
 * Modal
 *
 *
 */
interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  handleClose: (arg?: any) => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, children, handleClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  /**
   * This effect controls the opening and closing of the modal.
   */
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
};
/**
 *
 *
 * CloseModalButton
 *
 *
 */
function CloseModalButton({ onClose }: { onClose: () => void }) {
  const Icon = (props?: any) => <XMarkIcon {...props} />;
  return <Button variant="icon" onClick={onClose} icon={Icon} />;
}

export default Modal;
