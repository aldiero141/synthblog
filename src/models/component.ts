import { ICreatePostValues } from "./post";

export interface IConfirmationProps {
    open: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
   children?: React.ReactNode;
}

export interface ICreatePostProps {
    open: boolean;
    type: string;
    onConfirm: (e: ICreatePostValues) => void;
    onCancel?: () => void;
    children?: React.ReactNode;
}

export interface IUserCredentials {
    name: string;
    token: string;
  }