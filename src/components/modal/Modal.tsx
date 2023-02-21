import React, { FC, memo } from "react";
import ReactModal from "react-modal";
import { ReactComponent as CloseIcon } from "../../images/closeIcon.svg";
import "./index.scss";
import "react-modal/";
import classNames from "classnames";

interface IProps extends Partial<Omit<ReactModal.Props, "className">> {
  onClose: () => void;
  title?: string;
  className?: string;
}

ReactModal.setAppElement("#root");
export const Modal: FC<IProps> = memo(
  ({ isOpen, onClose, title, children, className, ...rest }) => {
    return (
      <ReactModal
        isOpen={!!isOpen}
        className={classNames("modal", className)}
        {...rest}
      >
        <div className={"modal-wrap"}>
          <div className={"modal-header"}>
            <div className={"modal-title"}>{title}</div>
            <CloseIcon
              className={"modal-close-icon"}
              onClick={() => {
                onClose();
              }}
            />
          </div>
          <div className={"modal-content"}>{children}</div>
        </div>
      </ReactModal>
    );
  }
);
