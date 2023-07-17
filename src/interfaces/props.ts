import { EventHandler, ReactNode, SyntheticEvent } from "react";

export type PropsWithChildrenReq<P = unknown> = P & { children: ReactNode | undefined };

export interface ModalProps {
    onHide: any;
    onConfirm?: EventHandler<SyntheticEvent>;
    isVisible: boolean;
 }